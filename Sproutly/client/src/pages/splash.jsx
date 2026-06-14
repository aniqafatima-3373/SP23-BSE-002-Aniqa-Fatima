import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-black font-sans">
      
      {/* Target Botanical Jungle Background with zoom effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-sprout-zoom" 
        style={{ backgroundImage: "url('/screen.png')" }}
      ></div>
      
      {/* Deep forest green overlay for luxury feel */}
      <div className="absolute inset-0 bg-[#1B3022]/60 z-10"></div>

      {/* Main Content Area (Centered) */}
      <div className="text-center z-20 space-y-6 text-white px-6 animate-fade-in flex flex-col items-center">
        
        {/* Lux Delicate Leaf Emblem (Abstract & Minimalist) */}
        <div className="w-16 h-16 opacity-90 mb-2 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <path d="M12 2A15 15 0 0 1 22 12A15 15 0 0 1 12 22A15 15 0 0 1 2 12A15 15 0 0 1 12 2Z" />
            <path d="M12 20V12" />
            <path d="M12 14c2.5-1 4-2.5 4-2.5" />
            <path d="M12 17c-2.5-1-4-2.5-4-2.5" />
          </svg>
        </div>
        
        {/* Professional Typography (Compact Scale) */}
        <div className="space-y-1">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-white">
            Sproutly
          </h1>
          <p className="text-sm font-medium tracking-wide opacity-60 max-w-xs mx-auto pt-1 leading-relaxed">
            Where Architecture Meets Organic Vitality
          </p>
        </div>

        {/* --- SIMPLE TEXT CONTINUE LINK (No Button) --- */}
        <div className="pt-8">
          <button 
            onClick={() => navigate('/auth/sessions')}
            className="group flex items-center space-x-1 text-white/80 hover:text-white transition duration-300 text-xs font-bold tracking-wider uppercase"
          >
            {/* Minimal white line appears on hover */}
            <span className="border-b border-transparent group-hover:border-white transition-all pb-1">
              Continue
            </span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform opacity-70" />
          </button>
        </div>
      </div>

      {/* Decorative Bottom Detail */}
      <div className="absolute bottom-10 flex flex-col items-center z-20">
        <p className="text-[9px] uppercase tracking-[0.5em] opacity-30 text-white font-light">Botanical Sanctuary</p>
      </div>
    </div>
  );
};

export default Splash;