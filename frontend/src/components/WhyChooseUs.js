import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const WhyChooseUs = () => {
  return (
    <Container>
      <h2>Why choose us?</h2>
      <p>Rent a Bike/Motorcycle/Scooty from Boongg and enjoy the convenience of affordable two-wheeler options.</p>
      <Row>
        <Col>
          <h5>Complimentary Helmet</h5>
          <p>Your safety is our priority. We provide complementary helmets with every ride</p>
        </Col>
        <Col>
          <h5>Zero Deposit</h5>
          <p>At Boongg only for what you use. We don't take any deposit.</p>
        </Col>
        <Col>
          <h5>Lowest Price Guarantee</h5>
          <p>You can count on us for the best bike rental prices in the city</p>
        </Col>
      </Row>
      <p>We Sanitize Bike After Every Ride!!!</p>
    </Container>
  );
};

export default WhyChooseUs;