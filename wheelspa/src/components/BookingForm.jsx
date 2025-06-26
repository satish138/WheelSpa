import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const BookingForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    otherService: '',
    date: '',
    time: ''
  });

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      service: form.service === "Other" ? form.otherService : form.service
    };

    try {
      const res = await axios.post('http://localhost:5000/api/bookings', bookingData);
      if (res.status === 201) {
        toast.success('✅ Booking confirmed!');
        setForm({
          name: '',
          phone: '',
          email: '',
          service: '',
          otherService: '',
          date: '',
          time: ''
        });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.warning('⚠️ Selected time slot is already booked.');
      } else {
        toast.error('Something went wrong. Try again.');
      }
    }
  };

  return (
    <Container id="booking" className="py-5">
      <h2 className="text-center mb-4">Book a Service</h2>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone" value={form.phone} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Service</Form.Label>
              <Form.Select
                name="service"
                value={form.service}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value !== "Other") {
                    setForm((prev) => ({ ...prev, otherService: '' }));
                  }
                }}
                required
              >
                <option value="">-- Choose --</option>
                <option>Royal Foam Wash</option>
                <option>Glass Treatment</option>
                <option>Interior Cleaning</option>
                <option>Baby skin Coating</option>
                <option>Silkin glow</option>
                <option>Headlight makeover</option>
                <option>Ceramic Coating</option>
                <option>Graphene Coating</option>
                <option>Paint Protection Film (PPF)</option>
                <option>Anti Rust Coating</option>
                <option>Rodent Repellent Coating</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            {form.service === "Other" && (
              <Form.Group className="mb-3">
                <Form.Label>Please specify the service</Form.Label>
                <Form.Control
                  name="otherService"
                  value={form.otherService}
                  onChange={handleChange}
                  placeholder="Enter your custom service"
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Preferred Date</Form.Label>
              <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Select Time Slot</Form.Label>
              <Form.Select name="time" value={form.time} onChange={handleChange} required>
                <option value="">-- Choose Time --</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="danger">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
