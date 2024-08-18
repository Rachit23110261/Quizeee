import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Livequiz.css';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Livequiz = () => {
  const navigate = useNavigate();
  const { codeOfQuiz } = useParams();
  const { namedone, setNamedone, marks, setMarks } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // Timer set to 5 minutes (300 seconds)
  const timerRef = useRef();

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/auth/quizeload/${codeOfQuiz}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question papers');
        }
        const data = await response.json();
        setQuestions(data.questions);
        setTimeLeft(data.duration*60)
      } catch (error) {
        console.error('Error fetching question papers:', error);
      }
    };
    fetchQuestionPapers();
  }, [codeOfQuiz]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      handleSubmit();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestionIndex] = optionIndex;
      return updatedResponses;
    });
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(responses[currentQuestionIndex + 1] || null); // Reset the selected option for the next question
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(responses[currentQuestionIndex - 1] || null);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/quizecheck/${codeOfQuiz}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: namedone, answers: responses }),
      });
      if (!response.ok) {
        toast.error("Invalid response");
      }
      const { quiz, marks } = await response.json();
      console.log({ quiz, marks });
      setMarks(marks);
      navigate(`/marks`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="header">
        <h2>Q.{currentQuestionIndex + 1} {currentQuestion.question}</h2>
        <div className="timer">
          Time left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
        </div>
      </div>
      <div className="image">
        {currentQuestion.image && (
          <img src={currentQuestion.image} alt="Question" />
        )}
      </div>
      <div className='options'>
        {currentQuestion.options.map((option, index) => (
          <div className='option' key={index}>
            <input
              type="radio"
              name="option"
              id={`option-${index}`}
              checked={selectedOption === index}
              onChange={() => handleAnswerSelect(index)}
            />
            <label htmlFor={`option-${index}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Livequiz;
