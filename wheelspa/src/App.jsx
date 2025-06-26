import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';

import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <Services />
      <Gallery />
      <Testimonials /> 
      <Contact />
      <Footer />
    </>
  );
};

export default App;
