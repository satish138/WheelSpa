import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Rohit Sharma',
    feedback: 'WheelSpa made my car look brand new! Excellent service and amazing attention to detail.',
    city: 'Pune',
  },
  {
    name: 'Priya Mehta',
    feedback: 'The ceramic coating is just flawless. Very professional and polite team.',
    city: 'Mumbai',
  },
  {
    name: 'Arjun Verma',
    feedback: 'They picked up and delivered my car — super convenient and top-notch quality!',
    city: 'Nagpur',
  },
];

const Testimonials = () => {
  return (
    <Container id="testimonials" className="py-5 bg-light">
      <h2 className="text-center mb-4">🌟 What Clients Say</h2>
      <Row className="g-4">
        {testimonials.map((t, i) => (
          <Col md={4} sm={6} xs={12} key={i}>
            <Card className="h-100 border-0 shadow rounded">
              <Card.Body>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: '#eee',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#555',
                      fontSize: '18px',
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <Card.Title className="mb-0">{t.name}</Card.Title>
                    <Card.Subtitle className="text-muted">{t.city}</Card.Subtitle>
                  </div>
                </div>
                <Card.Text className="fs-6 text-secondary">"{t.feedback}"</Card.Text>
                <div className="text-warning mt-3">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
