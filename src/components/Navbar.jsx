import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, user, logout } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="gucci-nav-header">
      {/* Top Luxury Announcement Bar */}
      <div className="gucci-top-bar">
        <div className="container bar-content">
          <span className="gucci-bar-tag">GUCCI ATELIER</span>
          <span className="gucci-bar-text">
            COMPLIMENTARY EXPRESS DELIVERY & SIGNATURE GIFT PACKAGING ON ALL CREATIONS
          </span>
          <Link to="/products" className="gucci-bar-link">DISCOVER NEW ARRIVALS</Link>
        </div>
      </div>

      <nav className={`gucci-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner-wrap">
          {/* Gucci Brand Logo */}
          <Link to="/" className="nav-brand-link" style={{ textDecoration: 'none' }}>
            <BrandLogo size="md" />
          </Link>

          {/* Luxury Department Links */}
          <div className="gucci-nav-links">
            <NavLink to="/products" end className={({ isActive }) => `gucci-nav-link${isActive ? ' active' : ''}`}>
              ALL CREATIONS
            </NavLink>
            <NavLink to="/products?category=handbags" className={({ isActive }) => `gucci-nav-link${isActive ? ' active' : ''}`}>
              HANDBAGS
            </NavLink>
            <NavLink to="/products?category=shoes" className={({ isActive }) => `gucci-nav-link${isActive ? ' active' : ''}`}>
              SHOES
            </NavLink>
            <NavLink to="/products?category=apparel" className={({ isActive }) => `gucci-nav-link${isActive ? ' active' : ''}`}>
              READY-TO-WEAR
            </NavLink>
            <NavLink to="/products?category=accessories" className={({ isActive }) => `gucci-nav-link${isActive ? ' active' : ''}`}>
              JEWELRY & ACCESSORIES
            </NavLink>
            <NavLink to="/products?category=beauty" className={({ isActive }) => `gucci-nav-link${isActive ? ' active' : ''}`}>
              BEAUTY
            </NavLink>
          </div>

          {/* Right Action Icons */}
          <div className="gucci-nav-actions">
            {/* My Gucci Account */}
            {user ? (
              <div className="gucci-account-dropdown-wrap">
                <button
                  type="button"
                  className="gucci-account-btn logged-in"
                  onClick={() => setUserDropdown(!userDropdown)}
                  title="My Gucci Profile"
                >
                  <span className="account-initials">{user.avatar || 'GC'}</span>
                  <span className="account-label">{user.name.split(' ')[0]}</span>
                </button>

                {userDropdown && (
                  <div className="gucci-account-menu" onMouseLeave={() => setUserDropdown(false)}>
                    <div className="menu-header">
                      <p className="menu-name">{user.name}</p>
                      <span className="menu-tier">GUCCI PRIVILEGE CLIENT</span>
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
              <Link to="/login" className="gucci-account-btn" title="Sign In to My Gucci">
                <span className="account-icon">👤</span>
                <span className="account-text">SIGN IN</span>
              </Link>
            )}

            {/* Saved Items */}
            <NavLink to="/wishlist" className="gucci-action-icon" title="Saved Items">
              <span className="icon-symbol">♡</span>
              {wishlist.length > 0 && <span className="gucci-badge">{wishlist.length}</span>}
            </NavLink>

            {/* Shopping Bag */}
            <button
              type="button"
              className="gucci-action-icon bag-btn"
              onClick={() => setCartOpen(true)}
              title="Shopping Bag"
            >
              <span className="icon-symbol">🛍</span>
              {cartCount > 0 && <span className="gucci-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
