import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api'; 
import { X, Leaf, Sun, ShieldAlert, Camera, Sparkles, Bug, Wrench, Save, RotateCcw } from 'lucide-react';

// 🚨 APNI GEMINI API KEY YAHAN PASTE KAREIN (AQ.Ab8R...)
const GEMINI_API_KEY = "AQ.Ab8RN6J-mG1743zc--t0GjXCezNIeqan2ECkDK0j4TWpXaAGNA"; 

const Clinic = () => {
  const [selectedImage, setSelectedImage] = useState(null); 
  const [base64Image, setBase64Image] = useState(null); 
  const [fileObject, setFileObject] = useState(null); // Added fileObject tracking
  const [isScanning, setIsScanning] = useState(false); 
  const [scanResult, setScanResult] = useState(null); 
  const [isSaved, setIsSaved] = useState(false); 
  const [savingLoader, setSavingLoader] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileObject(file);
      setSelectedImage(URL.createObjectURL(file));
      setScanResult(null); 
      setIsSaved(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        // Base64 clean string extraction for API body mapping
        const base64Data = reader.result.split(',')[1];
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✨ DIRECT AI SCANNING ENGINE (FREE & ROBUST)
  const handleStartScan = async () => {
    if (!base64Image) {
      alert("Please upload a leaf picture first!");
      return;
    }
    setIsScanning(true);

    const promptText = `Analyze this plant leaf image. Identify the plant name, its disease, description and cure steps.
    Return the response STRICTLY as a single raw JSON object matching this structure. Do not include markdown blocks like \`\`\`json.
    {
      "status": "Infected",
      "plantName": "Plant Name (Scientific Name)",
      "disease": "Issue: Name of Disease",
      "diseaseDesc": "Description of disease.",
      "solution": ["Step 1", "Step 2"],
      "severity": "high"
    }`;

    const apiBody = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiBody)
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const rawText = data.candidates[0].content.parts[0].text;
      const cleanText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const cleanJson = JSON.parse(cleanText);
      
      setScanResult(cleanJson);
    } catch (err) {
      console.error("Free AI Scan Error:", err);
      alert("AI Clinic Error: " + err.message);
    } finally {
      setIsScanning(false);
    }
  };

  // 🎯 SINGLE PERFECT SAVE FUNCTION (NO DUPLICATES!)
  const handleSaveResult = async () => {
    if (!scanResult) return;
    setSavingLoader(true);
    try {
      await api.post('/diagnoses', {
        plantName: scanResult.plantName,
        status: scanResult.status,
        disease: scanResult.disease,
        diseaseDesc: scanResult.diseaseDesc, 
        solution: scanResult.solution,
        severity: scanResult.severity
      });
      setIsSaved(true);
      alert("🎯 Diagnosis saved to MongoDB logs successfully!");
    } catch (err) {
      alert("Save Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSavingLoader(false);
    }
  };

  const handleResetScan = () => {
    setSelectedImage(null);
    setBase64Image(null);
    setFileObject(null);
    setScanResult(null);
    setIsSaved(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-serif text-[#1B3022] antialiased">
      <Navbar />
      <div className="p-6 md:p-10 lg:p-16 max-w-6xl mx-auto pb-16">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight">AI Health Clinic</h2>
          <p className="text-gray-500 mt-2 text-sm font-sans">Direct Core Model Endpoint. Fast, secure, and fully dynamic biological analytics.</p>
        </div>

        {!scanResult ? (
          <div className="bg-white border border-gray-100 rounded-[40px] p-8 md:p-12 shadow-sm max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-full h-64 md:h-80 bg-gray-50 rounded-[32px] border-4 border-dashed border-[#808000]/20 flex flex-col items-center justify-center overflow-hidden relative mb-8">
                {selectedImage ? (
                  <>
                    <img src={selectedImage} alt="Uploaded Leaf" className="w-full h-full object-cover" />
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm font-sans">
                        <Sparkles size={40} className="animate-spin text-[#FDFBF7] mb-3" />
                        <p className="text-lg font-bold tracking-wider animate-pulse">AI Scanner Active...</p>
                        <p className="text-xs text-gray-300 mt-1">Analyzing health metrics and treatments</p>
                      </div>
                    )}
                    {!isScanning && (
                       <button onClick={handleResetScan} className="absolute top-4 right-4 bg-white/70 text-gray-500 hover:text-red-600 p-1.5 rounded-full backdrop-blur-md"><X size={16}/></button>
                    )}
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer p-6 w-full h-full text-center font-sans">
                    <div className="text-6xl mb-4">📷</div>
                    <h3 className="text-xl font-bold mb-1 font-serif">Live Diagnostic Scan</h3>
                    <p className="text-gray-400 mb-5 text-xs max-w-xs">Upload any plant leaf photo to test live clinical diagnosis.</p>
                    <span className="bg-[#808000] text-white px-6 py-2 rounded-full font-bold text-xs shadow-sm">Select Image</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>

              <button onClick={handleStartScan} disabled={!selectedImage || isScanning} className="bg-[#808000] text-white px-12 py-4 rounded-full font-sans font-bold text-lg shadow-md disabled:opacity-50 transition">
                {isScanning ? "Processing Engine..." : "Start AI Scan"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="w-full h-56 rounded-2xl overflow-hidden mb-5">
                <img src={selectedImage} alt="Scanned Leaf" className="w-full h-full object-cover" />
              </div>
              <div className={`p-4 rounded-2xl flex items-center gap-3 font-sans ${scanResult.severity === 'high' ? 'bg-red-50' : 'bg-green-50'}`}>
                <div className={`text-xl ${scanResult.severity === 'high' ? 'text-red-600' : 'text-green-600'}`}>🔬</div>
                <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Diagnosis State</p>
                    <h4 className={`text-base font-bold ${scanResult.severity === 'high' ? 'text-red-700' : 'text-green-700'}`}>{scanResult.status}</h4>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                    <Leaf size={18} className="text-green-600"/>
                    <h3 className="text-lg font-bold">{scanResult.plantName}</h3>
                </div>
                <div className="flex items-start gap-3">
                  <Bug size={20} className="text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1B3022] mb-0.5">{scanResult.disease}</h4>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{scanResult.diseaseDesc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <Wrench size={20} className="text-[#808000] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#1B3022] mb-3">Prescribed Treatment (Ilaj):</h4>
                    <ul className="list-decimal list-inside space-y-2 text-xs text-gray-600 font-sans leading-relaxed font-medium">
                      {scanResult.solution && Array.isArray(scanResult.solution) ? scanResult.solution.map((step, index) => (
                        <li key={index}>{step}</li>
                      )) : <li>Follow standard botanical maintenance.</li>}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 font-sans">
                <button onClick={handleResetScan} className="sm:w-1/2 py-3.5 bg-gray-100 text-gray-600 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                  <RotateCcw size={14} /> Scan Another Plant
                </button>
                <button onClick={handleSaveResult} disabled={isSaved || savingLoader} className="sm:w-1/2 py-3.5 bg-[#1B3022] text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#2e4c3a] transition disabled:opacity-70">
                  <Save size={14} /> <span>{savingLoader ? "Saving..." : isSaved ? "Saved to Records!" : "Save to Sanctuary Record"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ✨ ADDED: PREMIUM ECO-FOOTER MARGINED CORRECTLY INSIDE CONTAINER
            ========================================================================= */}
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
    </div>
  );
};

export default Clinic;