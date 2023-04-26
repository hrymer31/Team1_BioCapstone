
  import React from 'react';
  import {  Link } from "react-router-dom";

import feetlogo from '../footprint.png';


const navbar= () =>{

  const linkStyle = {
   
    textDecoration: "none",
    color: 'black'
  };

  return (
   
    <nav className="nav">
      <img src={feetlogo} alt="footprint" width="70px" />
      <Link to="/" className="site-title">
        Stepping Forward
      </Link>
      <img src={feetlogo} alt="footprint" width="70px" />
      <ul>
    
    <li>
      <Link to="/login" style={linkStyle}>Login </Link>
    </li>
    <li>
      <Link to="/ageCheck"style={linkStyle}>Sign Up</Link>
      
    </li>
  
    </ul>
    </nav>
  );
}
export default navbar;





