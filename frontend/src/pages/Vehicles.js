import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import API from '../services/api';
import { FaBicycle, FaMotorcycle } from 'react-icons/fa'; // Icons for bike/scooter

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data } = await API.get('/vehicles');
        setVehicles(data);
      } catch (err) {
        alert('Error fetching vehicles');
      }
    };
    fetchVehicles();
  }, []);

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleSubmitBooking = async () => {
    try {
      await API.post('/bookings', { vehicleId: selectedVehicle._id, startTime, duration });
      setShowModal(false);
      alert('Booked successfully!');
    } catch (err) {
      alert('Error booking');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Available Vehicles</h2>
      <Row>
        {vehicles.map(v => (
          <Col md={4} key={v._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{v.model} {v.type === 'bike' ? <FaBicycle /> : <FaMotorcycle />}</Card.Title>
                <Card.Text>Location: {v.location}<br />Status: {v.status}</Card.Text>
                <Button variant="primary" onClick={() => handleBook(v)}>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedVehicle?.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control type="number" value={duration} onChange={e => setDuration(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitBooking}>Confirm Booking</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Vehicles;