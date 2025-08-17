import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import { logout, getUser } from './utils/auth';

function App() {
  const user = getUser();

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Bike & Scooter Rental</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/vehicles">Vehicles</Nav.Link>
              {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            </Nav>
            <Nav>
              {!user ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/" element={<Vehicles />} />
        </Routes>
      </Container>

      <footer className="text-center mt-5 py-3 bg-light">
        <p>&copy; 2023 Bike & Scooter Rental. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;