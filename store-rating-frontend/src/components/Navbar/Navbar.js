import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">
          Store Rating App
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/stores">Store List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
