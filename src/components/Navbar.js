import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-name">William.</span>
      </div>
      <ul className="navbar-menu">
        <li className="menu-item active">Home</li>
        <li className="menu-item">About</li>
        <li className="menu-item">Experience</li>
        <li className="menu-item">Contact</li>
      </ul>
      <div className="navbar-action">
        <button className="contact-btn">Contact me</button>
      </div>
    </nav>
  );
};

export default Navbar;
