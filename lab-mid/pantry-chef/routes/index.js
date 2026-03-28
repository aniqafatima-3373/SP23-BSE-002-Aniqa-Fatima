const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { title: 'Pantry Chef' });
});

/* GET recipes based on available ingredients */
router.get('/search', async (req, res) => {
    try {
        // Split comma-separated string into an array
        const queryItems = req.query.items.split(',').map(item => item.trim().toLowerCase());
        
        // Find recipes that contain at least one of the user's ingredients
        const recipes = await Recipe.find({ 
            ingredients: { $in: queryItems } 
        });
        
        res.render('results', { recipes, queryItems });
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

module.exports = router;