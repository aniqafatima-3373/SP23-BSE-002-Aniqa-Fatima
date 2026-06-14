import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-black text-[#1B3022]">Sproutly.</Link>
      
      <div className="flex items-center space-x-6 text-sm font-bold text-gray-600">
        {/* 🎯 Fixed REST URL targets */}
        <Link to="/dashboard" className="hover:text-[#808000] transition">Dashboard</Link>
        <Link to="/my-garden" className="hover:text-[#808000] transition">My Garden</Link> {/* 👈 Path updated here */}
        <Link to="/clinic" className="hover:text-[#808000] transition">AI Clinic</Link>
        
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-bold transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;