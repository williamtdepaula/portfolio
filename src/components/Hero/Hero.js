import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  const handleContact = () => {
    onNavigate('contact');
  };

  return (
    <section className="hero-section">
      <motion.div 
        className="hero-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="hero-greeting">Hi, There!</p>
        <h1 className="hero-headline">
          I'm <span className="highlight">William Tristão</span>
        </h1>
        <p className="hero-description">
          Principal Mobile Developer specializing in Apple platforms (iOS & tvOS) and cross-platform solutions. Passionate about building high-performance architectures and engaging user experiences for millions of users.
        </p>
        <p className="hero-availability">
          Open to Relocation | Remote
        </p>
        <div className="hero-socials">
          <a href="https://github.com/williamtdepaula" target="_blank" rel="noreferrer" className="social-icon">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/williamtristaodepaula/" target="_blank" rel="noreferrer" className="social-icon">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={handleContact}>Hire me</button>
          <a 
            href={`${process.env.PUBLIC_URL}/cv/Resume William Tristão.pdf`} 
            download="Resume William Tristão.pdf"
            className="btn btn-secondary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Download CV
          </a>
        </div>
      </motion.div>
      <motion.div 
        className="hero-right"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="profile-image-container">
          <img src={`${process.env.PUBLIC_URL}/profile.png`} alt="William Tristão de Paula" className="profile-image" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
