import React, { useState } from 'react';
import { Container, Form, Button, Alert, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';

const MyBookings = () => {
  const [input, setInput] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchBookings = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/by-contact/${input}`);
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'No bookings found');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      const updated = bookings.filter((b) => b._id !== id);
      setBookings(updated);
      setMessage('Booking cancelled successfully!');
    } catch (err) {
      setError('Could not cancel booking.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">🔍 My Bookings</h2>
      <Form className="d-flex mb-4 justify-content-center" onSubmit={(e) => { e.preventDefault(); fetchBookings(); }}>
        <Form.Control
          type="text"
          placeholder="Enter your phone or email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ maxWidth: '400px' }}
        />
        <Button variant="primary" className="ms-2" onClick={fetchBookings}>Search</Button>
      </Form>

      {loading && <div className="text-center"><Spinner animation="border" /></div>}

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      {bookings.length > 0 && (
        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Booked At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.email}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => cancelBooking(b._id)}>Cancel</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBookings;
