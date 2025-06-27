import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const services = [
  { title: 'Foam Wash', desc: 'Deep exterior cleaning with shampoo foam.' },
  { title: 'Ceramic Coating', desc: 'Long-lasting shine & protection.' },
  { title: 'Interior Detailing', desc: 'Vacuum, dashboard cleaning & odor removal.' },
];

const Services = () => {
  return (
    <Container id="services" className="py-5 text-center">
      <h2 className="mb-4">Our Services</h2>
      <Row>
        {services.map((s, i) => (
          <Col md={4} key={i} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{s.title}</Card.Title>
                <Card.Text>{s.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
