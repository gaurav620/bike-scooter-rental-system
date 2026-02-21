import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const SearchBar = () => {
  const [city] = useState('Kalyani');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get('/vehicles', {
        params: {
          location: city,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      });
      navigate('/vehicles', { state: { vehicles: response.data } });
    } catch (err) {
      alert('Error searching');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card} className="glass-card">
        <h3 style={styles.title}>🔍 Find Your Perfect Ride</h3>
        <div style={styles.locationInfo}>
          <span style={styles.locationDot}></span>
          Serving Kalyani (5km radius from JIS College of Engineering)
        </div>
        <form onSubmit={handleSearch} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>📍 Location</label>
            <input
              type="text"
              value="Kalyani, West Bengal — 741235"
              readOnly
              style={{ ...styles.input, opacity: 0.7, cursor: 'default' }}
              className="modern-input"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>📅 Pick-up</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="modern-input"
              wrapperClassName="datepicker-full"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>📅 Drop-off</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="modern-input"
              wrapperClassName="datepicker-full"
            />
          </div>
          <button type="submit" className="btn-gradient" style={styles.btn}>
            Rent Now →
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    zIndex: 10,
    marginTop: '-50px',
    padding: '0 5%',
    marginBottom: '40px',
  },
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '32px',
    animation: 'fadeInUp 0.8s ease-out 0.3s both',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '8px',
    textAlign: 'center',
  },
  locationInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    color: '#06d6a0',
    fontWeight: '600',
    marginBottom: '20px',
  },
  locationDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#06d6a0',
    animation: 'pulse-glow 2s infinite',
  },
  form: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inputGroup: {
    flex: '1',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
  },
  btn: {
    minWidth: '150px',
    height: '47px',
    fontSize: '1rem',
    marginTop: '12px',
  },
};

export default SearchBar;