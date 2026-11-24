import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function LoginPage() {
  const { user, login, logout, addToast } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('unisex');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Return to previous page or home after login
  const redirectPath = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password.', 'error');
      return;
    }
    const displayName = tab === 'register' && name ? name : email.split('@')[0];
    login({
      name: displayName,
      email: email,
      avatar: displayName.substring(0, 2).toUpperCase()
    });
    navigate(redirectPath);
  };

  const handleDemoLogin = () => {
    login({
      name: 'Ashieq Ahamed',
      email: 'ashieq@adiclub.in',
      phone: '+91 98765 43210',
      tier: 'adiClub Level 3',
      points: 3450,
      avatar: 'AA'
    });
    navigate(redirectPath);
  };

  // If already logged in, show account summary view
  if (user) {
    return (
      <main className="page login-page-wrap">
        <div className="container" style={{ maxWidth: '640px', padding: '4rem 1.5rem' }}>
          <div className="adiclub-profile-card">
            <div className="adiclub-card-header">
              <div className="user-avatar-lg">{user.avatar || 'AA'}</div>
              <div>
                <span className="membership-pill">⚡ {user.tier}</span>
                <h1 className="adiclub-user-name">{user.name}</h1>
                <p className="adiclub-user-email">{user.email}</p>
              </div>
            </div>

            <div className="adiclub-stats-grid">
              <div className="adiclub-stat-box">
                <span className="stat-label">adiClub Points</span>
                <span className="stat-value">{user.points?.toLocaleString() || '3,450'} pts</span>
                <span className="stat-sub">Spend to redeem rewards</span>
              </div>
              <div className="adiclub-stat-box">
                <span className="stat-label">Member Tier</span>
                <span className="stat-value">{user.tier}</span>
                <span className="stat-sub">Free express shipping active</span>
              </div>
            </div>

            <div className="adiclub-benefits-list">
              <h3 className="benefits-heading">Active Member Privileges</h3>
              <div className="benefit-row">
                <span className="benefit-check">✓</span>
                <span><strong>15% Off Voucher</strong> applied on next sneaker drop</span>
              </div>
              <div className="benefit-row">
                <span className="benefit-check">✓</span>
                <span><strong>Free Express Delivery</strong> on all orders</span>
              </div>
              <div className="benefit-row">
                <span className="benefit-check">✓</span>
                <span><strong>Hype Sneaker Priority Access</strong> (Samba OG, Ultraboost, Y-3)</span>
              </div>
              <div className="benefit-row">
                <span className="benefit-check">✓</span>
                <span><strong>30-Day Hassle-Free Returns</strong> with home pickup</span>
              </div>
            </div>

            <div className="adiclub-actions-row">
              <Link to="/products" className="btn-adidas-solid">Shop New Arrivals →</Link>
              <button onClick={logout} className="btn-adidas-outline">Sign Out</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page login-page-wrap">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Account / adiClub</span>
        </nav>

        <div className="adiclub-login-grid">
          {/* Left Column: Adidas adiClub Editorial Hero & Member Benefits */}
          <div className="adiclub-hero-column">
            <div className="adiclub-brand-tagline">
              <span className="three-stripes-accent">///</span>
              <span>ADIDAS LUXURY CLUB</span>
            </div>

            <h1 className="adiclub-hero-title">
              BECOME A MEMBER. <br />
              <span className="gradient-text-gold">GET 15% OFF.</span>
            </h1>

            <p className="adiclub-hero-desc">
              Join adiClub today to unlock the best of Adidas — limited sneaker drops,
              exclusive member events, points on every purchase, and free shipping.
            </p>

            <div className="adiclub-perks-container">
              <div className="adiclub-perk-item">
                <div className="perk-icon-box">⚡</div>
                <div>
                  <h4 className="perk-title">15% Welcome Voucher</h4>
                  <p className="perk-desc">Get an instant 15% discount code applied directly to your first order.</p>
                </div>
              </div>

              <div className="adiclub-perk-item">
                <div className="perk-icon-box">👟</div>
                <div>
                  <h4 className="perk-title">Exclusive Sneaker Drops</h4>
                  <p className="perk-desc">Priority raffle access to limited Samba, Gazelle, Y-3, and Stella McCartney drops.</p>
                </div>
              </div>

              <div className="adiclub-perk-item">
                <div className="perk-icon-box">🚚</div>
                <div>
                  <h4 className="perk-title">Free Express Delivery</h4>
                  <p className="perk-desc">Enjoy free standard and express doorstep shipping on every single order.</p>
                </div>
              </div>

              <div className="adiclub-perk-item">
                <div className="perk-icon-box">⭐</div>
                <div>
                  <h4 className="perk-title">Earn Points & Unlock Tiers</h4>
                  <p className="perk-desc">Earn 10 adiClub points for every ₹100 spent and unlock VIP experiences.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Form */}
          <div className="adiclub-form-column">
            <div className="adiclub-auth-box">
              {/* Tab Switcher */}
              <div className="auth-tab-switch">
                <button
                  type="button"
                  className={`auth-tab-btn${tab === 'login' ? ' active' : ''}`}
                  onClick={() => setTab('login')}
                >
                  LOG IN
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn${tab === 'register' ? ' active' : ''}`}
                  onClick={() => setTab('register')}
                >
                  JOIN ADICLUB
                </button>
              </div>

              {/* Quick Demo Login Pill (Convenience) */}
              <div className="demo-login-banner">
                <div className="demo-login-info">
                  <span className="demo-badge">QUICK DEMO</span>
                  <span className="demo-text">Explore with pre-configured Level 3 Member account</span>
                </div>
                <button
                  type="button"
                  className="btn-demo-quick"
                  onClick={handleDemoLogin}
                  title="One-click login without typing"
                >
                  ⚡ One-Click Login
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="adiclub-form">
                {tab === 'register' && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-name">Full Name *</label>
                    <input
                      id="register-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Ashieq Ahamed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="auth-email">Email Address or Phone *</label>
                  <input
                    id="auth-email"
                    type="text"
                    className="form-input"
                    placeholder="name@example.com / +91..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label className="form-label" htmlFor="auth-password">Password *</label>
                    {tab === 'login' && (
                      <button
                        type="button"
                        className="form-link-btn"
                        onClick={() => addToast('Password reset link sent to your email!', 'info')}
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="password-input-wrap">
                    <input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? '👁' : '👁‍🗨'}
                    </button>
                  </div>
                </div>

                {tab === 'register' && (
                  <div className="form-group">
                    <label className="form-label">Shopping Preference</label>
                    <div className="gender-options">
                      {['Men', 'Women', 'Unisex'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={`gender-chip${gender === g.toLowerCase() ? ' active' : ''}`}
                          onClick={() => setGender(g.toLowerCase())}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keep Signed In */}
                <div className="form-checkbox-row">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkbox-checkmark"></span>
                    <span className="checkbox-text">Keep me logged in on this device</span>
                  </label>
                </div>

                {/* Submit Button (Adidas Style Bold CTA) */}
                <button type="submit" className="btn-adidas-submit">
                  {tab === 'login' ? 'LOG IN →' : 'JOIN ADICLUB & GET 15% OFF →'}
                </button>
              </form>

              {/* Social Login Divider */}
              <div className="auth-divider">
                <span>OR CONTINUE WITH</span>
              </div>

              {/* Social Login Buttons */}
              <div className="social-auth-grid">
                <button
                  type="button"
                  className="social-auth-btn"
                  onClick={handleDemoLogin}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.7 0 3 .6 4 1.5l3-3C17.2 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z" />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="social-auth-btn"
                  onClick={handleDemoLogin}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.6.69-1.13 1.83-1 2.96 1.08.08 2.17-.49 2.83-1.31" />
                  </svg>
                  Apple
                </button>
              </div>

              {/* Disclaimer */}
              <p className="auth-terms-note">
                By signing up, you agree to the <strong>adiClub Terms & Conditions</strong> and acknowledge that you have read the <strong>Privacy Policy</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
