import React from 'react';

const careers = [
    {
        title: 'Fleet Operations Manager',
        type: 'Full-time',
        location: 'Kalyani, WB',
        desc: 'Manage our scooter fleet, handle maintenance, and ensure smooth operations across all pickup points.',
    },
    {
        title: 'Campus Ambassador — JIS College',
        type: 'Part-time / Internship',
        location: 'JIS College of Engineering',
        desc: 'Represent RideFleet on campus, help onboard new riders, manage promotional events, and earn incentives.',
    },
    {
        title: 'Customer Support Executive',
        type: 'Full-time',
        location: 'Remote / Kalyani',
        desc: 'Help riders with bookings, payments, and ride issues via chat and phone. Excellent communication skills required.',
    },
    {
        title: 'Full Stack Developer (MERN)',
        type: 'Internship / Full-time',
        location: 'Remote',
        desc: 'Build and improve the RideFleet web platform. Experience with React, Node.js, MongoDB required.',
    },
];

const Careers = () => {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>💼</span>
                    <h1 style={styles.title}>Join <span style={styles.gradient}>RideFleet</span></h1>
                    <p style={styles.subtitle}>Help us build the future of campus mobility</p>
                </div>

                <div className="glass-card" style={styles.whyCard}>
                    <h3 style={styles.cardTitle}>Why Work With Us?</h3>
                    <div style={styles.perks}>
                        {['🚀 Early-stage startup experience', '🎓 Great for college students', '💡 Learn & grow fast', '🤝 Collaborative culture'].map((p, i) => (
                            <span key={i} style={styles.perk}>{p}</span>
                        ))}
                    </div>
                </div>

                <h3 style={styles.sectionTitle}>Open Positions</h3>
                {careers.map((job, i) => (
                    <div key={i} className="glass-card" style={{ ...styles.jobCard, animationDelay: `${i * 0.1}s` }}>
                        <div style={styles.jobTop}>
                            <h4 style={styles.jobTitle}>{job.title}</h4>
                            <div style={styles.badges}>
                                <span style={styles.typeBadge}>{job.type}</span>
                                <span style={styles.locBadge}>📍 {job.location}</span>
                            </div>
                        </div>
                        <p style={styles.jobDesc}>{job.desc}</p>
                        <a href="mailto:careers@ridefleet.in" style={styles.applyBtn} className="btn-gradient">
                            Apply Now →
                        </a>
                    </div>
                ))}

                <div className="glass-card" style={{ ...styles.whyCard, textAlign: 'center' }}>
                    <p style={styles.contactText}>
                        Don't see a role that fits? Send us your resume at{' '}
                        <span style={{ color: '#00d4ff', fontWeight: '600' }}>careers@ridefleet.in</span>
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
    whyCard: { padding: '28px', marginBottom: '24px' },
    cardTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px' },
    perks: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    perk: { background: 'rgba(0, 212, 255, 0.06)', border: '1px solid rgba(0, 212, 255, 0.12)', borderRadius: '8px', padding: '8px 14px', fontSize: '0.85rem', color: 'var(--text-secondary)' },
    sectionTitle: { fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' },
    jobCard: { padding: '24px', marginBottom: '16px', animation: 'fadeInUp 0.5s ease-out both' },
    jobTop: { marginBottom: '10px' },
    jobTitle: { fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' },
    badges: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    typeBadge: { background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' },
    locBadge: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    jobDesc: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' },
    applyBtn: { textDecoration: 'none', display: 'inline-block', padding: '10px 24px', fontSize: '0.85rem' },
    contactText: { fontSize: '0.9rem', color: 'var(--text-secondary)' },
};

export default Careers;
