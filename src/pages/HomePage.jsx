import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products, formatPrice, renderStars } from '../data/products';
import ProductCard from '../components/ProductCard';

const featuredCategories = [
  { id: 'sneakers', label: 'Sneakers & Footwear', icon: '👟', desc: 'Samba, Gazelle & Ultraboost', color: '#6c63ff' },
  { id: 'apparel', label: 'Luxury Apparel', icon: '🧥', desc: 'Firebird Tracksuits & Hoodies', color: '#f472b6' },
  { id: 'originals', label: 'Adidas Originals', icon: '⚡', desc: 'Timeless 3-Stripes Heritage', color: '#22d3ee' },
  { id: 'performance', label: 'Performance & Sport', icon: '🏃', desc: 'Boost, Aeroready & Football', color: '#34d399' },
  { id: 'accessories', label: 'Bags & Accessories', icon: '🎒', desc: 'Stella McCartney Bags & Gear', color: '#fb923c' },
];

export default function HomePage() {
  const { user } = useShop();
  const featured = products.filter(p => p.badge === 'hot' || p.badge === 'limited').slice(0, 4);
  const newest = products.filter(p => p.badge === 'new' || p.category === 'sneakers').slice(0, 4);

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
              <span className="three-stripes-accent">///</span>
              {user ? `WELCOME BACK, ${user.name.toUpperCase()} (ADICLUB LEVEL 3)` : 'BECOME AN ADICLUB MEMBER — GET 15% OFF'}
            </div>

            <h1 className="hero-title">
              YOU GOT THIS.<br />
              <span className="word-gradient">ORIGINALS & LUXURY SPORT</span>
            </h1>

            <p className="hero-description">
              Step into the world of iconic terrace heritage, cutting-edge Ultraboost engineering,
              and luxury Y-3 Yohji Yamamoto collaborations. Designed for champions on and off the street.
            </p>

            <div className="hero-cta">
              <Link to="/products" className="btn btn-primary btn-lg" id="hero-shop-btn">
                Explore The Collection →
              </Link>
              {!user && (
                <Link to="/login" className="btn btn-outline btn-lg" id="hero-adiclub-btn">
                  Join adiClub (15% Off)
                </Link>
              )}
            </div>

            <div className="hero-stats">
              {[
                { value: '100% Authentic', label: 'Official Heritage Gear' },
                { value: 'Free Delivery', label: 'For All adiClub Members' },
                { value: '4.9★', label: 'Customer Satisfaction' },
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

      {/* ===== ADICLUB MEMBER STRIP ===== */}
      <section className="adiclub-member-strip">
        <div className="container strip-content">
          <div className="strip-text-col">
            <span className="strip-badge">ADICLUB EXCLUSIVE</span>
            <h3 className="strip-title">EARN POINTS. UNLOCK SNEAKER DROPS. GET 15% OFF.</h3>
            <p className="strip-desc">Join millions of creators worldwide. Earn 10 points for every ₹100 spent and access exclusive drops.</p>
          </div>
          <Link to="/login" className="strip-btn">
            {user ? 'VIEW MEMBER PERKS →' : 'SIGN UP FOR FREE →'}
          </Link>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Iconic Collections</span>
            <h2 className="section-title">
              Shop by <span className="gradient-text">Division</span>
            </h2>
            <p className="section-subtitle">
              From archival terrace sneakers to avant-garde luxury sportswear collaborations.
            </p>
          </div>

          <div className="categories-grid">
            {featuredCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="category-card"
                id={`cat-${cat.id}`}
                style={{ '--accent': cat.color }}
              >
                <div className="category-icon" style={{ background: `${cat.color}20`, color: cat.color }}>
                  {cat.icon}
                </div>
                <h3 className="category-name">{cat.label}</h3>
                <p className="category-desc">{cat.desc}</p>
                <span className="category-arrow" style={{ color: cat.color }}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Hype Releases</span>
            <h2 className="section-title">
              Featured <span className="gradient-text">Sneakers & Apparel</span>
            </h2>
            <p className="section-subtitle">The most coveted icons of the season — Samba OG, Ultraboost Light & Y-3.</p>
          </div>

          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/products" className="btn btn-outline btn-lg">
              View All 36 Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(108, 99, 255, 0.04), transparent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Just Landed</span>
            <h2 className="section-title">
              New <span className="gradient-text">Arrivals</span>
            </h2>
            <p className="section-subtitle">Fresh silhouettes straight from the design archives and Parisian runways.</p>
          </div>

          <div className="products-grid">
            {newest.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND PROMISE ===== */}
      <section className="section" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="features-grid">
            {[
              { icon: '👟', title: '100% Authentic Originals', desc: 'Direct from heritage design vaults with verified craftsmanship certification.' },
              { icon: '🚚', title: 'Free Express Shipping', desc: 'Doorstep dispatch with live GPS tracking on all adiClub member orders.' },
              { icon: '🔄', title: '30-Day Hassle-Free Returns', desc: 'Complimentary doorstep return pickups and instant refunds.' },
              { icon: '⚡', title: 'adiClub Member Rewards', desc: 'Accumulate points, unlock VIP access to sneaker drops, and exclusive events.' },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
