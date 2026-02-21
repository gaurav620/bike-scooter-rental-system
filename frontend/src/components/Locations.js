import React from 'react';

const activeCity = {
  name: 'Kalyani',
  state: 'West Bengal',
  pin: '741235',
  landmark: 'JIS College of Engineering',
  radius: '5km',
};

const comingSoonCities = [
  { name: 'Kolkata', state: 'WB' },
  { name: 'Delhi', state: 'NCR' },
  { name: 'Mumbai', state: 'MH' },
  { name: 'Bangalore', state: 'KA' },
  { name: 'Chennai', state: 'TN' },
  { name: 'Hyderabad', state: 'TG' },
  { name: 'Pune', state: 'MH' },
  { name: 'Jaipur', state: 'RJ' },
  { name: 'Ahmedabad', state: 'GJ' },
  { name: 'Lucknow', state: 'UP' },
  { name: 'Chandigarh', state: 'PB' },
  { name: 'Goa', state: 'GA' },
  { name: 'Siliguri', state: 'WB' },
  { name: 'Durgapur', state: 'WB' },
  { name: 'Howrah', state: 'WB' },
];

const Locations = () => {
  return (
    <div style={styles.section}>
      <h2 className="section-title" style={{ textAlign: 'center' }}>📍 Service Locations</h2>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        Currently serving Kalyani — expanding to more cities soon!
      </p>

      {/* Active City - Featured */}
      <div style={styles.activeCard} className="glass-card">
        <div style={styles.activeHeader}>
          <div style={styles.liveBadge}>
            <span style={styles.liveDot}></span>
            LIVE NOW
          </div>
        </div>
        <div style={styles.activeContent}>
          <div style={styles.activeLeft}>
            <h3 style={styles.activeName}>🏙️ {activeCity.name}, {activeCity.state}</h3>
            <p style={styles.activeDetail}>📌 Near {activeCity.landmark}</p>
            <p style={styles.activeDetail}>📮 PIN: {activeCity.pin}</p>
            <p style={styles.activeDetail}>🔄 Coverage: {activeCity.radius} radius</p>
          </div>
          <div style={styles.activeRight}>
            <a href="/vehicles" style={styles.bookBtn} className="btn-gradient">
              Book a Scooter →
            </a>
          </div>
        </div>
        <div style={styles.mapNote}>
          Service covers: JIS College, Kalyani Main Road, Kalyani Bus Stand, BCKV Area, Kalyani Railway Station & surroundings within 5km
        </div>
      </div>

      {/* Coming Soon Grid */}
      <h4 style={styles.comingSoonTitle}>🚀 Coming Soon</h4>
      <div style={styles.grid}>
        {comingSoonCities.map((city, i) => (
          <div
            key={i}
            style={styles.cityTag}
          >
            <span style={styles.pin}>📍</span>
            <span style={styles.cityName}>{city.name}</span>
            <span style={styles.region}>{city.state}</span>
            <span style={styles.comingSoonBadge}>Soon</span>
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
  activeCard: {
    maxWidth: '750px',
    margin: '0 auto 40px',
    padding: '28px',
    border: '1px solid rgba(6, 214, 160, 0.25) !important',
    background: 'rgba(6, 214, 160, 0.04) !important',
  },
  activeHeader: {
    marginBottom: '16px',
  },
  liveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(6, 214, 160, 0.12)',
    color: '#06d6a0',
    padding: '6px 16px',
    borderRadius: '50px',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  liveDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#06d6a0',
    animation: 'pulse-glow 1.5s infinite',
  },
  activeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  activeLeft: {},
  activeName: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '10px',
  },
  activeDetail: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: '4px',
  },
  activeRight: {},
  bookBtn: {
    textDecoration: 'none',
    display: 'inline-block',
    padding: '12px 28px',
  },
  mapNote: {
    marginTop: '16px',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '10px',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  comingSoonTitle: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: '700',
    marginBottom: '20px',
    letterSpacing: '0.5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '10px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  cityTag: {
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    opacity: 0.6,
  },
  pin: {
    fontSize: '0.8rem',
    opacity: 0.5,
  },
  cityName: {
    fontWeight: '600',
    flex: 1,
  },
  region: {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    opacity: 0.6,
  },
  comingSoonBadge: {
    background: 'rgba(255, 165, 2, 0.1)',
    color: '#ffa502',
    padding: '2px 8px',
    borderRadius: '8px',
    fontSize: '0.65rem',
    fontWeight: '700',
  },
};

export default Locations;