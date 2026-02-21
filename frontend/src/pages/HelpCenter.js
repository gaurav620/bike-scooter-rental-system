import React from 'react';

const helpTopics = [
    {
        icon: '📋',
        title: 'How to Book a Scooter',
        steps: ['Create an account or log in', 'Go to the Vehicles page', 'Choose an available scooter', 'Select start time and duration', 'Confirm your booking', 'Pick up at the designated point near JIS College'],
    },
    {
        icon: '💳',
        title: 'Payments & Pricing',
        steps: ['Pricing starts at ₹29/hour, ₹199/day, ₹2,499/month', 'Payments are processed via Razorpay (UPI, cards, net banking)', 'You can pay after your ride from the Dashboard', 'No security deposit required'],
    },
    {
        icon: '🔄',
        title: 'Cancellation & Refunds',
        steps: ['Cancel anytime before your ride starts — full refund', 'Cancellations during active rides are not possible', 'Refunds are processed within 3-5 business days', 'Contact support for any refund issues'],
    },
    {
        icon: '🛡️',
        title: 'Safety Guidelines',
        steps: ['Always wear the provided helmet', 'Follow traffic rules and drive within speed limits', 'Park at designated parking areas only', 'Report any damage or issues immediately', 'Do not ride outside the 5km service area'],
    },
];

const HelpCenter = () => {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>🆘</span>
                    <h1 style={styles.title}>Help <span style={styles.gradient}>Center</span></h1>
                    <p style={styles.subtitle}>Everything you need to know about using RideFleet</p>
                </div>

                {helpTopics.map((topic, i) => (
                    <div key={i} className="glass-card" style={{ ...styles.card, animationDelay: `${i * 0.1}s` }}>
                        <h3 style={styles.cardTitle}>{topic.icon} {topic.title}</h3>
                        <ol style={styles.stepsList}>
                            {topic.steps.map((step, j) => (
                                <li key={j} style={styles.step}>{step}</li>
                            ))}
                        </ol>
                    </div>
                ))}

                <div className="glass-card" style={{ ...styles.card, textAlign: 'center' }}>
                    <h4 style={styles.cardTitle}>Still need help?</h4>
                    <p style={styles.text}>
                        Email us at <span style={{ color: '#00d4ff', fontWeight: '600' }}>support@ridefleet.in</span><br />
                        or call <span style={{ color: '#00d4ff', fontWeight: '600' }}>+91 98765 43210</span>
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
    cardTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px' },
    stepsList: { paddingLeft: '20px', margin: 0 },
    step: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: '4px' },
    text: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' },
};

export default HelpCenter;
