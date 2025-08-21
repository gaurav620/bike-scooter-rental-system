import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout, getUser } from '../utils/auth';

const CustomNavbar = () => {
  const user = getUser();

  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">BOONGG</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/prices">PRICES</Nav.Link>
          <Nav.Link as={Link} to="/partner">BECOME A PARTNER</Nav.Link>
          <Nav.Link as={Link} to="/monthly">MONTHLY BIKE RENTAL</Nav.Link>
        </Nav>
        <Nav>
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
              <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={logout}>LOGOUT</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;