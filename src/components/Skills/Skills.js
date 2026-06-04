import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Apple Platforms',
      skills: ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'Coordinators (iOS navigation)', 'Xcode', 'tvOS']
    },
    {
      title: 'Cross-Platform & TV',
      skills: ['React Native', 'Flutter', 'Dart', 'Kotlin', 'Android Studio', 'Tizen', 'WebOS']
    },
    {
      title: 'Architecture & State',
      skills: ['MVVM', 'MVVM-C', 'Redux', 'React Context API', 'Provider', 'Bloc', 'SOLID']
    },
    {
      title: 'Web & Tools',
      skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Socket', 'Offline-First', 'Deep Linking', 'Push Notifications']
    },
    {
      title: 'Testing & DevOps',
      skills: ['TDD', 'Unit Testing', 'UI Testing', 'Snapshot Testing', 'CI/CD']
    }
  ];

  return (
    <section className="skills-section">
      <div className="skills-header">
        <h2 className="section-title">My <span className="highlight">Skills</span></h2>
      </div>
      
      <div className="skills-scroll-container">
        <div className="skills-track">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              className="skill-category-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-pill">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
