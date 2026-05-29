import React from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-name">William.</span>
      </div>
      <ul className="navbar-menu">
        <li className={`menu-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')}>Home</li>
        <li className={`menu-item ${activeSection === 'about' ? 'active' : ''}`} onClick={() => onNavigate('about')}>About</li>
        <li className={`menu-item ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => onNavigate('experience')}>Experience</li>
        <li className={`menu-item ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => onNavigate('contact')}>Contact</li>
      </ul>
      <div className="navbar-action">
        <button className="contact-btn" onClick={() => onNavigate('contact')}>Contact me</button>
      </div>
    </nav>
  );
};

export default Navbar;
