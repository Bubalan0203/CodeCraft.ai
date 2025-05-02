import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Home/Navbar';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import PromptPlayground from '../components/Home/PromptPlayground';
import Pricing from '../components/Home/Pricing';
import CallToAction from '../components/Home/CallToAction';
import Footer from '../components/Home/Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for DOM to render
      }
    }
  }, [location]);

  return (
    <>
    

      <div id="hero">
        <Hero />
      </div>

      <div id="features">
        <Features />
      </div>

      <div id="examples">
        <PromptPlayground />
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <div id="calltoaction">
        <CallToAction />
      </div>

    
    </>
  );
};

export default Home;
