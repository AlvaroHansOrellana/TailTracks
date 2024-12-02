import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/tailtracks.png"; // Adjust the path based on your project structure

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} alt="TailTracks Logo" className="logo" />
        <h1 className="cabesa">TailTracks</h1>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        {/* Add additional links as needed */}
      </nav>
    </header>
  );
};

export default Header;
