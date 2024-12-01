import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <h1>TailTracks</h1>
      <nav className="nav"> 
        <Link to="/">Home</Link>
        <Link to="/">Paseos</Link>
        {/* <Link to="/signup">SignUp</Link>
        <Link to="/signin">SignIn</Link> */}
      </nav>
    </header>
  );
};

export default Header;