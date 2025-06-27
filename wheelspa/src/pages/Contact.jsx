import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setLoading(true);
      try {
        await axios.post('http://localhost:5000/api/contact', form);
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000); // Auto-hide success message
      } catch (error) {
        console.error('Error sending message:', error);
        alert('❌ Failed to send message. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container id="contact" className="py-5">
      <h2 className="text-center mb-4 text-danger">📩 Get in Touch with Us</h2>
      <Row className="g-4">
        <Col md={6}>
          <div>
            <h5>📍 Visit Us</h5>
            <p className="text-muted">WheelSpa, Auto Street, Wakad, Pune - 411057</p>

            <h5>📞 Call Us</h5>
            <p className="text-muted">+91 98765 43210</p>

            <h5>✉️ Email</h5>
            <p className="text-muted">wheelspa.service@gmail.com</p>
          </div>
        </Col>

        <Col md={6}>
          {submitted && <Alert variant="success">✅ Message sent successfully!</Alert>}
          <Form onSubmit={handleSubmit} className="p-3 shadow-sm rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
              />
            </Form.Group>

            <div className="text-end">
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
