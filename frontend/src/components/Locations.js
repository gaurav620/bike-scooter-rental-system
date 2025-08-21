import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Locations = () => {
  return (
    <Container className="section">
      <h2>Our Presence Across India</h2>
      <Row>
        <Col>
          <p>Bike for rent in Delhi</p>
          <p>Bike for rent in Mumbai</p>
          <p>Bike for rent in Bangalore</p>
          <p>Bike for rent in Chennai</p>
          <p>Bike for rent in Hyderabad</p>
        </Col>
        <Col>
          <p>Bike for rent in Kolkata</p>
          <p>Bike for rent in Ahmedabad</p>
          <p>Bike for rent in Jaipur</p>
          <p>Bike for rent in Lucknow</p>
          <p>Bike for rent in Chandigarh</p>
        </Col>
        <Col>
          <p>Bike for rent in Goa</p>
          <p>Bike for rent in Cochin</p>
          <p>Bike for rent in Surat</p>
          <p>Bike for rent in Patna</p>
          <p>Bike for rent in Bhopal</p>
        </Col>
        <Col>
          <p>Bike for rent in Indore</p>
          <p>Bike for rent in Nagpur</p>
          <p>Bike for rent in Vadodara</p>
          <p>Bike for rent in Visakhapatnam</p>
          <p>Bike for rent in Thane</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Locations;