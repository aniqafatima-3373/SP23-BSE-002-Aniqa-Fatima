const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const axios = require('axios');

const SPOONACULAR_API_KEY = 'bfc3098712494d87b3707c30c2c51059';

// 1. SPLASH SCREEN
router.get('/', (req, res) => {
    res.render('welcome'); 
});

// 2. DASHBOARD (Control Panel)
router.get('/dashboard', async (req, res) => {
    try {
        const localRecipes = await Recipe.find();
        res.render('index', { recipes: localRecipes });
    } catch (err) { res.status(500).send("DB Error"); }
});

// 3. RECIPE BOX (Saved Personal Collection)
router.get('/recipe-box', async (req, res) => {
    try {
        // Sirf MongoDB se saved recipes fetch karega
        const savedRecipes = await Recipe.find();
        res.render('recipe-box', { recipes: savedRecipes });
    } catch (err) { res.status(500).send("Error loading Box"); }
});

// 4. SMART SEARCH ROUTE (Updated with Leftover Logic)
router.get('/search', async (req, res) => {
    try {
        const query = req.query.items;
        if (!query) return res.redirect('/dashboard');
        
        const itemsArray = query.split(',').map(i => i.trim().toLowerCase());

        // SMART LOGIC: $all operator use kiya hai taake wahi recipe aaye 
        // jin mein saare searched ingredients maujood hon.
        const localRecipes = await Recipe.find({ 
            ingredients: { $all: itemsArray.map(i => new RegExp(i, 'i')) } 
        });

        let apiRecipes = [];
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                params: {
                    ingredients: query,
                    number: 12, // Zyada results taake gallery achi lage
                    apiKey: SPOONACULAR_API_KEY
                },
                timeout: 5000 
            });
            apiRecipes = response.data;
        } catch (apiErr) {
            console.log("Internet API failed, showing only local.");
        }

        const allRecipes = [...localRecipes, ...apiRecipes];
        res.render('results', { recipes: allRecipes, items: itemsArray });

    } catch (err) {
        res.status(500).send("Server Error.");
    }
});

// 5. DETAIL ROUTE
router.get('/recipe/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        // Agar ID lambi hai (MongoDB ID), toh database se dhoondo
        if (recipeId.length > 10) {
            const recipe = await Recipe.findById(recipeId);
            return res.render('detail', { recipe: recipe });
        }
        // Warna Spoonacular API se fetch karo
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: { apiKey: SPOONACULAR_API_KEY }
        });
        res.render('detail', { recipe: response.data });
    } catch (err) {
        res.status(404).send("Recipe not found.");
    }
});

// 6. CREATE (Add to MongoDB)
router.post('/add-recipe', async (req, res) => {
    try {
        const newRecipe = new Recipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            imageUrl: req.body.imageUrl || 'https://via.placeholder.com/150',
            prepTime: req.body.prepTime || 15
        });
        
        await newRecipe.save();
        res.status(201).json({ message: "Success" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 7. UPDATE
router.put('/update-recipe/:id', async (req, res) => {
    try {
        const { title, ingredients, instructions, imageUrl, prepTime } = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            { title, ingredients, instructions, imageUrl, prepTime }, 
            { new: true }
        );
        res.json({ message: "Updated", data: updatedRecipe });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 8. DELETE
router.delete('/delete-recipe/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;