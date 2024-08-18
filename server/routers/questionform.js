const express = require("express");
const router = express.Router();
const questionform = require("../controllers/questionform-controller");
const {myquestionpapers, makelive, savequizdata}= require("../controllers/myquestionpapers");
const { joinquiz,quizdetails,startquiz } = require("../controllers/joinquiz");
const { quizeload,quizecheck } = require("../controllers/quizzes");
router.route("/questionform").post(questionform);
router.route("/myquestionpapers").get(myquestionpapers);
router.route("/makelive").post(makelive);
router.route("/savequizdata").post(savequizdata);
router.route('/joinquiz').post(joinquiz);
router.route('/quizdetails').post(quizdetails);
router.route('/startquiz').post(startquiz);
router.route('/quizeload/:codeOfQuiz').get(quizeload);
router.route('/quizecheck/:codeOfQuiz').post(quizecheck);









module.exports = router;
