import React, { useEffect, useState } from 'react';
import { Modal, Form, Spinner } from 'react-bootstrap';
import API from '../services/api';
import { useLocation } from 'react-router-dom';

// Map vehicle models to local scooter images
const scooterImages = [
  '/scooter-hero.png',
  '/scooter-red.png',
  '/scooter-white.png',
  '/scooter-blue.png',
  '/scooter-campus.png',
];

const getScooterImage = (index) => scooterImages[index % scooterImages.length];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (location.state?.vehicles) {
          setVehicles(location.state.vehicles);
          setFiltered(location.state.vehicles);
        } else {
          const { data } = await API.get('/vehicles');
          setVehicles(data);
          setFiltered(data);
        }
      } catch (err) {
        console.error('Error fetching vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [location.state]);

  useEffect(() => {
    if (typeFilter === 'all') {
      setFiltered(vehicles);
    } else {
      setFiltered(vehicles.filter(v => v.type === typeFilter));
    }
  }, [typeFilter, vehicles]);

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleSubmitBooking = async () => {
    setBookingLoading(true);
    try {
      await API.post('/bookings', { vehicleId: selectedVehicle._id, startTime, duration });
      setShowModal(false);
      alert('🎉 Booked successfully! Check your dashboard.');
      const { data } = await API.get('/vehicles');
      setVehicles(data);
    } catch (err) {
      alert(err.response?.data?.msg || 'Please login to book a vehicle.');
    } finally {
      setBookingLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const cls = status === 'available' ? 'badge-available' : status === 'in-use' ? 'badge-in-use' : 'badge-maintenance';
    return <span className={`status-badge ${cls}`}>{status}</span>;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span className="section-title">Available Scooters</span>
        </h1>
        <p style={styles.subtitle}>
          Electric scooters available near JIS College of Engineering, Kalyani
        </p>
        <div style={styles.serviceArea}>
          <span style={styles.serviceAreaDot}></span>
          📍 Service Area: 5km radius — Kalyani, West Bengal 741235
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          {['all', 'bike', 'scooter'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                ...styles.filterBtn,
                ...(typeFilter === t ? styles.filterBtnActive : {}),
              }}
            >
              {t === 'all' ? '🏁 All' : t === 'bike' ? '🚲 Bikes' : '🛵 Scooters'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={styles.center}>
          <Spinner animation="border" />
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Loading scooters...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={styles.center}>
          <img src="/scooter-hero.png" alt="Scooter" style={{ width: '150px', opacity: 0.5, marginBottom: '16px' }} />
          <p style={{ color: 'var(--text-secondary)' }}>No scooters found. Check back soon!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((v, i) => (
            <div
              key={v._id}
              className="glass-card"
              style={{ ...styles.card, animationDelay: `${i * 0.08}s` }}
            >
              {/* Vehicle Image */}
              <div style={styles.imageWrap}>
                <img
                  src={getScooterImage(i)}
                  alt={v.model}
                  style={styles.vehicleImg}
                />
              </div>

              <div style={styles.cardBody}>
                <div style={styles.cardTopRow}>
                  <h3 style={styles.cardTitle}>{v.model}</h3>
                  {getStatusBadge(v.status)}
                </div>

                <div style={styles.typeBadgeRow}>
                  <span className={`status-badge ${v.type === 'bike' ? 'badge-bike' : 'badge-scooter'}`}>
                    {v.type === 'bike' ? '🚲 Bike' : '🛵 Scooter'}
                  </span>
                  <span style={styles.locationText}>📍 {v.location || 'Kalyani'}</span>
                </div>

                <div style={styles.specs}>
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>🔋 Battery</span>
                    <span style={styles.specValue}>{v.battery || 90}%</span>
                  </div>
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>🛣️ Range</span>
                    <span style={styles.specValue}>{v.mileage || 70} km</span>
                  </div>
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>⚡ Top Speed</span>
                    <span style={styles.specValue}>25 km/h</span>
                  </div>
                  <div style={styles.spec}>
                    <span style={styles.specLabel}>⚙️ Condition</span>
                    <span style={styles.specValue}>{v.condition || 'Excellent'}</span>
                  </div>
                </div>

                <div style={styles.priceRow}>
                  <div>
                    <span style={styles.price}>₹29</span>
                    <span style={styles.priceUnit}>/hr</span>
                  </div>
                  <button
                    className="btn-gradient"
                    style={styles.bookBtn}
                    onClick={() => handleBook(v)}
                    disabled={v.status !== 'available'}
                  >
                    {v.status === 'available' ? '🛵 Book Now' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: '700' }}>
            📋 Book {selectedVehicle?.model}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.modalNote}>
            📍 Pick-up & Drop-off: Near JIS College of Engineering, Kalyani
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>
                Start Time
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="modern-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem' }}>
                Duration (minutes)
              </Form.Label>
              <Form.Control
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 60"
                className="modern-input"
              />
            </Form.Group>
            {duration > 0 && (
              <div style={styles.costPreview}>
                <span>Estimated Cost:</span>
                <span style={{ fontWeight: '800', color: '#00d4ff', fontSize: '1.2rem' }}>
                  ₹{Math.round(duration * 0.5)}
                </span>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShowModal(false)}
            style={styles.cancelBtn}
          >
            Cancel
          </button>
          <button
            className="btn-gradient"
            onClick={handleSubmitBooking}
            disabled={bookingLoading}
            style={{ padding: '10px 28px' }}
          >
            {bookingLoading ? '⏳ Booking...' : 'Confirm Booking ✓'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  page: {
    padding: '40px 5%',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    marginBottom: '8px',
  },
  serviceArea: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(6, 214, 160, 0.06)',
    border: '1px solid rgba(6, 214, 160, 0.15)',
    borderRadius: '50px',
    padding: '8px 20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#06d6a0',
    marginBottom: '24px',
  },
  serviceAreaDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#06d6a0',
  },
  filters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-secondary)',
    padding: '10px 24px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: 'var(--font-family)',
    transition: 'all 0.25s ease',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    color: 'white',
    borderColor: 'transparent',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    padding: '0',
    overflow: 'hidden',
    animation: 'fadeInUp 0.5s ease-out both',
  },
  imageWrap: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #1a1f3a, #0d1025)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleImg: {
    maxWidth: '85%',
    maxHeight: '180px',
    objectFit: 'contain',
    transition: 'transform 0.4s ease',
  },
  cardBody: {
    padding: '20px 24px 24px',
  },
  cardTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: 0,
  },
  typeBadgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
  },
  locationText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  specs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '20px',
  },
  spec: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  specLabel: {
    fontSize: '0.73rem',
    color: 'var(--text-muted)',
  },
  specValue: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '16px',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  priceUnit: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  bookBtn: {
    padding: '10px 24px',
    fontSize: '0.9rem',
  },
  modalNote: {
    background: 'rgba(6, 214, 160, 0.06)',
    border: '1px solid rgba(6, 214, 160, 0.15)',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '0.8rem',
    color: '#06d6a0',
    marginBottom: '16px',
    fontWeight: '600',
  },
  costPreview: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(0, 212, 255, 0.06)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.15)',
    color: 'var(--text-secondary)',
    marginTop: '8px',
  },
  cancelBtn: {
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-secondary)',
    padding: '10px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: 'var(--font-family)',
    fontWeight: '600',
  },
};

export default Vehicles;