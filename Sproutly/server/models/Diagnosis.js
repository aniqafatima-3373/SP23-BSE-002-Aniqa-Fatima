const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
  // ✨ User ID field hona lazmi hai
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plantName: { type: String, required: true },
  status: { type: String, required: true },
  disease: { type: String, required: true },
  diseaseDesc: { type: String, default: '' }, // Description save karne ke liye
  solution: { type: [String], required: true },
  severity: { type: String, default: 'medium' }
}, { timestamps: true });

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);

