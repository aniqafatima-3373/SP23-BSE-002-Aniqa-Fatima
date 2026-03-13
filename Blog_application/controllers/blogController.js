const Post = require('../models/post');
const path = require('path');

// 1. Dashboard: Display all posts with user relationships [cite: 27]
exports.getDashboard = async (req, res) => {
    try {
        // Use populate() to get the username of the author [cite: 27]
        const posts = await Post.find({}).populate('author');
        res.render('dashboard', { posts });
    } catch (error) {
        res.status(500).send("Error loading dashboard");
    }
};

// 2. Create Post: Handle content and image upload [cite: 20, 24]
exports.storePost = async (req, res) => {
    try {
        let imageName = "";

        // Validate and handle image upload [cite: 24]
        if (req.files && req.files.image) {
            const image = req.files.image;
            imageName = Date.now() + '_' + image.name; // Unique name
            const uploadPath = path.resolve(__dirname, '..', 'public/uploads', imageName);

            await image.mv(uploadPath); // Save image to public folder
        }

        // Create post in DB [cite: 20, 26]
        await Post.create({
            ...req.body,
            image: imageName,
            author: req.session.userId // Link to logged-in user [cite: 26]
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post");
    }
};

// 3. Read: Get a single post by ID
exports.getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        res.render('post', { post });
    } catch (error) {
        res.status(404).send("Post not found");
    }
};

// 4. Update: Edit existing post content 
exports.editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('editPost', { post });
    } catch (error) {
        res.status(404).send("Post not found");
    }
};

exports.updatePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Error updating post");
    }
};

// 5. Delete: Remove post from DB 
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Error deleting post");
    }
};