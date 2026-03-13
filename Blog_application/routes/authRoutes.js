const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

// GET routes to show forms
router.get('/register', (req, res) => res.render('register', { errors: null }));
router.get('/login', (req, res) => res.render('login', { errors: null }));

// POST route for registration with validation 
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], authController.registerUser);

// POST route for login [cite: 19]
router.post('/login', authController.loginUser);

// GET route for logout [cite: 32]
router.get('/logout', authController.logout);

module.exports = router;