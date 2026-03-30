const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Recipe title is required'] 
    },
    ingredients: { 
        type: [String], 
        default: [] 
    },
    instructions: { 
        type: String, 
        default: 'No instructions provided yet.' 
    },
    prepTime: { 
        type: Number, 
        default: 15 
    },
    imageUrl: { 
        type: String, 
        default: 'https://via.placeholder.com/150' 
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);