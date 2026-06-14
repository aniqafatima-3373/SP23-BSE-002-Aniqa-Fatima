import React, { useState } from 'react';
import { X, Sun, ShieldAlert, Droplets, Heart, Info, Trash2 } from 'lucide-react'; // ✨ Trash2 icon imported

const PlantCard = ({ plant, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const plantName = plant?.name || 'Common Plant';
  const plantType = plant?.type || 'Species Unknown';
  const plantImage = plant?.image || 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=500';
  const watering = plant?.wateringSchedule || 'Weekly';
  const sunlight = plant?.sunlight || 'Partial Indirect Sunlight';
  const precautions = plant?.precautions || 'Keep monitored and water timely.';
  const health = plant?.health !== undefined ? plant.health : 100;

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full group relative"
      >
        {/* Health Badge */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-gray-700">{health}% Healthy</span>
        </div>

        {/* Plant Image */}
        <div className="w-full h-48 overflow-hidden bg-gray-50 relative">
          <img src={plantImage} alt={plantName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Plant Meta Content */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1B3022] tracking-tight truncate group-hover:text-[#808000] transition">{plantName}</h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5 truncate">{plantType}</p>
          </div>

          {/* Bottom Action Row */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50">
            <div className="flex items-center space-x-1 text-xs font-bold text-blue-600 bg-blue-50/60 px-2.5 py-1 rounded-lg">
              <Droplets size={12} />
              <span>{watering}</span>
            </div>
            
            {/* Action Buttons: Info & Delete */}
            <div className="flex items-center space-x-3">
              {/* ✨ NEW: DELETE BUTTON (Trash Icon) */}
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); // Yeh detail modal ko khulne se rokega
                  if (window.confirm(`Are you sure you want to remove ${plantName}?`)) {
                    onDelete(plant._id); // Delete handler trigger karega
                  }
                }}
                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                title="Remove Plant"
              >
                <Trash2 size={16} />
              </button>

              <button onClick={(e) => { e.stopPropagation(); setShowDetails(true); }} className="text-gray-300 hover:text-[#808000] transition-colors p-1">
                <Info size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Profile Modal Popup */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-gray-50 max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowDetails(false)} className="absolute right-5 top-5 z-20 bg-black/40 text-white hover:bg-black/60 p-2 rounded-full backdrop-blur-md"><X size={16} /></button>
            <div className="w-full h-56 bg-gray-100 relative">
              <img src={plantImage} alt={plantName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-black/30"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#808000] bg-white px-2.5 py-1 rounded-md shadow-sm">{plantType}</span>
                <h2 className="text-2xl font-black text-[#1B3022] mt-2 tracking-tight">{plantName}</h2>
              </div>
            </div>
            <div className="p-6 space-y-5 bg-white">
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2.5"><div className="p-2 bg-red-50 text-red-500 rounded-xl"><Heart size={16} /></div><span className="text-xs font-bold text-gray-700">Live Vitals & Health</span></div>
                <span className="text-sm font-black text-green-600 bg-green-50 px-3 py-1 rounded-full">{health}% Optimal</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 rounded-2xl p-4 space-y-1"><div className="flex items-center space-x-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-wider"><Droplets size={12} /> <span>Watering</span></div><p className="text-xs font-bold text-gray-800">{watering}</p></div>
                <div className="border border-gray-100 rounded-2xl p-4 space-y-1"><div className="flex items-center space-x-1.5 text-amber-500 font-bold text-[10px] uppercase tracking-wider"><Sun size={12} /> <span>Sunlight</span></div><p className="text-xs font-bold text-gray-800 truncate">{sunlight}</p></div>
              </div>
              <div className="space-y-1.5"><h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Sunlight Requirement</h4><p className="text-xs font-semibold text-gray-700 leading-relaxed bg-amber-50/30 p-3 rounded-xl border border-amber-100/50">{sunlight}</p></div>
              <div className="space-y-1.5"><h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1 text-red-500"><ShieldAlert size={12} /> Danger Zone / Precautions</h4><p className="text-xs font-semibold text-red-700 leading-relaxed bg-red-50/50 p-3 rounded-xl border border-red-100/60">{precautions}</p></div>
              <button onClick={() => setShowDetails(false)} className="w-full py-3.5 bg-[#1B3022] text-white rounded-2xl text-xs font-bold shadow-md">Close Profile</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlantCard;