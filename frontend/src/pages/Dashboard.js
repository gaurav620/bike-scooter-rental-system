import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import API from '../services/api';
import { getUser, logout } from '../utils/auth';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, bookingsRes] = await Promise.all([
          API.get('/users/profile'),
          API.get('/bookings/mybookings')
        ]);
        setProfile(profileRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        alert('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    if (getUser()) fetchData();
    else window.location.href = '/login';
  }, []);

  const handlePayment = async (booking) => {
    if (booking.cost <= 0) {
      setError('Cost must be greater than 0 to proceed with payment.');
      return;
    }
    setError(null);
    setSelectedBooking(booking);
    setShowPaymentModal(true);
    try {
      const { data } = await API.post(`/payments/${booking._id}/order`);
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Bike & Scooter Rental',
        description: 'Rental Payment',
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await API.post(`/payments/${booking._id}/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert('Payment Successful!');
            // Refresh bookings
            const { data: updatedBookings } = await API.get('/bookings/mybookings');
            setBookings(updatedBookings);
          } catch (err) {
            console.error('Verification Error:', err);
            alert('Verification Failed: ' + (err.response?.data?.msg || 'Unknown error'));
          }
        },
        prefill: { name: profile.name, email: profile.email },
        theme: { color: '#007bff' },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error('Create Order Error:', err);
      alert('Error creating order: ' + (err.response?.data?.msg || 'Unknown error'));
    } finally {
      setShowPaymentModal(false);
    }
  };

  const handleStartRide = async (bookingId) => {
    try {
      await API.put(`/rides/${bookingId}/start`);
      alert('Ride Started!');
      const { data: updatedBookings } = await API.get('/bookings/mybookings');
      setBookings(updatedBookings);
    } catch (err) {
      alert('Error starting ride');
    }
  };

  const handleEndRide = async (bookingId) => {
    try {
      await API.put(`/rides/${bookingId}/end`);
      alert('Ride Ended!');
      const { data: updatedBookings } = await API.get('/bookings/mybookings');
      setBookings(updatedBookings);
    } catch (err) {
      alert('Error ending ride');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      {profile && <p className="lead">Welcome, {profile.name}</p>}
      <Button variant="danger" onClick={logout} className="mb-3">Logout</Button>

      <h3 className="mt-4">Your Bookings</h3>
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.vehicle.model}</td>
                <td>{booking.status}</td>
                <td>{booking.duration ? `${booking.duration} min` : 'N/A'}</td>
                <td>₹{booking.cost || 0}</td>
                <td>{booking.paymentStatus}</td>
                <td>
                  {booking.status === 'booked' && (
                    <Button variant="primary" size="sm" onClick={() => handleStartRide(booking._id)} className="me-2">Start Ride</Button>
                  )}
                  {booking.status === 'active' && (
                    <Button variant="warning" size="sm" onClick={() => handleEndRide(booking._id)} className="me-2">End Ride</Button>
                  )}
                  {booking.paymentStatus !== 'paid' && booking.cost > 0 && (
                    <Button variant="success" size="sm" onClick={() => handlePayment(booking)}>Pay Now</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Processing Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" /> Loading payment gateway...
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;