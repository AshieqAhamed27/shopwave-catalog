import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="nav-logo" style={{ marginBottom: '0.75rem' }}>
              <div className="nav-logo-icon">⚡</div>
              <span>ShopWave</span>
            </div>
            <p className="footer-brand-desc">
              A premium e-commerce product catalog built with React, Vite, and
              client-side routing. Showcasing modular architecture, performance
              optimization, and modern UI design.
            </p>
            <div className="footer-socials">
              {['𝕏', 'in', 'gh', 'ig'].map((s, i) => (
                <a key={i} href="#" className="social-link" aria-label={`Social ${i}`}>{s}</a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="footer-col-title">Shop</h4>
            <div className="footer-links">
              <Link to="/products" className="footer-link">All Products</Link>
              <Link to="/products?category=electronics" className="footer-link">Electronics</Link>
              <Link to="/products?category=fashion" className="footer-link">Fashion</Link>
              <Link to="/products?category=home" className="footer-link">Home & Living</Link>
              <Link to="/products?category=sports" className="footer-link">Sports</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <div className="footer-links">
              <Link to="/about" className="footer-link">About Us</Link>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Press Kit</a>
              <a href="#" className="footer-link">Blog</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-col-title">Support</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Track Order</a>
              <a href="#" className="footer-link">Returns & Refunds</a>
              <a href="#" className="footer-link">Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 ShopWave. Built as a Full-Stack Capstone Project.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span className="footer-link" style={{ fontSize: '0.78rem' }}>Internship Project — React + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
