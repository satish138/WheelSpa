import React from 'react';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin-login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/gallery-upload', label: 'Gallery Upload' },
    { path: '/admin/messages', label: 'Contact Messages' }
  ];

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <aside className="admin-sidebar shadow-sm">
        <div className="sidebar-header text-white fw-bold px-3 py-4">
          WheelSpa
        </div>
        <Nav className="flex-column px-3">
          {navItems.map((item) => (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </aside>

      {/* Main Content with Top Navbar */}
      <div className="admin-main">
        <Navbar bg="light" className="admin-topbar px-4 shadow-sm">
          <Container fluid>
            <Navbar.Brand className="fw-semibold text-muted">
              Welcome, Admin
            </Navbar.Brand>
            <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </Navbar>

        <main className="admin-content p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
