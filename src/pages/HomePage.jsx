import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const luxuryDepartments = [
  { id: 'handbags', label: 'Handbags & Leather', desc: 'The Jackie 1961, Horsebit 1955 & GG Marmont', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
  { id: 'shoes', label: 'Shoes & Loafers', desc: 'The 1953 Horsebit Loafer & Princetown Mules', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80' },
  { id: 'apparel', label: 'Ready-to-Wear', desc: 'Tailored Wool Blazers, Silk Shirts & Cashmere', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
  { id: 'accessories', label: 'Jewelry & Accessories', desc: 'Double G Belts, Swiss Watches & 18k Gold', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80' },
  { id: 'beauty', label: 'Fragrance & Beauty', desc: 'Gucci Flora, Bloom & The Alchemist\'s Garden', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' },
];

export default function HomePage() {
  const featured = products.filter(p => p.badge === 'hot' || p.badge === 'limited').slice(0, 4);
  const newest = products.filter(p => p.badge === 'new' || p.category === 'handbags').slice(0, 4);

  return (
    <main className="page gucci-homepage">

      {/* ===== HERO CAMPAIGN ===== */}
      <section className="gucci-hero-campaign">
        <div className="gucci-hero-media-bg">
          <div className="gucci-hero-overlay"></div>
        </div>

        <div className="container gucci-hero-container">
          <div className="gucci-hero-content">
            <span className="gucci-hero-eyebrow">
              AUTUMN WINTER 2024 — FLORENCE, ITALY
            </span>

            <h1 className="gucci-hero-heading">
              AN ENDURING SENSE<br />
              <span className="gucci-heading-italic">OF DESIRE.</span>
            </h1>

            <p className="gucci-hero-subtext">
              Embrace the timeless allure of the House of Gucci. From the sculpted Jackie 1961
              to 70 years of the iconic Horsebit loafer and runway tailoring.
            </p>

            <div className="gucci-hero-cta-row">
              <Link to="/products" className="btn-gucci-solid-lg" id="hero-shop-btn">
                EXPLORE THE COLLECTION
              </Link>
              <Link to="/products?category=handbags" className="btn-gucci-outline-lg">
                DISCOVER HANDBAGS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEPARTMENTS SHOWCASE ===== */}
      <section className="gucci-section">
        <div className="container">
          <div className="gucci-section-header">
            <span className="section-eyebrow">THE ARCHIVE DEPARTMENTS</span>
            <h2 className="section-main-title">Explore by Creation</h2>
          </div>

          <div className="gucci-dept-grid">
            {luxuryDepartments.map((dept) => (
              <Link
                key={dept.id}
                to={`/products?category=${dept.id}`}
                className="gucci-dept-card"
              >
                <div className="dept-img-wrap">
                  <img src={dept.image} alt={dept.label} loading="lazy" />
                  <div className="dept-img-overlay" />
                </div>
                <div className="dept-info">
                  <h3 className="dept-title">{dept.label}</h3>
                  <p className="dept-desc">{dept.desc}</p>
                  <span className="dept-link">DISCOVER NOW →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SIGNATURE HIGHLIGHTS ===== */}
      <section className="gucci-section" style={{ background: '#090909', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="gucci-section-header">
            <span className="section-eyebrow">HERITAGE PIECES</span>
            <h2 className="section-main-title">Icons of the House</h2>
            <p className="section-sub">
              Signature silhouettes defining modern elegance across generations.
            </p>
          </div>

          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/products" className="btn-gucci-outline-lg">
              VIEW ALL 36 CREATIONS →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEW CREATIONS ===== */}
      <section className="gucci-section">
        <div className="container">
          <div className="gucci-section-header">
            <span className="section-eyebrow">FRESH FROM FLORENCE</span>
            <h2 className="section-main-title">Latest Arrivals</h2>
          </div>

          <div className="products-grid">
            {newest.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUCCI CLIENT SERVICES & HERITAGE ===== */}
      <section className="gucci-services-section">
        <div className="container">
          <div className="gucci-services-grid">
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Florentine Craftsmanship</h3>
              <p className="service-card-desc">Every piece is handcrafted by master artisans in Florence with over a century of leatherworking heritage.</p>
            </div>
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Signature Gift Packaging</h3>
              <p className="service-card-desc">All purchases arrive beautifully presented in our iconic FSC-certified green box tied with a satin ribbon.</p>
            </div>
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Complimentary Delivery</h3>
              <p className="service-card-desc">White-glove insured delivery dispatched directly to your residence with complimentary 30-day global returns.</p>
            </div>
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Client Advisory Service</h3>
              <p className="service-card-desc">Our dedicated client advisors are available to assist you with personalized styling and inquiries.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
