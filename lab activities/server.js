require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const authRoutes = require('./routes/auth'); 
const protectedRoutes = require('./routes/protected'); 

const app = express(); 

// Middleware to parse JSON (Crucial for Postman)
app.use(express.json()); 

// FIXED: Modern Mongoose connection (No callback)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// Routes
app.use('/auth', authRoutes); 
app.use('/api', protectedRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log(`🚀 Server running on http://localhost:${PORT}`); 
});