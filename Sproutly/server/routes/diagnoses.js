const express = require('express');
const router = express.Router();
const Diagnosis = require('../models/Diagnosis');
const jwt = require('jsonwebtoken');

// 🔒 UTMOST ROBUST MIDDLEWARE FOR TOKEN VERIFICATION
const authMiddleware = (req, res, next) => {
  let token = req.header('x-auth-token') || req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: "No token found, authorization denied" });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    console.error("Token Auth Validation Failure:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// 1. POST: Report save karne ke liye
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { plantName, status, disease, diseaseDesc, solution, severity } = req.body;

    const newRecord = new Diagnosis({
      userId: req.userId, 
      plantName,
      status,
      disease,
      diseaseDesc: diseaseDesc || "",
      solution,
      severity
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. GET: Dashboard par records dikhane ke liye
router.get('/', authMiddleware, async (req, res) => {
  try {
    const history = await Diagnosis.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. ✨ FIXED: Is delete route ko module.exports ke UPAR hona chahiye tha
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    if (!diagnosis) {
      return res.status(404).json({ msg: 'Report not found' });
    }
    
    // Security Check: Kahin koi dusra user is report ko delete na kar de
    if (diagnosis.userId.toString() !== req.userId) {
      return res.status(401).json({ message: "User not authorized to delete this report" });
    }
    
    await diagnosis.deleteOne();
    res.json({ msg: 'Report removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ✨ CRITICAL: module.exports hamesha file ke sabse END par hota hai!
module.exports = router;