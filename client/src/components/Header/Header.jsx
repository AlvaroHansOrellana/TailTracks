import React from "react";
import Navbar from './Navbar/Navbar'

const Header = () => {
  return (
    <header style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
      <h1>TailTracks</h1>
      <Navbar />
    </header>
  );
};

export default Header;