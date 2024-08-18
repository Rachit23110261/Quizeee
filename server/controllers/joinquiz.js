const Questionform = require("../models/questionform");
const Response = require('../models/response'); // Corrected model import
const mongoose = require("mongoose");

// Get the current date and time components
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-indexed
const date = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

// Function to get current time in "HH:MM" format
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

var current_code = 0;

// Join quiz function
const joinquiz = async (req, res) => {
  try {
    const { code } = req.body;
    console.log(`Received join code: ${code}`);
    current_code = code;

    const questionpaper = await Questionform.findOne({ code: code });

    if (!questionpaper) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    res.json(questionpaper);
  } catch (error) {
    console.error("Error in joinquiz:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get quiz details function
const quizdetails = async (req, res) => {
  try {
    
    
    console.log(`Received quiz details code: ${current_code}`);

    const questionpaper = await Questionform.findOne({ code: current_code });

    if (!questionpaper) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    res.json(questionpaper);
  } catch (error) {
    console.error("Error in quizdetails:", error);
    res.status(500).json({ message: error.message });
  }
};

// Start quiz function
const startquiz = async (req, res) => {
  try {
    const { name } = req.body; // Destructuring to get the name
    const namedone = await Response.create({ name: name, answers: [] }); // Assuming an empty answers array initially

    const code = current_code;
    console.log(`Starting quiz with code: ${code}`);

    const questionpaper = await Questionform.findOne({ code: code });

    if (!questionpaper) {
      return res.status(404).json({ message: "Question paper not found" });
    }

    const x = questionpaper.date;
    console.log(`Question paper date: ${x}`);
    console.log(`Current date: ${date}`);
    console.log(`Current time: ${getCurrentTime()}`);

    if (
      x.getDate() === date &&
      (x.getMonth() + 1) === month &&
      x.getFullYear() === year &&
      questionpaper.time <= getCurrentTime()
    ) {
      res.json(questionpaper);
    } else {
      return res.status(404).json({ message: "Question paper is not live yet" });
    }
  } catch (error) {
    console.error("Error in startquiz:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { joinquiz, quizdetails, startquiz };
