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
              Founded in Florence, Italy, in 1921, Gucci is one of the world's leading luxury fashion brands,
              redefining luxury while celebrating creativity and Italian craftsmanship.
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
              Client Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Complimentary Delivery</Link>
              <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Book an Appointment</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Order Tracking & Returns</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Product Care & Maintenance</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Certificate of Authenticity</Link>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              Creations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <Link to="/products?category=handbags" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Handbags & Leather</Link>
              <Link to="/products?category=shoes" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Shoes & 1953 Loafers</Link>
              <Link to="/products?category=apparel" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Ready-to-Wear</Link>
              <Link to="/products?category=accessories" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Jewelry & Watches</Link>
              <Link to="/products?category=beauty" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Fragrances & Beauty</Link>
            </div>
          </div>

          {/* The House */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              The House
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Gucci Garden in Florence</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Gucci Equilibrium (Sustainability)</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Careers at Kering</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Legal Information & Privacy</Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.74rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          <span>© 2024 Guccio Gucci S.p.A. — All rights reserved. G U C C I ®</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>TERMS OF SALE</span>
            <span>PRIVACY & COOKIES</span>
            <span>CORPORATE INFORMATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
