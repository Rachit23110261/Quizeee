import React, { useState } from "react";
import "./QuestionPaperForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const QuestionPaperForm = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState();
  const [questionPaper, setQuestionPaper] = useState({
    title: "",
    questions: [],
  });
  function handleChangeimage(e) {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
}

  const handleAddQuestion = () => {
    if (newQuestion.trim() === "" || newOptions.trim() === "") {
      alert("Please enter question and options");
      return;
    }

    const newQuestionObj = {
      question: newQuestion,
      options: newOptions.split(",").map((option) => option.trim()),
      answer: answer,
      image: image,
    };

    const updatedQuestions = [...questions, newQuestionObj];

    setQuestions(updatedQuestions);
    setQuestionPaper({
      ...questionPaper,
      questions: updatedQuestions,
    });

    // Clear input fields
    setNewQuestion("");
    setNewOptions("");
    setAnswer("");
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);

    setQuestions(updatedQuestions);
    setQuestionPaper({
      ...questionPaper,
      questions: updatedQuestions,
    });
  };
  const formData = new FormData();
  formData.append('image', image); // 'file' is the variable containing your file object
  formData.append('questionPaper', JSON.stringify(questionPaper));
  

  const handleUpload = async () => {
    try {
      if (
        questionPaper.title.trim() === "" ||
        questionPaper.title.trim() === ""
      ) {
        alert("Please enter question and options");
        return;
      }

      const response = await fetch(
        "http://localhost:5001/api/auth/questionform",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionPaper),
          
        }
      );
      
      const res_data = await response.json();
      if (response.ok) {
        console.log("Successfull upload");
        toast.success("uploading successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // toast.error("An error occurred during registration");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionPaper({
      ...questionPaper,
      [name]: value,
    });
  };

  return (
    <div className="question-paper-container">
      <div className="question-form">
        <label htmlFor="title">Add a title to your question paper:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={questionPaper.title}
          onChange={handleInputChange}
        />
        <h2>Add a Question</h2>
        <div className="flex">
          <label htmlFor="image">Image Question:</label>
          <input type="file" name= 'image'onChange={handleChangeimage} />
          <label htmlFor="newQuestion">Question:</label>
          <input
            type="text"
            id="newQuestion"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <label htmlFor="newOptions">Options (comma-separated):</label>
          <input
            type="text"
            id="newOptions"
            value={newOptions}
            onChange={(e) => setNewOptions(e.target.value)}
          />
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>
      </div>
      <div className="question-list">
        {questions.length > 0 ? (
          <>
          
            <h2>Questions</h2>

            {questions.map((q, index) => (
              
              <div key={index} className="question-card">
                <div className="question-text">
                  {index + 1}. {q.question}
                </div>
                <div className="image">
                {q.image && (
                  <img src={q.image} />
                )}
                </div>

                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="options">
                    {optIndex + 1} {opt}
                  </div>
                ))}
                <div className="options">Answer: {q.answer}</div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button onClick={handleUpload}>Upload</button>
          </>
        ) : (
          <h1 className="addquestions">Add Questions to Begin !!</h1>
        )}
      </div>
    </div>
  );
};

export default QuestionPaperForm;
