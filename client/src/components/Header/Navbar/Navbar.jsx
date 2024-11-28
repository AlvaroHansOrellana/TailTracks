import React from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
  <>
  
    <ul className='nav'>
      <li className="nav-link "><Link to='/'>Home</Link></li>
      <li className="nav-link "><Link to='/list'>Paseos</Link></li>
      <li className="nav-link "><Link to='/contact'>Perros</Link></li>
      <li className="nav-link "><Link to='/staff'>SignUp</Link></li >
      <li className="nav-link "><Link to='/topic'>SignIn</Link></li >
    </ul >
    
  
    </>);



};

export default Navbar;
