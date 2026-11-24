import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, user, logout } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="navbar-wrapper">
      {/* Top adiClub Member Announcement Banner */}
      <div className="adiclub-top-banner">
        <div className="container banner-inner">
          <span className="banner-badge">ADICLUB EXCLUSIVE</span>
          <span className="banner-text">
            JOIN ADICLUB & GET 15% OFF + FREE EXPRESS DELIVERY ON ALL SNEAKERS & APPAREL
          </span>
          <Link to="/login" className="banner-cta">
            {user ? 'VIEW MEMBER PERKS →' : 'JOIN FOR FREE →'}
          </Link>
        </div>
      </div>

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
          {/* User Auth Profile / Login */}
          {user ? (
            <div className="nav-user-dropdown-wrap">
              <button
                className="nav-user-profile-btn"
                onClick={() => setUserDropdown(!userDropdown)}
                title="adiClub Member Account"
              >
                <span className="user-avatar-sm">{user.avatar || 'AA'}</span>
                <span className="user-points-pill">3,450 pts</span>
              </button>

              {userDropdown && (
                <div className="nav-user-menu" onMouseLeave={() => setUserDropdown(false)}>
                  <div className="user-menu-header">
                    <p className="user-menu-name">{user.name}</p>
                    <span className="user-menu-tier">⚡ {user.tier}</span>
                  </div>
                  <div className="user-menu-divider" />
                  <Link to="/login" className="user-menu-item" onClick={() => setUserDropdown(false)}>
                    adiClub Dashboard & Perks
                  </Link>
                  <Link to="/wishlist" className="user-menu-item" onClick={() => setUserDropdown(false)}>
                    My Wishlist ({wishlist.length})
                  </Link>
                  <div className="user-menu-divider" />
                  <button
                    className="user-menu-item logout-btn"
                    onClick={() => { logout(); setUserDropdown(false); }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-login-btn" title="Log in or join adiClub">
              <span className="login-icon">👤</span>
              <span className="login-label">LOG IN</span>
            </Link>
          )}

          {/* Wishlist */}
          <NavLink to="/wishlist" className="nav-icon-btn" id="nav-wishlist-btn" title="Wishlist">
            ♥
            {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </NavLink>

          {/* Cart */}
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
    </header>
  );
}
