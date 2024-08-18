const multer = require('multer');
const path = require('path');
const QuestionPaper = require('../models/questionform');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const questionform = async (req, res) => {
  try {
    console.log(req.body)
    upload= await QuestionPaper.create(req.body)
    res.status(200).json({message: 'Successful Upload'})
  } catch (error) {
    console.error('Error during saving question paper:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = questionform;
