import React, { useState } from 'react';

const PartnerWithUs = () => {
    const [formData, setFormData] = useState({ name: '', business: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

    const partnerTypes = [
        { icon: '🏪', title: 'Pickup Point Partner', desc: 'Offer your shop/location as a scooter pickup & drop-off point. Earn commission on every booking.' },
        { icon: '🔧', title: 'Maintenance Partner', desc: 'Are you a mechanic or E.V. service center? Partner with us for fleet maintenance.' },
        { icon: '🏫', title: 'College / Institution', desc: 'Host RideFleet in your campus. Special student pricing and campus ambassador programs available.' },
        { icon: '🏢', title: 'Corporate Partnership', desc: 'Provide last-mile mobility for your employees. Custom corporate plans available.' },
    ];

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>🤝</span>
                    <h1 style={styles.title}>Partner With <span style={styles.gradient}>RideFleet</span></h1>
                    <p style={styles.subtitle}>Grow together with West Bengal's electric scooter rental platform</p>
                </div>

                <div style={styles.typesGrid}>
                    {partnerTypes.map((p, i) => (
                        <div key={i} className="glass-card" style={{ ...styles.typeCard, animationDelay: `${i * 0.1}s` }}>
                            <span style={styles.typeIcon}>{p.icon}</span>
                            <h4 style={styles.typeTitle}>{p.title}</h4>
                            <p style={styles.typeDesc}>{p.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-card" style={styles.formCard}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <span style={{ fontSize: '3rem' }}>🎉</span>
                            <h3 style={{ color: 'var(--text-primary)', marginTop: '16px', fontWeight: '700' }}>Partnership Request Submitted!</h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Our team will reach out to you within 48 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <h3 style={styles.formTitle}>Express Your Interest</h3>
                            <div style={styles.formGrid}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Your Name</label>
                                    <input type="text" value={formData.name} onChange={handleChange('name')} placeholder="Full name" required className="modern-input" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Business Name</label>
                                    <input type="text" value={formData.business} onChange={handleChange('business')} placeholder="Your business" className="modern-input" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email</label>
                                    <input type="email" value={formData.email} onChange={handleChange('email')} placeholder="you@example.com" required className="modern-input" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Phone</label>
                                    <input type="tel" value={formData.phone} onChange={handleChange('phone')} placeholder="+91 9876543210" className="modern-input" style={styles.input} />
                                </div>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Tell us more</label>
                                <textarea value={formData.message} onChange={handleChange('message')} placeholder="What kind of partnership are you interested in?" className="modern-input" style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }} />
                            </div>
                            <button type="submit" className="btn-gradient" style={styles.submitBtn}>
                                Submit Partnership Request →
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 5% 80px' },
    container: { maxWidth: '900px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px', animation: 'fadeInUp 0.6s ease-out' },
    emoji: { fontSize: '3rem', display: 'block', marginBottom: '12px' },
    title: { fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' },
    gradient: { background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subtitle: { fontSize: '1rem', color: 'var(--text-secondary)' },
    typesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' },
    typeCard: { padding: '24px', textAlign: 'center', animation: 'fadeInUp 0.5s ease-out both' },
    typeIcon: { fontSize: '2rem', display: 'block', marginBottom: '10px' },
    typeTitle: { fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' },
    typeDesc: { fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: '1.5' },
    formCard: { padding: '32px', animation: 'fadeInUp 0.6s ease-out 0.3s both' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    formTitle: { fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: { width: '100%' },
    submitBtn: { width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' },
};

export default PartnerWithUs;
