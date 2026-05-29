import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import './Home.css';

const sections = ['home', 'about', 'experience', 'contact'];

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent scrolling if an animation is currently happening
      if (isScrolling.current) return;
      
      // Threshold to ignore tiny trackpad movements
      if (Math.abs(e.deltaY) < 30) return;

      const currentIndex = sections.indexOf(activeSection);
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll Down
        isScrolling.current = true;
        setActiveSection(sections[currentIndex + 1]);
        setTimeout(() => (isScrolling.current = false), 1000);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll Up
        isScrolling.current = true;
        setActiveSection(sections[currentIndex - 1]);
        setTimeout(() => (isScrolling.current = false), 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection]);

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5
  };

  return (
    <div className="home-page">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="content-area">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="section-wrapper"
            >
              <Hero />
            </motion.div>
          )}
          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="section-wrapper"
            >
              <About />
            </motion.div>
          )}
          {activeSection === 'experience' && (
            <motion.div key="experience" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="section-wrapper">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <h1>Experience Section Coming Soon</h1>
              </div>
            </motion.div>
          )}
          {activeSection === 'contact' && (
            <motion.div key="contact" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="section-wrapper">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <h1>Contact Section Coming Soon</h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
