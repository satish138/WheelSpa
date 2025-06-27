import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate()

const navigateHandale = ()=>{
  navigate('/booking')
}
  return (
    <div
      style={{
        background: "url('/carwash.jpg') center/cover no-repeat",
        height: "100vh",
        color: "white",
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container className="text-center bg-dark bg-opacity-50 p-4 rounded">
        <h1 className="display-4">Revive Your Ride at WheelSpa</h1>
        <p className="lead">Premium car detailing, ceramic coating & PPF in Pune</p>
        <Button variant="danger" onClick={navigateHandale}>Book Now</Button>
      </Container>
    </div>
  );
};

export default HeroSection;
