const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const jwt = require('jsonwebtoken');

// 🔒 MIDDLEWARE: Token se User ID verify karne ke liye
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token found, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// 1. GET: http://localhost:5000/api/plants (Fetch Specific User's Plants)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const plants = await Plant.find({ userId: req.userId });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: http://localhost:5000/api/plants (Add New Plant linked to User)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, type, wateringSchedule, image, sunlight, precautions, health } = req.body;

    const newPlant = new Plant({
      userId: req.userId,
      name,
      type,
      wateringSchedule,
      image,
      sunlight,
      precautions,
      health: health || 100
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant); 
  } catch (err) {
    console.error("Route Save Error:", err);
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE: http://localhost:5000/api/plants/:id (✨ SECURE DELETE ROUTE)
// CRITICAL FIX: Yahan path sirf '/:id' hona chahiye, '/plants/:id' nahi!
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Yeh dhundega aur sirf usi plant ko delete karega jo is logged-in user ka apna hai
    const plant = await Plant.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    
    if (!plant) {
      return res.status(404).json({ message: "Plant not found or unauthorized to delete this item." });
    }
    
    res.json({ message: "Plant successfully removed from sanctuary records." });
  } catch (err) {
    console.error("Backend Delete Route Error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;