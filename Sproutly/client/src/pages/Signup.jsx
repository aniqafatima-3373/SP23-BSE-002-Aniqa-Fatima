import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../utils/api';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/registrations', formData);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert("🎯 Registration Successful!");
      navigate('/dashboard'); 
    } catch (err) {
      alert("Signup Error: " + (err.response?.data?.message || err.message || "Server connection failed"));
    }
  };

  return (
    // 🌿 LOCKED VIEWPORT: h-screen and overflow-hidden matched with Login layout
    <div className="min-h-screen w-full bg-[#FDFBF7] flex items-center justify-center font-sans relative overflow-x-hidden">
      
      {/* Right Backdrop shape matching Login screen size and alignment perfectly */}
      <div className="absolute top-0 right-0 w-[35vw] h-full bg-[#1B3022] z-0 hidden md:block rounded-l-[50px]"></div>

      {/* Main Container - max-w-6xl and layout gaps matched exactly with login grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 p-6 md:p-12 z-10 items-center">
        
        {/* --- Left Column: Signup Form Container (Exact same dimensions as login card) --- */}
        <div className="flex items-center justify-center order-1">
          <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-[36px] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-100/70">
            
            {/* Minimal Logo */}
            <div className="flex items-center space-x-2 mb-6 text-[#1B3022]">
              <span className="text-2xl">🌱</span>
              <span className="text-base font-bold tracking-tight">Sproutly</span>
            </div>
            
            {/* Header Typography */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B3022] tracking-tight">Create Account</h2>
              <p className="text-gray-400 mt-1.5 text-xs font-medium tracking-wide">Join our shared botanical sanctuary today.</p>
            </div>
            
            {/* Input Forms and Paddings - Matched perfectly with Login screen sizes */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Input */}
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" placeholder="Full Name" required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-50/60 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#808000]/20 focus:border-[#808000] text-xs font-medium transition" 
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="email" placeholder="hello@sproutly.com" required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-50/60 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#808000]/20 focus:border-[#808000] text-xs font-medium transition" 
                />
              </div>
              
              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} placeholder="Password (Min 8 characters)" required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-gray-50/60 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#808000]/20 focus:border-[#808000] text-xs font-medium transition" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#808000] z-20"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Signup Submit Button */}
              <button type="submit" className="w-full py-3.5 bg-[#808000] text-white rounded-2xl font-bold text-xs shadow-sm hover:shadow-md transition active:scale-[0.99]">
                Start Your Garden
              </button>
              
              <div className="flex items-center space-x-3 text-gray-200 my-4">
                <hr className="flex-grow border-gray-100" />
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">OR</span>
                <hr className="flex-grow border-gray-100" />
              </div>
            </form>
            
            {/* Redirect Link */}
            <p className="mt-6 text-center text-xs text-gray-400 font-medium">
              Already a member? <Link to="/auth/sessions" className="text-[#808000] font-bold hover:underline ml-1">Login</Link>
            </p>
          </div>
        </div>

        {/* --- Right Column: Plant Image Container (Identical to Login Showcase) --- */}
        <div className="hidden md:flex items-center justify-center order-2">
          <div className="w-full max-w-md aspect-square bg-white p-6 rounded-[44px] shadow-[0_20px_60px_rgba(27,48,34,0.05)] transform rotate-2 border border-[#808000]/5">
            <img 
              src="/signup.png" 
              alt="Botanical Signup Showcase" 
              className="w-full h-full object-cover rounded-[28px]"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;