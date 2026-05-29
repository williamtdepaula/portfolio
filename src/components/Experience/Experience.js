import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/experiences/claro/claro-big.jpeg`,
      company: 'AgileTV (ClaroTV+)',
      role: 'Principal Apple TV Developer',
      description: 'Built a high-performance, scalable architecture using Swift, UIKit, SwiftUI, Combine, and MVVM-C. Recognized as ClaroTV+ Developer of the Year (2023).'
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/experiences/puc/puc-big.jpeg`,
      company: 'Wiplay',
      role: 'Principal Mobile Developer',
      description: 'Created and maintained mobile apps from conception to launch on the App Store and Google Play. Built internal apps with AI integration.'
    }
  ];

  return (
    <section className="experience-section scroll-container">
      <div className="experience-list">
        {experiences.map(exp => (
          <div className="experience-card" key={exp.id}>
            <img src={exp.image} alt={exp.company} className="experience-image" />
            <div className="experience-overlay">
              <div className="experience-text">
                <h3 className="experience-company">{exp.company}</h3>
                <h4 className="experience-role">{exp.role}</h4>
                <p className="experience-desc">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
