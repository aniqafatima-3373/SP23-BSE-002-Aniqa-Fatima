const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    },
    content: { 
        type: String, 
        required: [true, 'Content is required'] 
    },
    image: { 
        type: String // Stores the path/filename of the uploaded image [cite: 20]
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // This allows the use of .populate() 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);