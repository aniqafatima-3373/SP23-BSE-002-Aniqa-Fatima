const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('./models/User'); 
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Database Connection
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sproutly';
mongoose.connect(dbURI)
    .then(() => console.log("🌱 Sproutly Backend: Connected to MongoDB"))
    .catch(err => { console.error(err.message); process.exit(1); });

// Inline Signup Route
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });
        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// Inline Login Route
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// ---------------------------------------------------------
// 🚀 REGISTERING ALL ROUTES
// ---------------------------------------------------------

// 1. Plants Routing Setup
const plantRoutes = require('./routes/plants');
app.use('/api/plants', plantRoutes);

// 2. Diagnoses Routing Setup (✨ CONNECTED NEW CLINIC FEATURE)
const diagnosisRoutes = require('./routes/diagnoses');
app.use('/api/diagnoses', diagnosisRoutes);


// ---------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server active on port: ${PORT}`));