import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default Home;
