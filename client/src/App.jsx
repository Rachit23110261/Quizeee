import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import Home from "./components/Home";
import QuestionPaperForm from "./components/Questionpaperform";
import Myquestionpapers from "./components/Myquestionpapers";
import "./App.css"
import Joinquiz from "./components/Joinquiz";
import Startquiz from "./components/Startquiz";
import Livequiz from "./components/Livequiz";
import Marks from "./components/Marks";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/questionpaperform" element={<QuestionPaperForm/>} />
          {/* <Route path="/questionpaperform" element={<QuestionPaperForm/>} / */}
          <Route path="/myquestionpapers" element={<Myquestionpapers/>} />
          <Route path="/joinquiz" element={<Joinquiz/>} />
          <Route path="/Startquiz" element={<Startquiz/>}/>
          <Route path="/livequiz/:codeOfQuiz" element={<Livequiz/>} />
          <Route path="/marks" element={<Marks/>} />




        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;
