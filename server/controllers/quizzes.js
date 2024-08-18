const multer = require('multer');
const path = require('path');
const QuestionPaper = require('../models/questionform');
const express = require('express');
const responseans= require('../models/response')

const quizeload = async (req, res) => {
    const { codeOfQuiz } = req.params;

    try {
        const quiz = await QuestionPaper.findOne({ code: codeOfQuiz });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching questions' });
    }
}

const quizecheck = async (req, res) => {
    const { codeOfQuiz } = req.params;
    const { name, answers } = req.body;

    try {
        const quiz = await QuestionPaper.findOne({ code: codeOfQuiz });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const updatedresponse = await responseans.findOneAndUpdate(
          { name: name },
          { $set: { answers :answers
        } },
          { new: true, upsert: true }
        );
        await quiz.save();

        let correctCount = 0;
        for (let i = 0; i < quiz.questions.length; i++) {
            if (Number(quiz.questions[i].answer) === answers[i]) {
                correctCount++;
            }
        }

        const marks = correctCount;
        res.json({ quiz: quiz.questions, marks: marks , totalquestions :quiz.questions.length});
    } catch (error) {
        res.status(500).json({ error: 'Error checking answers' });
    }
}

module.exports = { quizeload, quizecheck };
