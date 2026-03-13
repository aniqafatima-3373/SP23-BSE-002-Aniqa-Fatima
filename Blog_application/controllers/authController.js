const User = require('../models/user'); // Ensure path/casing matches your models folder [cite: 26]
const bcrypt = require('bcrypt'); // Required for password encryption 
const { validationResult } = require('express-validator'); // For handling input validation errors [cite: 31]

// --- REGISTER USER ---
exports.registerUser = async (req, res) => {
    // Check for validation errors from express-validator [cite: 31]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Display validation errors on registration page 
        return res.render('register', { errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { errors: [{ msg: 'Username already taken' }] });
        }

        // Encrypt the password using bcrypt 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to MongoDB [cite: 17, 26]
        await User.create({
            username,
            password: hashedPassword
        });

        res.redirect('/login'); 
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send("An error occurred during registration.");
    }
};

// --- LOGIN USER ---
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        if (user) {
            // Compare passwords using bcrypt 
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Proper session handling: store user ID in session 
                req.session.userId = user._id;
                return res.redirect('/dashboard');
            }
        }
        
        // Display validation/auth errors on login page if it fails 
        res.render('login', { errors: [{ msg: 'Invalid username or password' }] });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("An error occurred during login.");
    }
};

// --- LOGOUT USER ---
exports.logout = (req, res) => {
    // Destroy the session to log out 
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/login');
    });
};