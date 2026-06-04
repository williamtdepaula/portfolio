import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
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
  const touchStartX = useRef(0);
  const wasAtTopAtStart = useRef(false);
  const wasAtBottomAtStart = useRef(false);

  useEffect(() => {
    const handleNavigation = (deltaY, target, isTouch = false, deltaX = 0) => {
      // Prevent scrolling if an animation is currently happening
      if (isScrolling.current) return;
      
      // Threshold to ignore tiny movements
      if (Math.abs(deltaY) < 30) return;

      // For touch, prevent vertical section change if horizontal movement is significant
      // (helps with carousels and diagonal swipes)
      if (isTouch && Math.abs(deltaX) > Math.abs(deltaY) * 0.8) return;

      // Handle internal scrolling
      const scrollContainer = target.closest('.scroll-container') || target.closest('.section-wrapper');
      
      if (scrollContainer) {
        const atTop = scrollContainer.scrollTop <= 5;
        const atBottom = Math.abs(scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight) <= 5;
        
        if (isTouch) {
          // For touch, only allow transition if the swipe STARTED at the boundary
          if (deltaY > 0 && !wasAtBottomAtStart.current) return;
          if (deltaY < 0 && !wasAtTopAtStart.current) return;
        } else {
          // For mouse wheel, allow transition only if currently at boundary
          if (deltaY > 0 && !atBottom) return;
          if (deltaY < 0 && !atTop) return;
        }
      }

      const currentIndex = sections.indexOf(activeSection);
      if (deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll Down -> Next Section
        isScrolling.current = true;
        setActiveSection(sections[currentIndex + 1]);
        setTimeout(() => (isScrolling.current = false), 600);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Scroll Up -> Prev Section
        isScrolling.current = true;
        setActiveSection(sections[currentIndex - 1]);
        setTimeout(() => (isScrolling.current = false), 600);
      }
    };

    const handleWheel = (e) => {
      handleNavigation(e.deltaY, e.target, false);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.changedTouches[0].screenY;
      touchStartX.current = e.changedTouches[0].screenX;
      
      const target = e.target;
      const scrollContainer = target.closest('.scroll-container') || target.closest('.section-wrapper');
      if (scrollContainer) {
        wasAtTopAtStart.current = scrollContainer.scrollTop <= 5;
        wasAtBottomAtStart.current = Math.abs(scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight) <= 5;
      } else {
        wasAtTopAtStart.current = true;
        wasAtBottomAtStart.current = true;
      }
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].screenY;
      const touchEndX = e.changedTouches[0].screenX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;
      handleNavigation(deltaY, e.target, true, deltaX);
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
    initial: { opacity: 0, y: 50, scale: 0.98, filter: 'blur(5px)' },
    in: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    out: { opacity: 0, y: -50, scale: 1.02, filter: 'blur(5px)' }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 120,
    damping: 20,
    mass: 0.8
  };

  const currentIndex = sections.indexOf(activeSection);

  const handleNavUp = () => {
    if (currentIndex > 0 && !isScrolling.current) {
      isScrolling.current = true;
      setActiveSection(sections[currentIndex - 1]);
      setTimeout(() => (isScrolling.current = false), 600);
    }
  };

  const handleNavDown = () => {
    if (currentIndex < sections.length - 1 && !isScrolling.current) {
      isScrolling.current = true;
      setActiveSection(sections[currentIndex + 1]);
      setTimeout(() => (isScrolling.current = false), 600);
    }
  };

  return (
    <div className="home-page">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="content-area">
        <AnimatePresence>
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
              className="section-wrapper skills-wrapper"
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
      <div className="floating-nav-container">
        <button 
          className={`floating-nav-btn ${currentIndex === 0 ? 'hidden' : ''}`}
          onClick={handleNavUp}
          aria-label="Previous section"
          disabled={currentIndex === 0}
        >
          <FiArrowUp size={24} />
        </button>
        <button 
          className={`floating-nav-btn ${currentIndex === sections.length - 1 ? 'hidden' : ''}`}
          onClick={handleNavDown}
          aria-label="Next section"
          disabled={currentIndex === sections.length - 1}
        >
          <FiArrowDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default Home;
