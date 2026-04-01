const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const UserSchema = new mongoose.Schema({ 
username: { type: String, required: true, unique: true }, 
password: { type: String, required: true } 
}); 
// NEW WAY: No 'next' parameter needed for async functions
UserSchema.pre('save', async function () { 
  if (!this.isModified('password')) return; 
  
  this.password = await bcrypt.hash(this.password, 10); 
});
module.exports = mongoose.model('User', UserSchema);