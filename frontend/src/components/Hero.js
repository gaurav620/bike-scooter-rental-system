import React from 'react';
import { useScrollAnimation, useAnimatedCounter } from '../hooks/useScrollAnimation';

const Hero = () => {
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });

  const stats = [
    { value: '100+', label: 'Happy Riders', icon: '👥' },
    { value: '4.8', label: 'User Rating', icon: '⭐' },
    { value: '5km', label: 'Coverage', icon: '📍' },
    { value: '10+', label: 'Scooters', icon: '🛵' },
  ];

  return (
    <div style={styles.hero}>
      {/* Background animated orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      <div style={styles.content}>
        <div style={styles.badge}>
          <span style={styles.badgeDot}></span>
          Now Live near JIS College of Engineering, Kalyani
        </div>

        <h1 style={styles.heading}>
          Rent{' '}
          <span className="shimmer-text">Electric Scooters</span>
          <br />in Kalyani, WB
        </h1>

        <p style={styles.subtitle}>
          Affordable hourly & daily scooter rentals within 5km of JIS College of Engineering,
          Kalyani - 741235. Zero deposit, complimentary helmets, fully electric.
        </p>

        <div style={styles.pricing}>
          <div style={styles.priceTag}>
            <span style={styles.priceAmount}>₹29</span>
            <span style={styles.priceLabel}>/hour</span>
          </div>
          <div style={styles.priceDivider}></div>
          <div style={styles.priceTag}>
            <span style={styles.priceAmount}>₹199</span>
            <span style={styles.priceLabel}>/day</span>
          </div>
          <div style={styles.priceDivider}></div>
          <div style={styles.priceTag}>
            <span style={styles.priceAmount}>₹2,499</span>
            <span style={styles.priceLabel}>/month</span>
          </div>
        </div>

        <div style={styles.cta}>
          <a href="/vehicles" style={styles.ctaBtn} className="cta-primary">
            Explore Scooters →
          </a>
          <a href="/register" style={styles.ctaBtnOutline} className="cta-outline">
            Get Started Free
          </a>
        </div>

        {/* Animated Stats */}
        <div ref={statsRef} style={styles.stats}>
          {stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} isVisible={statsVisible} delay={i * 100} />
          ))}
        </div>

        {/* Location tag */}
        <div style={styles.locationTag}>
          📍 Service Area: JIS College of Engineering & surroundings (5km radius) — Kalyani, Nadia, West Bengal 741235
        </div>
      </div>

      {/* Scooter Image with Glow */}
      <div style={styles.imageContainer} className="hero-image-container">
        <div className="scooter-glow"></div>
        <img
          src="/scooter-hero.png"
          alt="Electric Scooter"
          className="scooter-float"
          style={styles.heroImage}
        />
      </div>
    </div>
  );
};

// Sub-component for animated stat counter
const AnimatedStat = ({ stat, isVisible, delay }) => {
  const count = useAnimatedCounter(stat.value, isVisible, 2000 + delay);

  return (
    <div style={{
      ...styles.statItem,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s ease ${delay}ms`,
    }}>
      <span style={styles.statIcon}>{stat.icon}</span>
      <span style={styles.statValue}>{count}</span>
      <span style={styles.statLabel}>{stat.label}</span>
    </div>
  );
};

const styles = {
  hero: {
    position: 'relative',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #0a0e27 0%, #111639 40%, #1a1040 100%)',
    padding: '80px 5%',
    gap: '40px',
    flexWrap: 'wrap',
  },
  orb1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-10%',
    left: '-5%',
    animation: 'float 6s ease-in-out infinite',
  },
  orb2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '10%',
    right: '10%',
    animation: 'float 8s ease-in-out infinite',
  },
  orb3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(6, 214, 160, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    left: '30%',
    animation: 'float 7s ease-in-out infinite reverse',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '600px',
    flex: '1 1 400px',
    animation: 'fadeInUp 0.8s ease-out',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(6, 214, 160, 0.08)',
    border: '1px solid rgba(6, 214, 160, 0.25)',
    borderRadius: '50px',
    padding: '8px 20px',
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#06d6a0',
    marginBottom: '28px',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#06d6a0',
    display: 'inline-block',
    animation: 'pulse-glow 2s infinite',
  },
  heading: {
    fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
    fontWeight: '800',
    lineHeight: '1.15',
    color: '#ffffff',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.7',
    marginBottom: '28px',
    maxWidth: '500px',
  },
  pricing: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  priceTag: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
  },
  priceAmount: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: '#ffffff',
  },
  priceLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
  },
  priceDivider: {
    width: '1px',
    height: '30px',
    background: 'rgba(255,255,255,0.15)',
  },
  cta: {
    display: 'flex',
    gap: '16px',
    marginBottom: '36px',
    flexWrap: 'wrap',
  },
  ctaBtn: {
    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    color: 'white',
    padding: '14px 36px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
  ctaBtnOutline: {
    background: 'transparent',
    color: '#00d4ff',
    padding: '14px 36px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '1rem',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block',
  },
  stats: {
    display: 'flex',
    gap: '28px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statIcon: {
    fontSize: '1.4rem',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  locationTag: {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: '1.5',
  },
  imageContainer: {
    flex: '1 1 350px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    animation: 'fadeInUp 1s ease-out 0.3s both',
  },
  heroImage: {
    maxWidth: '100%',
    maxHeight: '450px',
    objectFit: 'contain',
    borderRadius: '16px',
    position: 'relative',
    zIndex: 2,
  },
};

export default Hero;