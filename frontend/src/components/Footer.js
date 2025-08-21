import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CustomFooter = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <h5>Our Presence in Pune</h5>
            <ul>
              <li>Bike for rent in Magarpatta City</li>
              <li>Bike for rent in Yerwada</li>
              <li> ... (add more from image)</li>
            </ul>
          </Col>
          <Col>
            <h5>Our Company</h5>
            <ul>
              <li>Blogs</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Partner with Us</li>
            </ul>
          </Col>
          <Col>
            <h5>Policies</h5>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>FAQs</li>
            </ul>
          </Col>
        </Row>
        <p>© 2019 - 2025 Onepoint Bike Services Pvt Ltd. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default CustomFooter;