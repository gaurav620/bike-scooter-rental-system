import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className="hero">
      <Container>
        <Row>
          <Col>
            <h1>Rent Bike & Scooter Now in INDIA</h1>
            <p>10k + | 4.6 Rating ★★★★★</p>
            <div>Hourly Bike Rental Starts @ ₹39*</div>
            <div>Daily Bike Rental Starts @ ₹349*</div>
            <div>Monthly Bike Rental Starts @ ₹3999*</div>
          </Col>
          <Col>
            <img src="./assets/scooter.jpg" alt="Scooter" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;