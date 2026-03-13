const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'], 
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'] 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt 

module.exports = mongoose.model('User', userSchema);