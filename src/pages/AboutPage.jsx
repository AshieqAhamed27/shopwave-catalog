import { Link } from 'react-router-dom';

const productHighlights = [
  {
    icon: '🛍️',
    title: 'Curated 36-Item Catalog',
    desc: 'Explore 36 hand-selected lifestyle products across 5 diverse categories — Electronics, Fashion, Home & Living, Sports, and Beauty — complete with multi-angle high-res galleries and full specifications.',
  },
  {
    icon: '🔍',
    title: 'Smart Search & Live Filters',
    desc: 'Instant real-time search with multi-parameter filtering by category, promotional badges (Hot, Sale, New, Limited), and instant sorting by price, customer rating, or popularity.',
  },
  {
    icon: '🛒',
    title: 'Interactive Slide-In Cart',
    desc: 'Slide-in drawer cart with dynamic quantity adjustments, instant subtotal calculation, free shipping threshold tracker, and single-click checkout.',
  },
  {
    icon: '⚡',
    title: 'Full-Stack Express REST API',
    desc: 'Integrated with an Express 5 backend server featuring RESTful endpoints for products, category filtering, and order management with persistent storage.',
  },
  {
    icon: '♥',
    title: 'Live Wishlist System',
    desc: 'One-click wishlist toggling with animated micro-interactions and live navbar counter badges so shoppers never lose their favorite finds.',
  },
  {
    icon: '🛡️',
    title: 'Offline Resilient Architecture',
    desc: 'Built with automatic fallback mechanisms — the product experience works seamlessly whether connected to the live Node.js server or running as a static build.',
  },
];

const values = [
  { icon: '🎯', title: 'Quality First', desc: 'Every product is hand-curated for quality, durability, and design excellence.' },
  { icon: '🌍', title: 'Sustainable', desc: 'We partner with eco-conscious brands to reduce our environmental footprint.' },
  { icon: '💎', title: 'Premium Experience', desc: 'From browse to delivery — every touchpoint is crafted to delight.' },
  { icon: '🤝', title: 'Customer Trust', desc: 'Transparent pricing, honest reviews, and 30-day hassle-free returns.' },
  { icon: '⚡', title: 'Innovation', desc: 'We continuously evolve our platform with the latest technology.' },
  { icon: '❤️', title: 'Community', desc: 'Built for real people. Powered by a community of passionate customers.' },
];

export default function AboutPage() {
  return (
    <main className="page">
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-banner-bg" />
        <div className="container" style={{ position: 'relative' }}>
          <h1 className="page-banner-title">
            About <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ShopWave</span>
          </h1>
          <p className="page-banner-subtitle">
            A modern full-stack e-commerce catalog featuring client-side routing, state management, and an Express REST API.
          </p>
        </div>
      </div>

      <div className="container">

        {/* Story */}
        <div className="about-hero-grid">
          <div>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-block' }}>Our Story</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Built to Demonstrate<br />
              <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Professional-Grade
              </span> Full-Stack Skills
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              ShopWave was created as a Full-Stack Web Development Capstone Project — demonstrating
              end-to-end frontend architecture, client-side routing, state management, component
              modularity, and performance-optimized asset delivery.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
              The project showcases React 19 + Vite 8, React Router v7, Context API, an Express REST API backend,
              and modern CSS design systems with glassmorphism and micro-animations. It's designed
              to demonstrate real-world full-stack thinking for evaluators and modern web standards.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary" id="about-cta-btn">View Products →</Link>
              <a href="https://github.com/AshieqAhamed27/shopwave-catalog" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub Repo</a>
            </div>
          </div>

          {/* Visual */}
          <div className="about-visual">
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(244,114,182,0.1) 50%, rgba(34,211,238,0.08) 100%)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <div>⚡</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginTop: '0.5rem', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  ShopWave
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Full-Stack Project</div>
              </div>
              <div className="about-floating-card">
                <div className="about-float-value">4.8★</div>
                <div className="about-float-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <section className="section">
          <div className="section-header">
            <span className="section-label">Tech Stack</span>
            <h2 className="section-title">
              Built With <span className="gradient-text">Modern Tools</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '⚛️', name: 'React 19', desc: 'UI Library' },
              { icon: '⚡', name: 'Vite 8', desc: 'Build Tool' },
              { icon: '🚀', name: 'Node & Express', desc: 'REST API' },
              { icon: '🔀', name: 'React Router', desc: 'Client Routing' },
              { icon: '🎨', name: 'Vanilla CSS', desc: 'Design System' },
              { icon: '🧩', name: 'Context API', desc: 'State Mgmt' },
              { icon: '☁️', name: 'Render', desc: 'Live Deployment' },
            ].map((tech, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  transition: 'var(--transition-smooth)',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,99,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{tech.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{tech.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About This Product */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <span className="section-label">Product Capabilities</span>
            <h2 className="section-title">About This <span className="gradient-text">Product</span></h2>
            <p className="section-subtitle">
              ShopWave is engineered as an ultra-fast, responsive, and feature-rich full-stack e-commerce catalog platform.
            </p>
          </div>
          <div className="values-grid">
            {productHighlights.map((item, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{item.icon}</div>
                <h3 className="value-title">{item.title}</h3>
                <p className="value-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our <span className="gradient-text">Core Values</span></h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ paddingBottom: '5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(34,211,238,0.06))',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem',
            textAlign: 'center',
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Ready to <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Start Shopping?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
              Explore our curated collections and find your next favorite product.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg" id="about-bottom-cta">
              Explore Products →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
