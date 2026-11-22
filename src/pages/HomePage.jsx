import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products, formatPrice, renderStars } from '../data/products';
import ProductCard from '../components/ProductCard';

const featuredCategories = [
  { id: 'electronics', label: 'Electronics', icon: '⚡', desc: 'Cutting-edge gadgets', color: '#6c63ff' },
  { id: 'fashion', label: 'Fashion', icon: '👗', desc: 'Style redefined', color: '#f472b6' },
  { id: 'home', label: 'Home & Living', icon: '🏠', desc: 'Comfort & style', color: '#22d3ee' },
  { id: 'sports', label: 'Sports', icon: '🏋️', desc: 'Push your limits', color: '#34d399' },
  { id: 'beauty', label: 'Beauty', icon: '✨', desc: 'Glow naturally', color: '#fb923c' },
];

export default function HomePage() {
  const { addToCart } = useShop();
  const featured = products.filter(p => p.badge === 'hot' || p.badge === 'sale').slice(0, 4);
  const newest = products.filter(p => p.badge === 'new');

  return (
    <main className="page">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient-orb orb-1"></div>
          <div className="hero-gradient-orb orb-2"></div>
          <div className="hero-gradient-orb orb-3"></div>
          <div className="hero-grid-bg"></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem' }}>
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot"></span>
              Now Live — Premium Collection 2024
            </div>

            <h1 className="hero-title">
              Discover Products<br />
              <span className="word-gradient">That Define You</span>
            </h1>

            <p className="hero-description">
              ShopWave curates the finest electronics, fashion, home decor, sports gear,
              and beauty essentials — all in one beautifully designed catalog. Find your
              next favorite thing.
            </p>

            <div className="hero-cta">
              <Link to="/products" className="btn btn-primary btn-lg" id="hero-shop-btn">
                Explore Products →
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg" id="hero-about-btn">
                Our Story
              </Link>
            </div>

            <div className="hero-stats">
              {[
                { value: '12,000+', label: 'Happy Customers' },
                { value: '500+', label: 'Premium Products' },
                { value: '4.8★', label: 'Average Rating' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Collections</span>
            <h2 className="section-title">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="section-subtitle">
              Handpicked collections across every lifestyle. Dive into the world of premium products.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {featuredCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="card"
                id={`category-${cat.id}`}
                style={{
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 56, height: 56,
                  borderRadius: '14px',
                  background: `${cat.color}20`,
                  border: `1px solid ${cat.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 1rem',
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                  {cat.label}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">🔥 Trending</span>
            <h2 className="section-title">
              <span className="gradient-text">Featured</span> Products
            </h2>
            <p className="section-subtitle">
              Our most loved products right now. Bestsellers, flash deals, and fan favorites.
            </p>
          </div>
          <div className="products-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/products" className="btn btn-outline" id="view-all-featured-btn">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(244,114,182,0.08) 100%)',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, background: 'var(--accent-primary)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.1 }}></div>
            <div>
              <span className="section-label" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Limited Time</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                Up to <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>40% OFF</span> on Sale Items
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Don't miss our biggest sale of the season. Limited stock, unlimited style.
              </p>
            </div>
            <Link to="/products?badge=sale" className="btn btn-primary btn-lg" id="promo-shop-btn" style={{ flexShrink: 0 }}>
              Shop the Sale →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">✨ Just Dropped</span>
            <h2 className="section-title">
              <span className="gradient-text">New Arrivals</span>
            </h2>
            <p className="section-subtitle">Fresh picks that just landed. Be the first to own them.</p>
          </div>
          <div className="products-grid">
            {newest.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹999' },
              { icon: '↩️', title: '30-Day Returns', desc: 'Hassle-free returns' },
              { icon: '🔒', title: 'Secure Payments', desc: 'SSL encrypted checkout' },
              { icon: '💬', title: '24/7 Support', desc: 'Always here to help' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.25rem', background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
              }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.15rem' }}>{f.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
