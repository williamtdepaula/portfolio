import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ activeSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContact = () => {
    onNavigate('contact');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (section) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNavClick('home')}>
        <span className="logo-name">William Tristão</span>
      </div>
      
      <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      <ul className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <li className={`menu-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>Home</li>
        <li className={`menu-item ${activeSection === 'about' ? 'active' : ''}`} onClick={() => handleNavClick('about')}>About</li>
        <li className={`menu-item ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => handleNavClick('experience')}>Experience</li>
        <li className={`menu-item ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => handleNavClick('skills')}>Skills</li>
        <li className={`menu-item ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => handleNavClick('contact')}>Contact</li>
      </ul>
      <div className="navbar-action">
        <button className="contact-btn" onClick={handleContact}>Contact me</button>
      </div>
    </nav>
  );
};

export default Navbar;
