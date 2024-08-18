const mongoose = require('mongoose');

// Define the schema for a question paper
const responseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true},
  answers: { type: [Number], required: true },
  
});

// Create a Mongoose model for question paper
const response = mongoose.model('response', responseSchema);

module.exports = response;
