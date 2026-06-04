import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/experiences/claro/claro-big.jpeg`,
      project: 'Claro TV+',
      company: 'AgileTV',
      role: 'Principal Apple Developer',
      description: 'Built a high-performance, scalable architecture using Swift, UIKit, SwiftUI, Combine, and MVVM-C. Recognized as ClaroTV+ Developer of the Year.'
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/experiences/puc/puc-big.jpeg`,
      project: 'PUC-Campinas Play',
      company: 'AgileTV',
      role: 'Mobile Developer',
      description: 'Main mobile developer of an online learning platform, built from the ground up using React Native, while also supporting and developing new features for the web platform with ReactJS and Next.js.'
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/experiences/apptalk/apptalk-big.jpg`,
      project: 'AppTalk',
      company: 'Wiplay',
      role: 'Mobile Developer',
      description: 'Responsible for creating and maintaining mobile apps from conception to launch on both the App Store and Google Play.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleNextCard = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const handlePrevCard = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + experiences.length) % experiences.length);
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      rotateY: direction > 0 ? 10 : -10
    }),
    center: {
      opacity: 1,
      x: 0,
      rotateY: 0
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? 100 : -100,
      rotateY: direction < 0 ? 10 : -10
    })
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      // User swiped from right to left -> Next Card
      handleNextCard();
    } else if (isRightSwipe) {
      // User swiped from left to right -> Prev Card
      handlePrevCard();
    }
    
    // Reset values
    setTouchStartX(0);
    setTouchEndX(0);
  };

  const currentExp = experiences[currentIndex];

  return (
    <section className="experience-section">
      <div 
        className="deck-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentExp.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="experience-card"
            onClick={handleNextCard}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img src={currentExp.image} alt={currentExp.project} className="experience-image" />
            <div className="experience-overlay">
              <div className="experience-text">
                <h3 className="experience-project">{currentExp.project}</h3>
                <h4 className="experience-company">@{currentExp.company}</h4>
                <h4 className="experience-role">{currentExp.role}</h4>
                <p className="experience-desc">{currentExp.description}</p>
                <div className="click-hint">Click to see next &rarr;</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="deck-indicators">
          {experiences.map((_, idx) => (
            <span 
              key={idx} 
              className={`indicator ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;