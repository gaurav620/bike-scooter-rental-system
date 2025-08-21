import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Home from './pages/Home'; // Boongg-style home
import { logout, getUser } from './utils/auth';
import Footer from './components/Footer';

function App() {
  const user = getUser();

  return (
    <Router>
      <BootstrapNavbar bg="danger" variant="dark" expand="lg" sticky="top">
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/">Boongg Rental</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
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
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <Container fluid className="mt-0 p-0"> {/* Fluid for full width */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;