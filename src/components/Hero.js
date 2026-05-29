import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
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
        <div className="hero-socials">
          <a href="https://github.com/williamtdepaula" target="_blank" rel="noreferrer" className="social-icon">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/williamtristaodepaula/" target="_blank" rel="noreferrer" className="social-icon">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary">Hire me</button>
          <button className="btn btn-secondary">Download CV</button>
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
