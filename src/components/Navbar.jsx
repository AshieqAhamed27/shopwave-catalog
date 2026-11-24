import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, user, logout } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdown(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/products', label: 'All', end: true },
    { to: '/products?category=shirts', label: 'Shirts' },
    { to: '/products?category=pants', label: 'Pants & Denim' },
    { to: '/products?category=tshirts', label: 'Tees & Polos' },
    { to: '/products?category=outerwear', label: 'Jackets' },
    { to: '/products?category=footwear', label: 'Shoes' },
    { to: '/products?category=accessories', label: 'Accessories' },
  ];

  return (
    <header className="gucci-nav-header clean-atelier-header">
      {/* Sleek Minimal Announcement Bar */}
      <div className="gucci-top-bar clean-top-bar">
        <div className="container bar-content">
          <span className="gucci-bar-tag">FREE SHIPPING OVER ₹1,999</span>
          <span className="gucci-bar-sep">•</span>
          <span className="gucci-bar-text">EASY 30-DAY DOORSTEP RETURNS</span>
          <span className="gucci-bar-sep">•</span>
          <Link to="/products" className="gucci-bar-link">EXPLORE THE EDIT →</Link>
        </div>
      </div>

      <nav className={`gucci-navbar clean-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner-wrap">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="hamburger-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>

          {/* Clean Brand Logo */}
          <Link to="/" className="nav-brand-link" style={{ textDecoration: 'none' }}>
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Clean Category Links */}
          <div className="gucci-nav-links clean-nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `gucci-nav-link clean-link${isActive ? ' active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Clean Action Icons */}
          <div className="gucci-nav-actions clean-actions">
            {/* Direct Search Link */}
            <Link to="/products" className="clean-search-btn" title="Search products" aria-label="Search">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>

            {/* User Account / Profile */}
            {user ? (
              <div className="gucci-account-dropdown-wrap">
                <button
                  type="button"
                  className="gucci-account-btn logged-in clean-account-btn"
                  onClick={() => setUserDropdown(!userDropdown)}
                  title="My Atelier Profile"
                >
                  <span className="account-initials">{user.avatar || 'SW'}</span>
                  <span className="account-label">{user.name.split(' ')[0]}</span>
                </button>

                {userDropdown && (
                  <div className="gucci-account-menu" onMouseLeave={() => setUserDropdown(false)}>
                    <div className="menu-header">
                      <p className="menu-name">{user.name}</p>
                      <span className="menu-tier">ATELIER PRIVILEGE MEMBER</span>
                    </div>
                    <div className="menu-sep" />
                    <Link to="/login" className="menu-link" onClick={() => setUserDropdown(false)}>
                      My Profile & Orders
                    </Link>
                    <Link to="/wishlist" className="menu-link" onClick={() => setUserDropdown(false)}>
                      Saved Items ({wishlist.length})
                    </Link>
                    <div className="menu-sep" />
                    <button
                      type="button"
                      className="menu-link logout"
                      onClick={() => { logout(); setUserDropdown(false); }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="gucci-account-btn clean-signin-btn" title="Sign In to ShopWave Atelier">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="account-text">SIGN IN</span>
              </Link>
            )}

            {/* Saved Items (Wishlist) */}
            <NavLink to="/wishlist" className="gucci-action-icon clean-icon-btn" title="Saved Items" aria-label="Saved items">
              <svg width="19" height="19" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlist.length > 0 && <span className="gucci-badge">{wishlist.length}</span>}
            </NavLink>

            {/* Shopping Bag */}
            <button
              type="button"
              className="gucci-action-icon bag-btn clean-icon-btn"
              onClick={() => setCartOpen(true)}
              title="Shopping Bag"
              aria-label="Shopping bag"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className="gucci-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="container mobile-nav-inner">
              <div className="mobile-nav-list">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className="mobile-nav-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="mobile-arrow">→</span>
                  </NavLink>
                ))}
              </div>
              <div className="mobile-nav-footer">
                {user ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#ffffff' }}>Signed in as {user.name}</span>
                    <button type="button" onClick={logout} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.82rem', cursor: 'pointer' }}>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="btn-gucci-solid-lg" style={{ display: 'block', textAlign: 'center', width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
                    SIGN IN / REGISTER
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
