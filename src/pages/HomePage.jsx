import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const apparelDepartments = [
  {
    id: 'shirts',
    label: 'Shirts & Tops',
    desc: 'Pinpoint Oxford, French Linen & Spread Collar Dress Shirts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pants',
    label: 'Pants & Selvedge Denim',
    desc: 'Stretch Chinos, Pleated Dress Trousers & Raw Denim',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tshirts',
    label: 'Tees & Knitwear',
    desc: 'Heavyweight Supima Cotton Tees, Polos & Merino Sweaters',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'outerwear',
    label: 'Jackets & Blazers',
    desc: 'Unstructured Wool Blazers, Harrington Jackets & Parkas',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'footwear',
    label: 'Shoes & Sneakers',
    desc: 'Full-Grain Leather Penny Loafers, Minimal Court Sneakers',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'accessories',
    label: 'Bags & Leather Accessories',
    desc: 'Italian Leather Belts, Weekender Duffles & Automatic Watches',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  }
];

export default function HomePage() {
  const featured = products.filter(p => p.badge === 'hot' || p.badge === 'limited').slice(0, 4);
  const newest = products.filter(p => p.badge === 'new' || p.category === 'shirts').slice(0, 4);

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
              AUTUMN / WINTER 2024 • MODERN ESSENTIALS
            </span>

            <h1 className="gucci-hero-heading">
              TAILORED FOR LIFE.<br />
              <span className="gucci-heading-italic">EFFORTLESS LUXURY.</span>
            </h1>

            <p className="gucci-hero-subtext">
              Discover authentic wardrobe fundamentals refined with pinpoint precision. From long-staple
              Oxford shirts and stretch chinos to Italian leather loafers and pure merino knitwear.
            </p>

            <div className="gucci-hero-cta-row">
              <Link to="/products" className="btn-gucci-solid-lg" id="hero-shop-btn">
                SHOP THE COLLECTION
              </Link>
              <Link to="/products?category=shirts" className="btn-gucci-outline-lg">
                EXPLORE SHIRTS & TOPS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEPARTMENTS SHOWCASE ===== */}
      <section className="gucci-section">
        <div className="container">
          <div className="gucci-section-header">
            <span className="section-eyebrow">CURATED DEPARTMENTS</span>
            <h2 className="section-main-title">Shop by Category</h2>
            <p className="section-sub">
              Precision-cut apparel and handcrafted essentials engineered for modern living.
            </p>
          </div>

          <div className="gucci-dept-grid">
            {apparelDepartments.map((dept) => (
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
                  <span className="dept-link">SHOP NOW →</span>
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
            <span className="section-eyebrow">WARDROBE FOUNDATIONS</span>
            <h2 className="section-main-title">Most Loved Bestsellers</h2>
            <p className="section-sub">
              Versatile everyday silhouettes rated 4.8+ stars by over 10,000 discerning shoppers.
            </p>
          </div>

          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/products" className="btn-gucci-outline-lg">
              VIEW ALL {products.length} ESSENTIALS →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="gucci-section">
        <div className="container">
          <div className="gucci-section-header">
            <span className="section-eyebrow">FRESH SILHOUETTES</span>
            <h2 className="section-main-title">New Season Arrivals</h2>
            <p className="section-sub">
              Crisp cottons, lightweight linens, and transitional layering for the current season.
            </p>
          </div>

          <div className="products-grid">
            {newest.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOPWAVE ATELIER PROMISE & SERVICES ===== */}
      <section className="gucci-services-section">
        <div className="container">
          <div className="gucci-services-grid">
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Pure Natural Fibers</h3>
              <p className="service-card-desc">Sourced from top global mills: 100% long-staple cotton, French flax linen, and traceable merino wool.</p>
            </div>
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Tailored Modern Fit</h3>
              <p className="service-card-desc">Precision pattern-making calibrated for comfortable movement and a clean, sharp silhouette.</p>
            </div>
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Fast Express Delivery</h3>
              <p className="service-card-desc">Free shipping on orders over ₹1,999. Packaged in signature dust covers and recyclable luxury boxes.</p>
            </div>
            <div className="gucci-service-card">
              <span className="service-mark">✦</span>
              <h3 className="service-card-title">Hassle-Free 30-Day Returns</h3>
              <p className="service-card-desc">Seamless doorstep exchanges and returns with instant refunds to your original payment method.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
