import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="gucci-footer" style={{ background: '#070707', borderTop: '1px solid var(--border-subtle)', padding: '5rem 0 2.5rem' }}>
      <div className="container">
        <div className="gucci-footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.2fr', gap: '3.5rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <BrandLogo size="lg" />
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-muted)', maxWidth: '340px' }}>
              ShopWave Atelier designs enduring wardrobe essentials crafted from the world&apos;s finest natural fibers.
              Every shirt, pant, and jacket is engineered for timeless versatility, comfort, and precision tailoring.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {['Instagram', 'YouTube', 'Facebook', 'Twitter'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: 'var(--gold-primary)',
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Client Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Customer Care
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Complimentary Delivery</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Track Your Order</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Easy 30-Day Returns</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Fabric Care & Sizing Guide</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Authenticity & Quality Pledge</Link>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Categories
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <Link to="/products?category=shirts" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Shirts & Tops</Link>
              <Link to="/products?category=pants" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Pants & Selvedge Denim</Link>
              <Link to="/products?category=tshirts" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tees & Knitwear</Link>
              <Link to="/products?category=outerwear" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Jackets & Blazers</Link>
              <Link to="/products?category=footwear" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Shoes & Sneakers</Link>
              <Link to="/products?category=accessories" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Bags & Belts</Link>
            </div>
          </div>

          {/* The Atelier */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              The Atelier
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Our Design Philosophy</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Sustainable Mills & Ethical Sourcing</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Store Locations</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy & Terms</Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          <span>© 2024 SHOPWAVE ATELIER — All rights reserved. MODERN ESSENTIALS ®</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>TERMS OF SALE</span>
            <span>PRIVACY POLICY</span>
            <span>SHIPPING & RETURNS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
