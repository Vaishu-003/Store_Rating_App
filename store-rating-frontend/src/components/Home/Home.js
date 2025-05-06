import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">Store Rating App</div>
        <div className="navbar-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/stores">Store List</Link>
        </div>
      </nav>

      <div className="home-content">
        <h1>Welcome to the Store Rating App</h1>
        <p>Discover and rate your favorite stores</p>

        <div className="home-buttons">
          <Link to="/signup" className="btn blue">Sign Up</Link>
          <Link to="/login" className="btn green">Login</Link>
          <Link to="/stores" className="btn yellow">Browse Stores</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
