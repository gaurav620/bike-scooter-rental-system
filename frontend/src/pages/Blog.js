import React from 'react';

const posts = [
    {
        date: 'Feb 21, 2026',
        tag: 'Launch',
        title: '🎉 RideFleet Launches in Kalyani!',
        excerpt: 'We\'re thrilled to announce the launch of our electric scooter rental service near JIS College of Engineering, Kalyani. Students can now rent scooters starting at just ₹29/hour!',
        color: '#06d6a0',
    },
    {
        date: 'Feb 18, 2026',
        tag: 'Electric',
        title: '⚡ Why We Chose Electric Scooters',
        excerpt: 'Electric scooters are the future of urban micro-mobility. With zero emissions, lower running costs, and quiet operation, they\'re perfect for campus areas. Here\'s why we went 100% electric.',
        color: '#00d4ff',
    },
    {
        date: 'Feb 15, 2026',
        tag: 'Safety',
        title: '🛡️ Our Safety Commitment',
        excerpt: 'Every RideFleet scooter comes with a complimentary helmet, is sanitized after each ride, and undergoes weekly maintenance checks. Your safety is our top priority.',
        color: '#7c3aed',
    },
    {
        date: 'Feb 10, 2026',
        tag: 'Tips',
        title: '🏍️ 5 Tips for Your First E-Scooter Ride',
        excerpt: 'New to electric scooters? Here are our top tips: always wear the helmet, check the battery level before starting, follow traffic rules, park at designated spots, and enjoy the ride!',
        color: '#ffa502',
    },
];

const Blog = () => {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <span style={styles.emoji}>📝</span>
                    <h1 style={styles.title}>RideFleet <span style={styles.gradient}>Blog</span></h1>
                    <p style={styles.subtitle}>News, tips, and updates from the RideFleet team</p>
                </div>

                <div style={styles.grid}>
                    {posts.map((post, i) => (
                        <div key={i} className="glass-card" style={{ ...styles.postCard, animationDelay: `${i * 0.1}s` }}>
                            <div style={styles.postTop}>
                                <span style={{ ...styles.tag, background: `${post.color}15`, color: post.color, borderColor: `${post.color}30` }}>{post.tag}</span>
                                <span style={styles.date}>{post.date}</span>
                            </div>
                            <h3 style={styles.postTitle}>{post.title}</h3>
                            <p style={styles.excerpt}>{post.excerpt}</p>
                            <span style={{ ...styles.readMore, color: post.color }}>Read More →</span>
                        </div>
                    ))}
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
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
    postCard: { padding: '28px', animation: 'fadeInUp 0.5s ease-out both', cursor: 'pointer' },
    postTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },
    tag: { padding: '4px 12px', borderRadius: '6px', fontSize: '0.73rem', fontWeight: '700', border: '1px solid', textTransform: 'uppercase', letterSpacing: '0.5px' },
    date: { fontSize: '0.8rem', color: 'var(--text-muted)' },
    postTitle: { fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.4' },
    excerpt: { fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '14px' },
    readMore: { fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

export default Blog;
