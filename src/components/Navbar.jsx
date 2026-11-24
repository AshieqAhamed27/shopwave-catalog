import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
        <BrandLogo size="md" />
      </Link>

      {/* Links */}
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Products</NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Wishlist</NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
      </div>

      {/* Actions */}
      <div className="nav-actions">
        <NavLink to="/wishlist" className="nav-icon-btn" id="nav-wishlist-btn" title="Wishlist">
          ♥
          {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
        </NavLink>
        <button
          className="nav-icon-btn"
          id="nav-cart-btn"
          title="Open cart"
          onClick={() => setCartOpen(true)}
        >
          🛒
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
