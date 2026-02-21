import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import API from '../services/api';
import { getUser, logout } from '../utils/auth';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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
        setError('Failed to load dashboard data');
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
    setShowPaymentModal(true);
    try {
      const { data } = await API.post(`/payments/${booking._id}/order`);
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'RideFleet',
        description: 'Rental Payment',
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await API.post(`/payments/${booking._id}/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert('🎉 Payment Successful!');
            const { data: updatedBookings } = await API.get('/bookings/mybookings');
            setBookings(updatedBookings);
          } catch (err) {
            alert('Verification Failed');
          }
        },
        prefill: { name: profile.name, email: profile.email },
        theme: { color: '#00d4ff' },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      alert('Error creating payment order');
    } finally {
      setShowPaymentModal(false);
    }
  };

  const handleStartRide = async (bookingId) => {
    try {
      await API.put(`/rides/${bookingId}/start`);
      const { data: updatedBookings } = await API.get('/bookings/mybookings');
      setBookings(updatedBookings);
    } catch (err) {
      alert('Error starting ride');
    }
  };

  const handleEndRide = async (bookingId) => {
    try {
      await API.put(`/rides/${bookingId}/end`);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'booked': return '📋';
      case 'active': return '🚀';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <Spinner animation="border" />
        <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Welcome Card */}
      <div className="glass-card" style={styles.welcomeCard}>
        <div style={styles.welcomeLeft}>
          <span style={{ fontSize: '2.5rem' }}>👋</span>
          <div>
            <h2 style={styles.welcomeName}>Welcome back, {profile?.name}!</h2>
            <p style={styles.welcomeEmail}>{profile?.email}</p>
          </div>
        </div>
        <div style={styles.welcomeRight}>
          <div style={styles.stat}>
            <span style={styles.statNum}>{bookings.length}</span>
            <span style={styles.statLabel}>Total Rides</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>
              {bookings.filter(b => b.status === 'active').length}
            </span>
            <span style={styles.statLabel}>Active</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>
              ₹{bookings.reduce((sum, b) => sum + (b.cost || 0), 0)}
            </span>
            <span style={styles.statLabel}>Total Spent</span>
          </div>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <span>⚠️</span> {error}
          <button onClick={() => setError(null)} style={styles.dismissBtn}>✕</button>
        </div>
      )}

      {/* Bookings Section */}
      <h3 style={styles.sectionTitle}>
        🏍️ Your Bookings
        <span style={styles.count}>{bookings.length}</span>
      </h3>

      {bookings.length === 0 ? (
        <div className="glass-card" style={styles.emptyCard}>
          <span style={{ fontSize: '3rem' }}>🏍️</span>
          <h4 style={{ color: 'var(--text-primary)', marginTop: '12px' }}>No bookings yet</h4>
          <p style={{ color: 'var(--text-secondary)' }}>
            Browse our vehicles and book your first ride!
          </p>
          <a href="/vehicles" className="btn-gradient" style={{ marginTop: '16px', textDecoration: 'none', display: 'inline-block', padding: '12px 28px' }}>
            Explore Vehicles →
          </a>
        </div>
      ) : (
        <div style={styles.bookingsGrid}>
          {bookings.map((booking, i) => (
            <div
              key={booking._id}
              className="glass-card"
              style={{ ...styles.bookingCard, animationDelay: `${i * 0.08}s` }}
            >
              <div style={styles.bookingTop}>
                <div style={styles.bookingMeta}>
                  <span style={{ fontSize: '1.5rem' }}>{getStatusIcon(booking.status)}</span>
                  <div>
                    <h4 style={styles.vehicleName}>{booking.vehicle?.model || 'Vehicle'}</h4>
                    <span className={`status-badge badge-${booking.status}`}>{booking.status}</span>
                  </div>
                </div>
                <div style={styles.costBox}>
                  <span style={styles.costAmount}>₹{booking.cost || 0}</span>
                  <span className={`status-badge badge-${booking.paymentStatus}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <div style={styles.bookingDetails}>
                <div style={styles.detail}>
                  <span style={styles.detailLabel}>⏱️ Duration</span>
                  <span style={styles.detailValue}>{booking.duration ? `${booking.duration} min` : 'N/A'}</span>
                </div>
                <div style={styles.detail}>
                  <span style={styles.detailLabel}>📅 Booked</span>
                  <span style={styles.detailValue}>
                    {new Date(booking.startTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div style={styles.actions}>
                {booking.status === 'booked' && (
                  <button
                    className="btn-gradient-green btn-gradient"
                    style={styles.actionBtn}
                    onClick={() => handleStartRide(booking._id)}
                  >
                    🚀 Start Ride
                  </button>
                )}
                {booking.status === 'active' && (
                  <button
                    style={{ ...styles.actionBtn, background: 'rgba(255, 165, 2, 0.15)', color: '#ffa502', border: '1px solid rgba(255, 165, 2, 0.3)' }}
                    onClick={() => handleEndRide(booking._id)}
                  >
                    🏁 End Ride
                  </button>
                )}
                {booking.paymentStatus !== 'paid' && booking.cost > 0 && (
                  <button
                    className="btn-gradient"
                    style={styles.actionBtn}
                    onClick={() => handlePayment(booking)}
                  >
                    💳 Pay ₹{booking.cost}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: '700' }}>Processing Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner animation="border" style={{ width: '3rem', height: '3rem' }} />
          <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
            Loading payment gateway...
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  page: {
    padding: '40px 5%',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  loadingPage: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-primary)',
  },
  welcomeCard: {
    padding: '32px',
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    animation: 'fadeInUp 0.5s ease-out',
  },
  welcomeLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  welcomeName: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '2px',
  },
  welcomeEmail: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  welcomeRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNum: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  statLabel: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  logoutBtn: {
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.25)',
    color: '#ff4757',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: 'var(--font-family)',
    transition: 'all 0.25s ease',
  },
  errorBox: {
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.25)',
    color: '#ff4757',
    padding: '14px 20px',
    borderRadius: '12px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
  },
  dismissBtn: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: '#ff4757',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  count: {
    background: 'var(--accent-gradient)',
    color: 'white',
    fontSize: '0.75rem',
    padding: '3px 10px',
    borderRadius: '20px',
    fontWeight: '700',
  },
  emptyCard: {
    padding: '60px 32px',
    textAlign: 'center',
  },
  bookingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '20px',
  },
  bookingCard: {
    padding: '24px',
    animation: 'fadeInUp 0.5s ease-out both',
  },
  bookingTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  bookingMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  vehicleName: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  costBox: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  costAmount: {
    fontSize: '1.3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  bookingDetails: {
    display: 'flex',
    gap: '24px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  detailLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  detailValue: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: '8px 18px',
    borderRadius: '10px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'var(--font-family)',
    transition: 'all 0.25s ease',
  },
};

export default Dashboard;