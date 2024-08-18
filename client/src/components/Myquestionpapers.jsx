import React, { useState, useEffect } from 'react';
import './Myquestionpapers.css'; // Import CSS file for styling
import  {useAuth}  from "../store/auth";
import { toast } from "react-toastify";
import Modal from 'react-modal';

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
};

const Myquestionpapers = () => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const { isLoading,setIsLoading,isLive, setIsLive} = useAuth();
  const [showModal, setShowModal] = useState(false);
const [quizData, setQuizData] = useState({
  duration: '',
  date: '',
  time: '',
  code: generateRandomCode(),
});


  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/auth/myquestionpapers");
        if (!response.ok) {
          throw new Error('Failed to fetch question papers');
        }
        const data = await response.json();
        setQuestionPapers(data);
      } catch (error) {
        console.error('Error fetching question papers:', error);
      }
    };

    fetchQuestionPapers();
  }, []);

  const handleMakeLive = async(id) => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/makelive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id:id}),
        }
      );
      const res_data = await response.json();
      console.log(" ****())***", res_data)
      if (response.ok) {
        toast.success("make live successfull")
        setShowModal(true);

      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.error("Error during making live:", error);
    }
  };
  const handleDisableLive = async(id) => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/makelive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id:id}),
        }
      );
      const res_data = await response.json();
      console.log(" ****()****", res_data)
      if (response.ok) {
        toast.success("Disable live successfull")
        window.location.reload();
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.error("Error during making live:", error);
    }
  };
  
  const funct= ()=>{

  }
  const handleSaveQuizData = async () => {
    // Send quizData to backend API
    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/savequizdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );
      const res_data = await response.json();
      console.log(" ****())***", res_data)
      if (response.ok) {
        toast.success("quiz data saved successfully")
        setShowModal(true);
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.error("Error during making live:", error);
    }
    setShowModal(false);
    window.location.reload();
    
    // Show success message
    toast.success('Quiz details saved successfully');
  };
  

  return (
    <div className="question-papers-container">
      <div className="question-papers-list">
        <h1>Question Papers</h1>
        <ul>
          {questionPapers.map((questionPaper) => (
            <li key={questionPaper._id}>
              {questionPaper.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="make-live-buttons">
        <ul>
          {questionPapers.map((questionPaper) => (
            <li key={questionPaper._id}>
              {questionPaper.isLive? <button onClick={() => handleDisableLive(questionPaper._id)}>Disable Live</button> :<button onClick={() => handleMakeLive(questionPaper._id)}>Make Live</button>
              }
              
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
  <h2>Enter Quiz Details</h2>
  <label>
    Duration:
    <input
      type="text"
      value={quizData.duration}
      onChange={(e) => setQuizData({ ...quizData, duration: e.target.value })}
    />
  </label>
  <label>
    Date:
    <input
      type="date"
      value={quizData.date}
      onChange={(e) => setQuizData({ ...quizData, date: e.target.value })}
    />
  </label>
  <label>
    Time:
    <input
      type="time"
      value={quizData.time}
      onChange={(e) => setQuizData({ ...quizData, time: e.target.value })}
    />
  </label>
  <button onClick={handleSaveQuizData}>Save</button>
</Modal>
    </div>
  );
};

export default Myquestionpapers;
