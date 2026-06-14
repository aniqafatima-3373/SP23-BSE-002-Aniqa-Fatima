const mongoose = require('mongoose');

const GardenSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        default: "My Botanical Sanctuary" 
    },
    // Concept 4: Collaboration - List of users who share this garden
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    // List of plants in this garden
    plants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Plant' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Garden', GardenSchema);