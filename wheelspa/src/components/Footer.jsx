import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5 border-top">
      <Container className="text-center">
        <p className="mb-1">© {new Date().getFullYear()} <strong>WheelSpa</strong>. All rights reserved.</p>
        <small>
          Made with ❤️ in Pune | <a href="#contact">Contact</a> | <a href="#services">Services</a>
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
