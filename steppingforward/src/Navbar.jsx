import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
     <ul className="navbar-ul">
  <li className="navbar-li"><a href="/">Name:</a></li>
  <li className="navbar-li"><a href="/about">Patient ID:</a></li>
  <li className="navbar-li"><a href="/contact">Height:</a></li>
  <li className="navbar-li"><a href="/contact">Body Fat%:</a></li>
</ul>
    </nav>
  );
}

export default Navbar;
