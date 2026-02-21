import React from 'react';

const pressItems = [
    {
        date: 'Feb 2026',
        source: 'Kalyani Times',
        title: 'RideFleet Brings Electric Scooter Rentals to JIS College Campus',
        excerpt: 'A new startup is making waves in Kalyani by offering affordable electric scooter rentals to students at just ₹29/hour...',
    },
    {
        date: 'Jan 2026',
        source: 'TechBengal',
        title: 'How RideFleet is Solving Campus Mobility in West Bengal',
        excerpt: 'With a fleet of modern electric scooters and a tech-first approach, RideFleet aims to become the go-to mobility solution for college campuses in Bengal...',
    },
    {
        date: 'Jan 2026',
        source: 'StartupIndia Blog',
        title: 'Student-Founded Startup RideFleet Targets Tier-2 Campus Mobility',
        excerpt: 'While most scooter-sharing startups focus on metros, RideFleet is taking a different approach by starting in Kalyani, near JIS College of Engineering...',
    },
];

const Press = () => {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>📰</span>
                    <h1 style={styles.title}>Press & <span style={styles.gradient}>Media</span></h1>
                    <p style={styles.subtitle}>RideFleet in the news</p>
                </div>

                {pressItems.map((item, i) => (
                    <div key={i} className="glass-card" style={{ ...styles.card, animationDelay: `${i * 0.1}s` }}>
                        <div style={styles.meta}>
                            <span style={styles.source}>{item.source}</span>
                            <span style={styles.date}>{item.date}</span>
                        </div>
                        <h3 style={styles.cardTitle}>{item.title}</h3>
                        <p style={styles.excerpt}>{item.excerpt}</p>
                    </div>
                ))}

                <div className="glass-card" style={{ ...styles.card, textAlign: 'center' }}>
                    <h4 style={{ ...styles.cardTitle, marginBottom: '8px' }}>📧 Media Inquiries</h4>
                    <p style={styles.excerpt}>
                        For press inquiries and media kits, reach out to us at{' '}
                        <span style={{ color: '#00d4ff', fontWeight: '600' }}>press@ridefleet.in</span>
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
    card: { padding: '28px', marginBottom: '16px', animation: 'fadeInUp 0.5s ease-out both' },
    meta: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
    source: { background: 'rgba(0, 212, 255, 0.08)', color: '#00d4ff', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' },
    date: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    cardTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.4' },
    excerpt: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.65' },
};

export default Press;
