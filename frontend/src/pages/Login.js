import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/users/login', { email, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
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
          <span style={styles.emoji}>🔐</span>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to access your dashboard</p>
        </div>

        {error && (
          <div style={styles.error}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
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
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
            {loading ? '⏳ Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>Create one</Link>
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
    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '10%',
    left: '10%',
  },
  orb2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '10%',
    right: '10%',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
    animation: 'fadeInUp 0.6s ease-out',
    zIndex: 2,
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
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
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
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
    marginTop: '8px',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginTop: '24px',
  },
  link: {
    color: '#00d4ff',
    fontWeight: '600',
    textDecoration: 'none',
  },
};

export default Login;