import React from 'react';

const features = [
  {
    icon: '⛑️',
    title: 'Complimentary Helmet',
    desc: 'Your safety is our priority. Free helmet provided with every ride booking.',
    color: '#ff4757',
  },
  {
    icon: '💰',
    title: 'Zero Deposit',
    desc: 'Pay only for what you use. We don\'t charge any security deposit upfront.',
    color: '#06d6a0',
  },
  {
    icon: '🏷️',
    title: 'Lowest Price Guarantee',
    desc: 'Best bike rental prices in the city. Find cheaper? We\'ll match it.',
    color: '#ffa502',
  },
  {
    icon: '🧼',
    title: 'Sanitized Bikes',
    desc: 'Every vehicle is thoroughly sanitized after each ride for your safety.',
    color: '#00d4ff',
  },
  {
    icon: '📱',
    title: 'Easy Booking',
    desc: 'Book in seconds through our platform. No paperwork, no hassle.',
    color: '#7c3aed',
  },
  {
    icon: '🛡️',
    title: '24/7 Support',
    desc: 'Round-the-clock assistance. We\'re always here when you need us.',
    color: '#2ed573',
  },
];

const WhyChooseUs = () => {
  return (
    <div style={styles.section}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose RideFleet?</h2>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        Everything you need for a hassle-free ride experience
      </p>

      <div style={styles.grid}>
        {features.map((f, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              ...styles.card,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div style={{ ...styles.iconBox, background: `${f.color}12`, border: `1px solid ${f.color}25` }}>
              <span style={styles.icon}>{f.icon}</span>
            </div>
            <h4 style={styles.title}>{f.title}</h4>
            <p style={styles.desc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  section: {
    padding: '80px 5%',
    background: 'linear-gradient(180deg, var(--bg-primary), var(--bg-secondary))',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    padding: '32px',
    animation: 'fadeInUp 0.6s ease-out both',
  },
  iconBox: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '1.6rem',
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  desc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
};

export default WhyChooseUs;