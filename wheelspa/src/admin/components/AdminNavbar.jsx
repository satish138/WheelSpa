import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin-login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin" className="fw-semibold text-light">
          WheelSpa Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin" className="text-light mx-2">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/gallery-upload" className="text-light mx-2">
              Gallery Upload
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/messages" className="text-light mx-2">
              Contact Messages
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="text-light mx-2">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
