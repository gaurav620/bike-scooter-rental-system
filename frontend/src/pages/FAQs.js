import React, { useState } from 'react';

const faqData = [
    {
        q: 'Where is RideFleet available?',
        a: 'Currently, we operate within a 5km radius of JIS College of Engineering, Kalyani, West Bengal — 741235. We cover JIS College, Kalyani Main Road, Kalyani Bus Stand, BCKV Area, and Kalyani Railway Station.',
    },
    {
        q: 'What documents do I need to rent a scooter?',
        a: 'You just need to create an account on our platform. For pick-up, carry a valid government ID (Aadhar/PAN/Driving License). You don\'t need a driving license for electric scooters under 25 km/h.',
    },
    {
        q: 'How much does it cost?',
        a: 'Our pricing starts at ₹29/hour, ₹199/day, and ₹2,499/month. No security deposit is required. Pricing may vary by scooter model.',
    },
    {
        q: 'Is a helmet provided?',
        a: 'Yes! Every rental includes a complimentary sanitized helmet. Safety is our top priority.',
    },
    {
        q: 'What if the scooter breaks down during my ride?',
        a: 'Call our 24/7 support at +91 98765 43210. We\'ll arrange a replacement scooter or roadside assistance within the service area at no extra charge.',
    },
    {
        q: 'How do I pay?',
        a: 'We accept all major payment methods through Razorpay — UPI (GPay, PhonePe, Paytm), debit/credit cards, and net banking. You can pay after your ride from the Dashboard.',
    },
    {
        q: 'Can I extend my rental duration during a ride?',
        a: 'Yes! You can extend your booking from the Dashboard. The extra time will be charged at the hourly rate.',
    },
    {
        q: 'Where do I pick up and drop off the scooter?',
        a: 'Pick-up and drop-off points are located near JIS College of Engineering gate. Exact location details will be shared after booking.',
    },
    {
        q: 'Is there a cancellation fee?',
        a: 'No! You can cancel your booking anytime before the ride starts with a full refund. No cancellation charges.',
    },
    {
        q: 'Can I ride outside the 5km service area?',
        a: 'We recommend staying within the 5km service area for coverage and support. Rides outside the area are at your own risk and may not be covered by our support.',
    },
];

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>❓</span>
                    <h1 style={styles.title}>Frequently Asked <span style={styles.gradient}>Questions</span></h1>
                    <p style={styles.subtitle}>{faqData.length} questions answered</p>
                </div>

                {faqData.map((faq, i) => (
                    <div
                        key={i}
                        className="glass-card"
                        style={{
                            ...styles.faqCard,
                            animationDelay: `${i * 0.06}s`,
                            borderColor: openIndex === i ? 'rgba(0, 212, 255, 0.25)' : undefined,
                        }}
                        onClick={() => toggle(i)}
                    >
                        <div style={styles.question}>
                            <span style={styles.qText}>{faq.q}</span>
                            <span style={{ ...styles.arrow, transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                        </div>
                        {openIndex === i && (
                            <div style={styles.answer}>
                                <p style={styles.aText}>{faq.a}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: { minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 5% 80px' },
    container: { maxWidth: '750px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '40px', animation: 'fadeInUp 0.6s ease-out' },
    emoji: { fontSize: '3rem', display: 'block', marginBottom: '12px' },
    title: { fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' },
    gradient: { background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    subtitle: { fontSize: '1rem', color: 'var(--text-secondary)' },
    faqCard: { padding: '20px 24px', marginBottom: '10px', cursor: 'pointer', animation: 'fadeInUp 0.4s ease-out both', transition: 'border-color 0.3s ease' },
    question: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    qText: { fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', flex: 1, paddingRight: '12px' },
    arrow: { fontSize: '1.2rem', color: 'var(--text-muted)', transition: 'transform 0.3s ease', flexShrink: 0 },
    answer: { marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' },
    aText: { fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 },
};

export default FAQs;
