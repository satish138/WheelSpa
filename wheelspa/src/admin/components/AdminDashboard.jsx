import React, { useEffect, useState } from 'react';
import {
  Container, Table, Button, Spinner, Form, Row, Col, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) navigate('/admin-login');
    else fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings');
      setBookings(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      const updated = bookings.filter(b => b._id !== id);
      setBookings(updated);
      filterAndSort(updated, search, sortBy);
      setAlert('Booking deleted successfully!');
      setTimeout(() => setAlert(''), 3000);
    } catch {
      alert('Error deleting booking.');
    }
  };

  const filterAndSort = (data, searchValue, sortType) => {
    let filteredData = data.filter(b =>
      b.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      b.service.toLowerCase().includes(searchValue.toLowerCase())
    );

    filteredData.sort((a, b) =>
      sortType === 'latest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    setFiltered(filteredData);
  };

  const exportToExcel = () => {
    const formatted = bookings.map(({ name, phone, email, service, date, time, createdAt }) => ({
      Name: name,
      Phone: phone,
      Email: email,
      Service: service,
      Date: date,
      Time: time,
      Booked_At: new Date(createdAt).toLocaleString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `WheelSpa_Bookings_${Date.now()}.xlsx`);
  };

  useEffect(() => {
    filterAndSort(bookings, search, sortBy);
  }, [search, sortBy, bookings]);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-danger">🛠 Admin Dashboard</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-danger" size="sm" onClick={() => {
            localStorage.removeItem('admin_logged_in');
            navigate('/admin-login');
          }}>
            Logout
          </Button>
          <Button variant="success" size="sm" onClick={exportToExcel}>
            Export Excel
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            placeholder="Search by name or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Sort: Latest First</option>
            <option value="oldest">Sort: Oldest First</option>
          </Form.Select>
        </Col>
      </Row>

      {alert && <Alert variant="success">{alert}</Alert>}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <Table striped bordered responsive hover>
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booked At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {filtered.map(b => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.email}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteBooking(b._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
