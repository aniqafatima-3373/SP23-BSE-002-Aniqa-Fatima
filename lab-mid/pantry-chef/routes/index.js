const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User'); // User model ko import kiya
const axios = require('axios');
const bcrypt = require('bcryptjs'); // Password security ke liye

const SPOONACULAR_API_KEY = 'bfc3098712494d87b3707c30c2c51059';

// ==========================================
// 1. AUTHENTICATION ROUTES (New Logic)
// ==========================================

// Splash Screen / Welcome Page
router.get('/', (req, res) => {
    res.render('welcome'); 
});

// GET Signup Page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// POST Signup Logic
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.send("User already exists! Try another email or username.");

        // Password Hashing (Security)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send("Error during signup: " + err.message);
    }
});

// GET Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST Login Logic
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.send("User not found!");

        // Compare Hashed Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.send("Invalid credentials!");

        // Session Mein User Data Save Karein
        req.session.user = user;
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).send("Login error occurred.");
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// ==========================================
// 2. CORE APP ROUTES (Protected)
// ==========================================

router.get('/dashboard', async (req, res) => {
    // 1. Pehle check karein ke user login hai ya nahi
    if (!req.session.user) {
        return res.redirect('/login');
    }
    
    try {
        // 2. Database se saari recipes nikaal kar layein (ZAROORI)
        const allRecipes = await Recipe.find(); 
        
        // 3. Ab user aur recipes DONO ko EJS file mein bhejein
        res.render('dashboard', { 
            user: req.session.user, 
            recipes: allRecipes // Ye line missing thi aapke code mein
        });
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).send("Database se data lane mein masla ho raha hai.");
    }
});

// Recipe Box (Saved Personal Collection)
router.get('/recipe-box', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const savedRecipes = await Recipe.find();
        res.render('recipe-box', { recipes: savedRecipes });
    } catch (err) { res.status(500).send("Error loading Box"); }
});

// Smart Search Route
router.get('/search', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const query = req.query.items;
        if (!query) return res.redirect('/dashboard');
        
        const itemsArray = query.split(',').map(i => i.trim().toLowerCase());

        const localRecipes = await Recipe.find({ 
            ingredients: { $all: itemsArray.map(i => new RegExp(i, 'i')) } 
        });

        let apiRecipes = [];
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
                params: {
                    ingredients: query,
                    number: 12,
                    apiKey: SPOONACULAR_API_KEY
                },
                timeout: 5000 
            });
            apiRecipes = response.data;
        } catch (apiErr) {
            console.log("External API failed, showing local only.");
        }

        const allRecipes = [...localRecipes, ...apiRecipes];
        res.render('results', { recipes: allRecipes, items: itemsArray });

    } catch (err) {
        res.status(500).send("Server Search Error.");
    }
});

// Detail Route
router.get('/recipe/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
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
        res.status(404).send("Recipe not found.");
    }
});

// ==========================================
// 3. CRUD OPERATIONS (API/AJAX)
// ==========================================

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
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/update-recipe/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Updated", data: updatedRecipe });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/delete-recipe/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;