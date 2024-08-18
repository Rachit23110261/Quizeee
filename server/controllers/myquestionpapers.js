const QuestionPaper = require("../models/questionform");
const Questionform = require("../models/questionform");
const mongoose = require('mongoose');

var id1= ''

const myquestionpapers = async (req, res) => {
    try {
        const questionPapers = await Questionform.find();
        res.json(questionPapers);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
  const makelive = async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);
      id1=id;

  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ObjectId" });

      }
      const questionpaper= await Questionform.findOne({_id:id})
  
      const updatedQuestionPaper = await Questionform.findOneAndUpdate(
        { _id: id },
        { $set: { isLive: !questionpaper.isLive } },
        { new: true, upsert: true }
      );
  
      if (!updatedQuestionPaper) {
        return res.status(404).json({ message: "Question paper not found" });
      }
  
      res.json(updatedQuestionPaper);
    } catch (error) {
      console.error("Error in makelive:", error);
      res.status(500).json({ message: error.message });
    }
  };
  const savequizdata = async (req, res) => {
    try {
      const { duration, date, time , code} = req.body;
      console.log(req.body);
  
      if (!mongoose.Types.ObjectId.isValid(id1)) {
        return res.status(400).json({ message: "Invalid ObjectId" });
      }
  
      const updatedQuestionPaper = await Questionform.findOneAndUpdate(
        { _id: id1 },
        { $set: { duration: duration,
        date: date,
        time: time,
        code: code
      } },
        { new: true, upsert: true }
      );
  
      if (!updatedQuestionPaper) {
        return res.status(404).json({ message: "Question paper not found" });
      }
  
      res.json(updatedQuestionPaper);
    } catch (error) {
      console.error("Error in makelive:", error);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports={myquestionpapers,makelive,savequizdata}