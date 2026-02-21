import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/users/register', { name, email, password, phone });
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div style={styles.card} className="glass-card">
        <div style={styles.header}>
          <span style={styles.emoji}>🚀</span>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join RideFleet and start riding today</p>
        </div>

        {error && (
          <div style={styles.error}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="modern-input"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="modern-input"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="modern-input"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="modern-input"
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            className="btn-gradient"
            style={styles.btn}
            disabled={loading}
          >
            {loading ? '⏳ Creating...' : 'Create Account →'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0e27, #111639, #1a1040)',
    padding: '40px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '5%',
    right: '10%',
  },
  orb2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(6, 214, 160, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '10%',
    left: '10%',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '36px',
    animation: 'fadeInUp 0.6s ease-out',
    zIndex: 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  emoji: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '12px',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  error: {
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.25)',
    color: '#ff4757',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '0.85rem',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
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
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    marginTop: '6px',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginTop: '20px',
  },
  link: {
    color: '#00d4ff',
    fontWeight: '600',
    textDecoration: 'none',
  },
};

export default Register;