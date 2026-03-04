import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    num: '01',
    icon: '📅',
    title: 'Set Date & Time',
    desc: 'Pick your preferred date, time and city to find available rides near you.',
    color: '#00d4ff',
  },
  {
    num: '02',
    icon: '🏍️',
    title: 'Choose Your Ride',
    desc: 'Browse from bikes & scooters. Compare prices and find your perfect match.',
    color: '#7c3aed',
  },
  {
    num: '03',
    icon: '📍',
    title: 'Pick Up',
    desc: 'Head to the nearest pick-up point. Get your helmet and off you go!',
    color: '#06d6a0',
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Ride & Enjoy',
    desc: 'Explore the city, commute hassle-free, and return when you\'re done.',
    color: '#ffa502',
  },
];

const HowItWorks = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} style={styles.section}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>How It Works</h2>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        Get on the road in 4 simple steps
      </p>

      <div style={styles.grid}>
        {steps.map((step, i) => (
          <div
            key={i}
            className="glass-card scroll-card"
            style={{
              ...styles.card,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s`,
            }}
          >
            <div style={{ ...styles.iconWrap, background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
              <span style={styles.icon}>{step.icon}</span>
            </div>
            <div style={{ ...styles.num, color: step.color }}>{step.num}</div>
            <h4 style={styles.title}>{step.title}</h4>
            <p style={styles.desc}>{step.desc}</p>

            {i < steps.length - 1 && (
              <div style={styles.connector}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  section: {
    padding: '80px 5%',
    background: 'var(--bg-primary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    padding: '32px 24px',
    textAlign: 'center',
    position: 'relative',
  },
  iconWrap: {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  icon: {
    fontSize: '2rem',
  },
  num: {
    fontSize: '0.75rem',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  desc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  connector: {
    position: 'absolute',
    right: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.2rem',
    color: 'var(--text-muted)',
    zIndex: 2,
  },
};

export default HowItWorks;