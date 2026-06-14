const express = require('express');
const router = express.Router();
const Garden = require('../models/Garden');
const auth = require('../middleware/authMiddleware');

// @route   GET api/gardens
// @desc    Get the shared garden details for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        // Hum user ke linked gardenId se garden find karenge
        // Ismein members aur plants ki details bhi "populate" kar rahe hain
        const garden = await Garden.find({ members: req.user })
            .populate('members', 'name email')
            .populate('plants');

        if (!garden) return res.status(404).json({ msg: "Garden not found" });

        res.json(garden);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;