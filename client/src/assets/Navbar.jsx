import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/quiz" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/leaderboard" className="nav-link">About us</Link>
        </li>
        <li className="nav-item">
          <Link to="/myquestionpapers" className="nav-link">My Question Papers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
