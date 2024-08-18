import React, { useState } from 'react';
import './Joinquiz.css'; // Import your CSS file for styling
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import  {useAuth}  from "../store/auth";
  


const Joinquiz = () => {
  const [quizCode, setQuizCode] = useState('');
  const navigate = useNavigate();
  const { isLoading,setIsLoading,isLive, setIsLive, code, setCode} = useAuth();

  const handleJoinQuiz = async(e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(
          "http://localhost:5001/api/auth/joinquiz",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({code:quizCode}),
          }
        );
        const res_data = await response.json();
        console.log(" ****())***", res_data)
        if (response.ok) {
          toast.success("make live successfull")
          const quizLink = `/Startquiz`;
          navigate(quizLink)
          setCode(quizCode)
          
  
        } else {
          toast.error(
            res_data.extraDetails ? res_data.extraDetails : res_data.message
          );
          console.log("invalid credential");
        }
      } catch (error) {
        console.error("Error during making live:", error);
      }
      
    console.log('Joining quiz with code:', quizCode);
  };

  return (
    <div className="join-quiz-container">
      <h2>Join Quiz</h2>
      <form onSubmit={handleJoinQuiz}>
        <label htmlFor="quizCodeInput">Enter Quiz Code:</label>
        <input
          id="quizCodeInput"
          type="text"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Joinquiz;
