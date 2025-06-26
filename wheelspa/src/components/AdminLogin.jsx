import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with env-secured password
    const correctPassword = '123456';

    if (password === correctPassword) {
      localStorage.setItem('admin_logged_in', true);
      navigate('/admin');
    } else {
      setError('Incorrect password!');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">🔐 Admin Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="dark" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
