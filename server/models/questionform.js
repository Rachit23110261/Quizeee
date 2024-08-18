const mongoose = require('mongoose');

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  image: { type: String } // Image field
});

// Define the schema for a question paper
const questionPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  isLive: {type: Boolean, default: false},
  time: { type: String, default: '00:00' }, // Default time set to midnight
  duration: { type: String, default: '60' }, // Default duration set to 60 minutes
  date: { type: Date, default: Date.now },
  code: { type: Number, default: Math.floor(100000 + Math.random() * 900000) } // Random 6-digit code
});

// Create a Mongoose model for question paper
const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);

module.exports = QuestionPaper;
