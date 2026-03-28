const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }], // Array for matching logic
    instructions: { type: String, required: true },
    prepTime: { type: Number, required: true },
    imageUrl: { type: String, default: 'https://via.placeholder.com/150' }
});

module.exports = mongoose.model('Recipe', recipeSchema);