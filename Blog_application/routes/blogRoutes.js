const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware'); // Restricts access 

// Dashboard - View all posts
router.get('/dashboard', authMiddleware, blogController.getDashboard);

// Create Post 
router.get('/post/new', authMiddleware, (req, res) => res.render('createPost'));
router.post('/post/store', authMiddleware, blogController.storePost);

// View Single Post 
router.get('/post/:id', blogController.getSinglePost);

// Update Post 
router.get('/post/edit/:id', authMiddleware, blogController.editPost);
router.post('/post/update/:id', authMiddleware, blogController.updatePost);

// Delete Post 
router.post('/post/delete/:id', authMiddleware, blogController.deletePost);

module.exports = router;