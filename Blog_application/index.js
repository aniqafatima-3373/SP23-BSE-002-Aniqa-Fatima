const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

// FIX 1: Initialize 'app' BEFORE using it
const app = express();

// 1. Database Connection (MongoDB)
mongoose.connect('mongodb://localhost:27017/blogAppDB')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// 2. Middleware Setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload()); 

// 3. Session Configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

// 4. Request Logger Middleware [cite: 22]
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next(); 
});

// FIX 2: Routes must come AFTER middleware (like session/urlencoded)
app.use(authRoutes);
app.use(blogRoutes);

// 5. Basic Route for Testing
app.get('/', (req, res) => {
    res.render('welcome');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});