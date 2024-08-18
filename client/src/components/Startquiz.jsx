import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Startquiz = () => {
  const { isLoading, setIsLoading, isLive, setIsLive, setCode, code } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State to track user's name
  const {namedone,setNamedone}=useAuth()


  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/auth/quizdetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: code }),
          }
        );
        const res_data = await response.json();
        console.log("****())***", res_data);
        if (response.ok) {
          console.log("quizdetails loaded");
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

    fetchQuizDetails();
  }, [code]);

  const handlestart = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch("http://localhost:5001/api/auth/startquiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }), // Send the user's name
      });

      const res_data = await response.json();
      console.log("****())***", res_data);
      if (response.ok) {
        toast.success("Redirecting to quiz");
        const codeOfQuiz = res_data.code;
        setNamedone(name);
        navigate(`/livequiz/${codeOfQuiz}`);
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.error("Quiz is not live yet", error);
    }
  };

  return (
    <div className="start-quiz-container">
      <h2>Start Quiz</h2>
      <form onSubmit={handlestart}>
        <label htmlFor="name">Enter Your Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default Startquiz;
