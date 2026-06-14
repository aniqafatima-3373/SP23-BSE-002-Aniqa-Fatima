import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Leaf, ShieldAlert, Heart, Sparkles, LayoutDashboard, Calendar, Bug } from 'lucide-react';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [scanHistory, setScanHistory] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Existing Plants fetch code
        const res = await api.get('/plants');
        const dataArray = Array.isArray(res.data) ? res.data : (res.data?.plants || res.data?.data || []);
        setPlants(dataArray);

        // 2. SECURE FETCH: Header check ke sath backend se history mangna
        const historyRes = await api.get('/diagnoses');
        
        let historyData = [];
        if (historyRes.data) {
          if (Array.isArray(historyRes.data)) {
            historyData = historyRes.data;
          } else if (Array.isArray(historyRes.data.diagnoses)) {
            historyData = historyRes.data.diagnoses;
          } else if (Array.isArray(historyRes.data.data)) {
            historyData = historyRes.data.data;
          }
        }
        setScanHistory(historyData);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalPlants = plants.length;
  const gardenHealth = totalPlants > 0 ? 92 : 0; 
  
  const recentDiagnosis = scanHistory.length > 0 
    ? scanHistory[0].disease 
    : (totalPlants > 0 ? "Healthy State" : "No Diagnosis Data");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] font-serif">
        <div className="text-center">
          <Sparkles className="animate-spin text-[#808000] mx-auto mb-3" size={32} />
          <p className="text-sm font-medium text-[#1B3022]/60 animate-pulse uppercase tracking-widest">Loading Connected Ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-serif text-[#1B3022] antialiased">
      <Navbar />

      {/* =========================================================================
          1. HERO BANNER REGION (EXTRA LARGE HEIGHT FOR MAX PICTURE SHOWCASE)
          ========================================================================= */}
      <section className="w-full min-h-[80vh] relative overflow-hidden flex items-center justify-center text-center px-6 py-28 border-b border-gray-100 bg-[#1B3022]">
        
        {/* Full Screen Big Image Background without fading splits */}
        <img 
          src="/bg.png"  
      
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0 brightness-[0.4]" 
        />
        
        {/* Centered Welcome Box Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-5xl mb-4 select-none animate-bounce">🍃</span>
          <h2 className="text-5xl md:text-7xl font-normal text-white tracking-tight leading-tight">
            Welcome to <span className="font-bold">Sproutly</span>
          </h2>
          <p className="text-white/85 text-base font-normal font-sans leading-relaxed mt-6 max-w-xl">
            An AI-powered ecological tracking sanctuary designed to bridge the gap between automated botanical logging and advanced clinical diagnostics layers.
          </p>
        </div>

      </section>

      {/* =========================================================================
          2. GARDEN OVERVIEW SIGHT (Tight Spacing & Bigger KPI Window Cards)
          ========================================================================= */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center bg-[#FDFBF7] py-12 px-6 md:px-8">
        
        {/* Left Column Showcase Frame */}
        <div className="md:col-span-5 flex items-center justify-center">
          <div className="w-full aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(27,48,34,0.03)] bg-white p-2 border border-gray-100">
            <img 
              src="/white.png" 
             
              className="w-full h-full object-cover rounded-[18px]"
            />
          </div>
        </div>

        {/* Right Column Windows Layout */}
        <div className="md:col-span-7 flex flex-col justify-center h-full w-full">
          <div className="mb-5">
            <span className="text-[9px] font-bold tracking-[0.25em] text-[#808000] uppercase block mb-1 font-sans">Live Analytics</span>
            <h2 className="text-3xl font-light tracking-tight text-[#1B3022]">Garden Overview</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 font-sans w-full">
            
            {/* KPI 1: Total Plants */}
            <div className="border border-gray-200/80 rounded-xl p-6 bg-[#FDFBF7] flex flex-col justify-between w-full min-h-[160px] md:min-h-[180px] hover:border-[#808000]/30 transition-all duration-300 shadow-sm">
              <div className="text-gray-400 text-lg"><Leaf size={22} className="text-[#1B3022]/70" /></div>
              <div className="mt-auto">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block">Total Plants</span>
                <span className="text-3xl font-serif font-medium text-[#1B3022] mt-1 block">{totalPlants}</span>
              </div>
            </div>

            {/* KPI 2: Garden Health */}
            <div className="border border-gray-200/70 rounded-xl p-6 bg-[#FDFBF7] flex flex-col justify-between w-full min-h-[160px] md:min-h-[180px] hover:border-[#808000]/30 transition-all duration-300 shadow-sm">
              <div className="text-gray-400 text-lg"><Heart size={22} className="text-[#1B3022]/70" /></div>
              <div className="mt-auto">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block">Garden Health</span>
                <span className="text-3xl font-serif font-medium text-[#1B3022] mt-1 block">{gardenHealth}%</span>
              </div>
            </div>

            {/* KPI 3: AI Saved Reports */}
            <div className="border border-gray-200/70 rounded-xl p-6 bg-[#FDFBF7] flex flex-col justify-between w-full min-h-[160px] md:min-h-[180px] hover:border-[#808000]/30 transition-all duration-300 shadow-sm">
              <div className="text-gray-400 text-lg"><Sparkles size={22} className="text-[#1B3022]/70" /></div>
              <div className="mt-auto">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block">AI Saved Reports</span>
                <span className="text-3xl font-serif font-medium text-[#1B3022] mt-1 block">{scanHistory.length}</span>
              </div>
            </div>

            {/* KPI 4: Last Diagnosis */}
            <div className="border border-gray-200/70 rounded-xl p-6 bg-[#FDFBF7] flex flex-col justify-between w-full min-h-[160px] md:min-h-[180px] hover:border-[#808000]/30 transition-all duration-300 shadow-sm">
              <div className="text-gray-400 text-lg"><ShieldAlert size={22} className="text-[#1B3022]/70" /></div>
              <div className="mt-auto w-full overflow-hidden">
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase block">Last Diagnosis</span>
                <span className="text-xl font-serif font-medium text-[#1B3022] mt-1 block truncate uppercase" title={recentDiagnosis}>
                  {scanHistory.length > 0 ? recentDiagnosis : "4H AGO"}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================================
          3. MAIN MATRIX CONTENT AREA
          ========================================================================= */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 mt-4 pb-16">
        
        {/* Empty state monitoring banner fallback wrapper */}
        {totalPlants === 0 && (
          <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto font-sans">
            <span className="text-4xl">🌵</span>
            <h3 className="text-sm font-bold text-[#1B3022] mt-4">Your Ecosystem is Empty</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Click on "My Garden" tab above to add plants and start tracking live metrics dynamically!</p>
          </div>
        )}

        {/* AI CLINICAL RECORDS GRID SECTION */}
        <div className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm mt-6">
          <div className="flex items-center space-x-2 mb-8 border-b border-gray-50 pb-4">
            <LayoutDashboard className="text-[#808000]" size={18} />
            <h3 className="text-base font-bold tracking-tight text-[#1B3022]">AI Clinical Records &amp; Scans History</h3>
          </div>

          {scanHistory.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-100 rounded-2xl bg-gray-50/40 font-sans">
              <span className="text-3xl">🏥</span>
              <p className="text-gray-400 italic text-xs font-medium mt-2">No medical records saved yet. Go to "AI Clinic" to scan and save results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scanHistory.map((log, index) => (
                <div key={log._id || index} className="border border-[#808000]/20 bg-[#808000]/5 rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(128,128,0,0.04)] hover:border-[#808000]/40 transition duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-3 font-sans">
                      <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${log.status === 'Healthy' ? 'bg-emerald-800 text-white' : 'bg-red-700 text-white'}`}>
                        {log.status || 'Infected'}
                      </span>
                      <div className="flex items-center space-x-1 text-[#1B3022]/40 text-[10px] font-bold">
                        <Calendar size={10} />
                        <span>{log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Recent'}</span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-[#1B3022] tracking-tight">{log.plantName}</h4>
                    
                    <div className="flex items-center gap-1 mt-2 text-amber-950 bg-amber-600/10 px-2 py-0.5 rounded-lg w-fit font-sans">
                      <Bug size={11} className="text-amber-800" />
                      <span className="text-[11px] font-bold truncate max-w-[240px]">{log.disease}</span>
                    </div>

                    <p className="text-xs text-[#1B3022]/70 font-sans mt-3 leading-relaxed line-clamp-2">{log.diseaseDesc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#1B3022]/10 font-sans">
                    <p className="text-[9px] uppercase font-bold text-[#1B3022]/40 mb-1 flex items-center gap-1">Prescribed Cure:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#1B3022]/80 font-medium">
                      {log.solution && Array.isArray(log.solution) ? log.solution.slice(0, 2).map((step, sIdx) => (
                        <li key={sIdx} className="truncate">{step}</li>
                      )) : <li>Follow standard botanical care.</li>}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================================
            ✨ ECO-FOOTER CONTAINER 
            ========================================================================= */}
        <footer className="w-full mt-16 pt-8 border-t border-gray-200/70 flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-[#1B3022]">
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

export default Dashboard;