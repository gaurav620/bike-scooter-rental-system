import React from 'react';

const AboutUs = () => {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>🏢</span>
                    <h1 style={styles.title}>About <span style={styles.gradient}>RideFleet</span></h1>
                    <p style={styles.subtitle}>Revolutionizing campus mobility in Kalyani, West Bengal</p>
                </div>

                <div className="glass-card" style={styles.card}>
                    <h3 style={styles.cardTitle}>Our Story</h3>
                    <p style={styles.text}>
                        Founded in 2024, RideFleet started with a simple mission — to make two-wheeler
                        mobility affordable and accessible for students and residents of Kalyani.
                        Based near JIS College of Engineering, we understand the daily commute challenges
                        students face in the area.
                    </p>
                    <p style={styles.text}>
                        We started with just a handful of electric scooters and a dream to create a
                        sustainable transportation solution. Today, we operate a growing fleet of
                        well-maintained electric scooters within a 5km radius of JIS College of Engineering,
                        Kalyani — 741235.
                    </p>
                </div>

                <div className="glass-card" style={styles.card}>
                    <h3 style={styles.cardTitle}>Our Mission</h3>
                    <p style={styles.text}>
                        🎯 To provide affordable, eco-friendly, and hassle-free electric scooter rentals
                        to students and residents of Kalyani.
                    </p>
                </div>

                <div style={styles.valuesGrid}>
                    {[
                        { icon: '⚡', title: 'Fully Electric', desc: '100% electric fleet — zero emissions, zero noise pollution' },
                        { icon: '💰', title: 'Student Friendly', desc: 'Pricing designed for college students — starting ₹29/hour' },
                        { icon: '🛡️', title: 'Safety First', desc: 'Complimentary helmets, sanitized scooters, 24/7 support' },
                        { icon: '🌱', title: 'Eco Conscious', desc: 'Reducing carbon footprint one ride at a time' },
                    ].map((v, i) => (
                        <div key={i} className="glass-card" style={styles.valueCard}>
                            <span style={styles.valueIcon}>{v.icon}</span>
                            <h4 style={styles.valueTitle}>{v.title}</h4>
                            <p style={styles.valueDesc}>{v.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-card" style={styles.card}>
                    <h3 style={styles.cardTitle}>📍 Location</h3>
                    <p style={styles.text}>
                        <strong>Service Area:</strong> 5km radius from JIS College of Engineering<br />
                        <strong>Address:</strong> Kalyani, Nadia, West Bengal — 741235<br />
                        <strong>Operating Hours:</strong> 7:00 AM — 10:00 PM, 7 days a week
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 5% 80px' },
    container: { maxWidth: '800px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px', animation: 'fadeInUp 0.6s ease-out' },
    emoji: { fontSize: '3rem', display: 'block', marginBottom: '12px' },
    title: { fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' },
    gradient: { background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subtitle: { fontSize: '1rem', color: 'var(--text-secondary)' },
    card: { padding: '28px', marginBottom: '20px', animation: 'fadeInUp 0.6s ease-out both' },
    cardTitle: { fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' },
    text: { fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '12px' },
    valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' },
    valueCard: { padding: '24px', textAlign: 'center' },
    valueIcon: { fontSize: '2rem', display: 'block', marginBottom: '10px' },
    valueTitle: { fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' },
    valueDesc: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' },
};

export default AboutUs;
