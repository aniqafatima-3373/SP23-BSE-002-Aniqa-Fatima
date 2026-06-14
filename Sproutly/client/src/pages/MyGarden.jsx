import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PlantCard from '../components/PlantCard';
import api from '../utils/api'; 
import { X, Leaf, Sun, ShieldAlert, Camera, Sparkles } from 'lucide-react';

// 🚨 APNI GEMINI API KEY YAHAN PASTE KAREIN (AQ.Ab8R...)
const GEMINI_API_KEY = "AQ.Ab8RN6ID3VEcQ3EPD1Am_Wj1bP2CgaU63vR-nZj0iZTqYB5OnQ"; 

const MyGarden = () => {
  const [plants, setPlants] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scanning, setScanning] = useState(false); 
  const [imagePreview, setImagePreview] = useState(null); 

  const [newPlant, setNewPlant] = useState({ 
    name: '', type: '', wateringSchedule: 'Weekly', image: '', sunlight: '', precautions: '', health: 100 
  });

  const fetchPlants = async () => {
    try {
      const response = await api.get('/plants'); 
      const dataArray = Array.isArray(response.data) ? response.data : (response.data?.plants || response.data?.data || []);
      setPlants(dataArray);
    } catch (err) {
      console.error("Error fetching plants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleDeletePlant = async (plantId) => {
    try {
      await api.delete(`/plants/${plantId}`);
      setPlants(prev => prev.filter(p => p._id !== plantId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete plant: " + (err.response?.data?.message || err.message));
    }
  };

  // ✨ REAL AUTOMATED AI IMAGE SCANNING ENGINE
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setScanning(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      // Clean base64 string buffer extraction
      const base64Data = reader.result.split(',')[1];

      const promptText = `Identify this plant from the image. 
      Return the response STRICTLY as a single raw JSON object matching this structure. Do not include markdown blocks like \`\`\`json.
      {
        "name": "Exact Plant Name (Scientific Name)",
        "type": "Indoor / Tropical or Outdoor Shrub etc.",
        "wateringSchedule": "Daily or Weekly based on plant species needs",
        "sunlight": "Sunlight requirements summary",
        "precautions": "A quick care precaution advice tip"
      }`;

      const apiBody = {
        contents: [
          {
            parts: [
              { text: promptText },
              { inlineData: { mimeType: file.type, data: base64Data } }
            ]
          }
        ]
      };

      try {
        // Direct Core v1beta endpoint mapping for fast layout generation
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiBody)
          }
        );

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const rawText = data.candidates[0].content.parts[0].text;
        const cleanText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        const aiDetectedData = JSON.parse(cleanText);

        // ✨ FIXED: Changed NewPlant to setNewPlant (Typo Corrected Here)
        setNewPlant({
          name: aiDetectedData.name,
          type: aiDetectedData.type,
          wateringSchedule: aiDetectedData.wateringSchedule === 'Daily' ? 'Daily' : 'Weekly',
          sunlight: aiDetectedData.sunlight,
          precautions: aiDetectedData.precautions,
          image: reader.result, // Save base64 string directly to MongoDB schema for permanent loading
          health: 100
        });

      } catch (err) {
        console.error("AI Dynamic Identification Error:", err);
        alert("AI Scanning Error: " + err.message);
      } finally {
        setScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/plants', newPlant);
      setNewPlant({ name: '', type: '', wateringSchedule: 'Weekly', image: '', sunlight: '', precautions: '', health: 100 });
      setImagePreview(null);
      setShowModal(false);
      fetchPlants(); 
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-serif text-[#1B3022] antialiased">
      <Navbar />
      <div className="p-8 lg:p-12 max-w-6xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#1B3022]">My Botanical Sanctuary</h2>
            <p className="text-gray-400 text-xs mt-1 font-sans">AI-powered image recognition and automated care logging.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-[#808000] text-white px-8 py-3 rounded-full font-sans font-bold shadow-md hover:scale-105 transition">
            + Add New Plant
          </button>
        </div>

        {loading ? (
          <div className="text-center text-[#808000] font-bold animate-pulse">Loading ecosystem data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(plants) && plants.length > 0 ? (
              plants.map(plant => (
                <PlantCard 
                  key={plant._id || Math.random()} 
                  plant={plant} 
                  onDelete={handleDeletePlant} 
                />
              ))
            ) : (
              <p className="text-gray-400 italic col-span-full text-center py-10 font-sans text-sm">No plants tracked yet. Click above to add one!</p>
            )}
          </div>
        )}

        {/* Eco-Footer */}
        <footer className="w-full mt-24 pt-8 border-t border-gray-200/70 flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1B3022]">
              Sproutly<span className="text-[#808000]">.</span>
            </span>
            <p className="text-[10px] text-gray-400 font-medium font-sans mt-1">© 2026 Sproutly Inc. All Rights Reserved.</p>
          </div>
          <div className="max-w-md sm:text-right font-sans">
            <p className="text-[11px] italic text-[#1B3022]/40 font-medium leading-relaxed">
              "An AI-powered ecological tracking sanctuary designed to bridge the gap between automated botanical logging and advanced clinical leaf diagnostics."
            </p>
          </div>
        </footer>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[32px] p-6 md:p-8 shadow-2xl relative border border-gray-50 max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setShowModal(false); setImagePreview(null); }} className="absolute right-6 top-6 text-gray-400"><X size={20} /></button>
            <div className="flex items-center space-x-2 mb-5 text-[#1B3022]"><Sparkles size={18} /><h3 className="text-lg font-bold">AI Plant Scanner</h3></div>
            <form onSubmit={handleAddPlant} className="space-y-4">
              <div className="w-full h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 relative flex flex-col items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    {scanning && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center font-sans">
                        <span className="text-xl animate-spin mb-1">🔄</span>
                        <p className="text-[10px] font-bold animate-pulse">Gemini Botanical Deep Scan Active...</p>
                      </div>
                    )}
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full font-sans">
                    <Camera className="text-gray-400 mb-1.5" size={24} />
                    <span className="text-[11px] font-bold text-gray-600">Click to Upload Plant Picture</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
              <div className={`space-y-3 font-sans ${scanning ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div><label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Detected Name</label><input type="text" required value={newPlant.name} onChange={(e) => setNewPlant({...newPlant, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 text-xs font-bold text-[#1B3022]" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Species / Type</label><input type="text" required value={newPlant.type} onChange={(e) => setNewPlant({...newPlant, type: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 text-xs font-semibold" /></div>
                  <div><label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Watering</label><select value={newPlant.wateringSchedule} onChange={(e) => setNewPlant({...newPlant, wateringSchedule: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 text-xs font-semibold text-gray-600 cursor-pointer"><option value="Daily">Daily</option><option value="Weekly">Weekly</option></select></div>
                </div>
                <div><label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5 flex items-center gap-1"><Sun size={11}/> Sunlight Metrics</label><input type="text" value={newPlant.sunlight} onChange={(e) => setNewPlant({...newPlant, sunlight: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 text-xs font-semibold" /></div>
                <div><label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5 flex items-center gap-1"><ShieldAlert size={11}/> Precautions</label><textarea rows="2" value={newPlant.precautions} onChange={(e) => setNewPlant({...newPlant, precautions: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 text-xs font-semibold resize-none" /></div>
              </div>
              <div className="flex space-x-3 pt-1 font-sans"><button type="button" onClick={() => { setShowModal(false); setImagePreview(null); }} className="w-1/2 py-3 bg-gray-100 rounded-2xl text-xs font-bold">Cancel</button><button type="submit" disabled={submitting || scanning} className="w-1/2 py-3 bg-[#808000] text-white rounded-2xl text-xs font-bold">{submitting ? "Saving..." : "Add to Sanctuary"}</button></div>
            </form>

          </div>
        </div>
      )}
      
    </div>
  );
};

export default MyGarden;