import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Press from './pages/Press';
import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import FAQs from './pages/FAQs';
import PartnerWithUs from './pages/PartnerWithUs';
import ScooterMap from './components/ScooterMap';
import Chatbot from './components/Chatbot';
import { logout, getUser } from './utils/auth';
import Footer from './components/Footer';
import './App.css';

function App() {
  const user = getUser();

  // Frosted glass navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.modern-navbar');
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <BootstrapNavbar expand="lg" sticky="top" className="modern-navbar">
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/">
            <span className="brand-icon">🏍️</span> RideFleet
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="main-nav" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <span style={{ color: 'white', fontSize: '1.5rem' }}>☰</span>
          </BootstrapNavbar.Toggle>
          <BootstrapNavbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/vehicles">Vehicles</Nav.Link>
              <Nav.Link as={Link} to="/map">🗺️ Live Map</Nav.Link>
              {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            </Nav>
            <Nav>
              {!user ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="auth-btn">Sign Up</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={logout} className="logout-btn">Logout</Nav.Link>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <div className="app-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/map" element={<ScooterMap />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/partner" element={<PartnerWithUs />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />
      <Chatbot />
    </Router>
  );
}

export default App;