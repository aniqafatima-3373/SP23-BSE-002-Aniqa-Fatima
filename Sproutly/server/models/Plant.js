const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  // ✨ FIXED: User ID ko plant ke sath link kar diya hai
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  wateringSchedule: { type: String, required: true },
  image: { type: String, default: '' },
  sunlight: { type: String, default: '' },
  precautions: { type: String, default: '' },
  health: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Plant', PlantSchema);