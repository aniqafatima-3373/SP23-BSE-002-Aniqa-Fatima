import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyGarden from './pages/MyGarden'; 
import Clinic from './pages/Clinic'; 

// 🔐 Security Guard (Protected Route): Yeh bina token ke kisi ko andar nahi aane dega
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // ✨ Agar token nahi hai, toh user ko seedha Splash (Landing) page par bhej do
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Bina login ke khulenge) */}
        <Route path="/" element={<Splash />} />
        <Route path="/auth/sessions" element={<Login />} />
        <Route path="/auth/registrations" element={<Signup />} />

        {/* 🔒 Protected Routes (Sirf Login users ke liye - Logout hote hi block) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/my-garden" element={
          <ProtectedRoute>
            <MyGarden />
          </ProtectedRoute>
        } />
        
        <Route path="/clinic" element={
          <ProtectedRoute>
            <Clinic />
          </ProtectedRoute>
        } />

        {/* Catch-all route: Agar koi galat URL likhe toh use Splash par redirect karo */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;