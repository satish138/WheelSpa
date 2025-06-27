import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import HeroSection from './pages/HeroSection';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';

import Contact from './pages/Contact';
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
