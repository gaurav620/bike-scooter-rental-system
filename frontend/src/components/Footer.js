import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const links = {
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Press', to: '/press' },
    ],
    Support: [
      { label: 'Help Center', to: '/help' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Partner With Us', to: '/partner' },
    ],
    Legal: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms & Conditions', to: '#' },
      { label: 'Refund Policy', to: '#' },
      { label: 'Cookie Policy', to: '#' },
    ],
  };

  const socials = [
    { icon: <FaInstagram />, color: '#E4405F' },
    { icon: <FaTwitter />, color: '#1DA1F2' },
    { icon: <FaFacebook />, color: '#4267B2' },
    { icon: <FaLinkedin />, color: '#0A66C2' },
    { icon: <FaYoutube />, color: '#FF0000' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.top}>
          {/* Brand */}
          <div style={styles.brand}>
            <h3 style={styles.logo}>🏍️ RideFleet</h3>
            <p style={styles.tagline}>
              Electric scooter rentals near JIS College of Engineering, Kalyani, WB — 741235. Affordable, safe, and 100% electric.
            </p>
            <div style={styles.socials}>
              {socials.map((s, i) => (
                <span key={i} style={{ ...styles.socialIcon, color: s.color }} aria-label="Social link">
                  {s.icon}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} style={styles.col}>
              <h5 style={styles.colTitle}>{title}</h5>
              {items.map((item, i) => (
                item.to === '#' ? (
                  <span key={i} style={{ ...styles.link, cursor: 'default', opacity: 0.5 }}>{item.label}</span>
                ) : (
                  <Link key={i} to={item.to} style={styles.link}>{item.label}</Link>
                )
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={styles.bottom}>
          <p style={styles.copy}>© 2024 - 2026 RideFleet Pvt Ltd. All Rights Reserved.</p>
          <p style={styles.madeWith}>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(180deg, var(--bg-secondary), #080b1e)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '60px 5% 30px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  brand: {
    maxWidth: '280px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
  },
  tagline: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  socials: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    fontSize: '1.2rem',
    opacity: 0.7,
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  colTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  link: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
  },
  copy: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  madeWith: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
};

export default Footer;