import React, { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // In production, this would send to a backend endpoint
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>📞</span>
                    <h1 style={styles.title}>Contact <span style={styles.gradient}>Us</span></h1>
                    <p style={styles.subtitle}>We'd love to hear from you</p>
                </div>

                <div style={styles.grid}>
                    {/* Contact Info */}
                    <div>
                        {[
                            { icon: '📧', label: 'Email', value: 'support@ridefleet.in' },
                            { icon: '📱', label: 'Phone', value: '+91 98765 43210' },
                            { icon: '📍', label: 'Address', value: 'Near JIS College of Engineering, Kalyani, Nadia, West Bengal — 741235' },
                            { icon: '⏰', label: 'Operating Hours', value: '7:00 AM — 10:00 PM, 7 days a week' },
                        ].map((item, i) => (
                            <div key={i} className="glass-card" style={{ ...styles.infoCard, animationDelay: `${i * 0.1}s` }}>
                                <span style={styles.infoIcon}>{item.icon}</span>
                                <div>
                                    <span style={styles.infoLabel}>{item.label}</span>
                                    <span style={styles.infoValue}>{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="glass-card" style={styles.formCard}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <span style={{ fontSize: '3rem' }}>✅</span>
                                <h3 style={{ color: 'var(--text-primary)', marginTop: '16px', fontWeight: '700' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={styles.form}>
                                <h3 style={styles.formTitle}>Send us a message</h3>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required className="modern-input" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="modern-input" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Message</label>
                                    <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help?" required className="modern-input" style={{ ...styles.input, minHeight: '120px', resize: 'vertical' }} />
                                </div>
                                <button type="submit" className="btn-gradient" style={styles.submitBtn}>
                                    Send Message →
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 5% 80px' },
    container: { maxWidth: '950px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px', animation: 'fadeInUp 0.6s ease-out' },
    emoji: { fontSize: '3rem', display: 'block', marginBottom: '12px' },
    title: { fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' },
    gradient: { background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subtitle: { fontSize: '1rem', color: 'var(--text-secondary)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' },
    infoCard: { padding: '20px', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '14px', animation: 'fadeInUp 0.5s ease-out both' },
    infoIcon: { fontSize: '1.5rem', flexShrink: 0 },
    infoLabel: { display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '4px' },
    infoValue: { fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: '1.5' },
    formCard: { padding: '28px', animation: 'fadeInUp 0.6s ease-out 0.2s both' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    formTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: { width: '100%' },
    submitBtn: { width: '100%', padding: '14px', fontSize: '1rem' },
};

export default ContactUs;
