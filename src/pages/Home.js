import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Skills from '../components/Skills/Skills';
import Contact from '../components/Contact/Contact';
import './Home.css';

const sections = ['home', 'about', 'experience', 'skills', 'contact'];

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const handleNavigation = (deltaY, target) => {
      // Prevent scrolling if an animation is currently happening
      if (isScrolling.current) return;
      
      // Threshold to ignore tiny movements
      if (Math.abs(deltaY) < 30) return;

      // Handle internal scrolling
      // Every section-wrapper can scroll if content overflows, plus explicitly marked scroll-containers
      const scrollContainer = target.closest('.scroll-container') || target.closest('.section-wrapper');
      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 2;
        const atBottom = Math.abs(scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight) <= 2;
        
        // If scrolling down (deltaY > 0) and not at bottom, let it scroll internally
        if (deltaY > 0 && !atBottom) return;
        // If scrolling up (deltaY < 0) and not at top, let it scroll internally
        if (deltaY < 0 && !atTop) return;
      }

      const currentIndex = sections.indexOf(activeSection);
      if (deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll Down -> Next Section
        isScrolling.current = true;
        setActiveSection(sections[currentIndex + 1]);
        setTimeout(() => (isScrolling.current = false), 1000);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Scroll Up -> Prev Section
        isScrolling.current = true;
        setActiveSection(sections[currentIndex - 1]);
        setTimeout(() => (isScrolling.current = false), 1000);
      }
    };

    const handleWheel = (e) => {
      handleNavigation(e.deltaY, e.target);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY.current = e.changedTouches[0].screenY;
      const deltaY = touchStartY.current - touchEndY.current;
      handleNavigation(deltaY, e.target);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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
              <Hero onNavigate={setActiveSection} />
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
            <motion.div
              key="experience"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="section-wrapper"
            >
              <Experience />
            </motion.div>
          )}
          {activeSection === 'skills' && (
            <motion.div
              key="skills"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="section-wrapper"
            >
              <Skills />
            </motion.div>
          )}
          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="section-wrapper"
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
