const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const axios = require('axios');

const SPOONACULAR_API_KEY = 'bfc3098712494d87b3707c30c2c51059';
// 1. Splash Screen
router.get('/', (req, res) => {
    res.render('welcome'); // 'welcome.ejs' dikhayega
});
// 2. Dashboard (Purana home route ab yahan hai)
router.get('/dashboard', async (req, res) => {
    try {
        const localRecipes = await Recipe.find();
        res.render('index', { recipes: localRecipes });
    } catch (err) { res.status(500).send("DB Error"); }
});


// 2. SEARCH ROUTE
router.get('/search', async (req, res) => {
    try {
        const query = req.query.items;
        if (!query) return res.redirect('/');
        const itemsArray = query.split(',').map(i => i.trim().toLowerCase());

        const localRecipes = await Recipe.find({ 
            ingredients: { $in: itemsArray } 
        });

        let apiRecipes = [];
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                params: {
                    ingredients: query,
                    number: 10,
                    apiKey: SPOONACULAR_API_KEY
                },
                timeout: 5000 
            });
            apiRecipes = response.data;
        } catch (apiErr) {
            console.log("Internet API failed.");
        }

        const allRecipes = [...localRecipes, ...apiRecipes];
        res.render('results', { recipes: allRecipes, items: itemsArray });

    } catch (err) {
        res.status(500).send("Server Error.");
    }
});

// 3. DETAIL ROUTE
router.get('/recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        if (recipeId.length > 10) {
            const recipe = await Recipe.findById(recipeId);
            return res.render('detail', { recipe: recipe });
        }
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: { apiKey: SPOONACULAR_API_KEY }
        });
        res.render('detail', { recipe: response.data });
    } catch (err) {
        res.status(404).send("Not found.");
    }
});

// 4. CREATE (Updated for Dashboard Compatibility)
router.post('/add-recipe', async (req, res) => {
    try {
        // Explicitly mapping data from req.body to ensure it matches the Schema
        const newRecipe = new Recipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            imageUrl: req.body.imageUrl,
            prepTime: req.body.prepTime || 10
        });
        
        await newRecipe.save();
        // Redirect back to home so the table updates immediately
        res.status(201).json({ message: "Success" });
    } catch (err) {
        console.error("Save Error:", err);
        res.status(400).json({ error: err.message });
    }
});

// 5. UPDATE (Updated for Dashboard Compatibility)
router.put('/update-recipe/:id', async (req, res) => {
    try {
        const { title, ingredients, instructions, imageUrl } = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            { title, ingredients, instructions, imageUrl }, 
            { new: true }
        );
        res.json({ message: "Updated", data: updatedRecipe });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(400).json({ error: err.message });
    }
});

// 6. DELETE
router.delete('/delete-recipe/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;