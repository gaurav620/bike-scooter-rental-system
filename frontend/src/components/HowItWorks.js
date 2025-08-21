import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HowItWorks = () => {
  return (
    <Container className="section">
      <h2>How it works?</h2>
      <p>Embark on your dream adventure with affordable scooter and motorcycle rentals from Boongg.</p>
      <Row>
        <Col>
          <img src="./assets/icon-calendar.png" alt="Calendar" />
          <p>Set the date of your ride and then search for the bike that you want</p>
        </Col>
        <Col>
          <img src="./assets/icon-location.png" alt="Location" />
          <p>Choose out of various bikes that best suits the trip you're about to take</p>
        </Col>
        <Col>
          <img src="./assets/icon-helmet.png" alt="Helmet" />
          <p>Get suited up and head to the pick-up location to get your ride.</p>
        </Col>
        <Col>
          <img src="./assets/icon-price.png" alt="Price" />
          <p>Get ready to roll and have a nice time tripping!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HowItWorks;