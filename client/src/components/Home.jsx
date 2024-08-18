import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz App</h1>
      <p>Get ready to test your knowledge!</p>
      <div className='choice'>
      <Link to="/questionpaperform" className='btn'> Organize</Link>
        <Link to="/joinquiz" className='btn'> JOIN QUIZ</Link>


      </div>
    </div>

  );
};

export default Home;
