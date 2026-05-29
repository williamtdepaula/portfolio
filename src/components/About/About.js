import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="section-title">About <span className="highlight">Me</span></h2>
        <p className="about-text">
          I love building products that people use every day.
        </p>
        <p className="about-text">
          Throughout my career, I’ve worked on applications that reach millions of users, with a strong focus on streaming, video delivery, and connected TV experiences. Whether I’m designing scalable architectures, improving performance, or crafting new features, my goal is always the same: deliver experiences that feel fast, reliable, and effortless.
        </p>
        <p className="about-text">
          For me, great software is where engineering excellence and user experience meet.
        </p>
      </div>
    </section>
  );
};

export default About;
