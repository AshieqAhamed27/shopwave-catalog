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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const redirectPath = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please provide both your email and password.', 'error');
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
      email: 'ashieq@shopwave.in',
      tier: 'Atelier Privilege Member',
      points: 4250,
      avatar: 'AA'
    });
    navigate(redirectPath);
  };

  // Logged In Dashboard
  if (user) {
    return (
      <main className="page gucci-account-page">
        <div className="container" style={{ maxWidth: '680px', padding: '5rem 1.5rem' }}>
          <div className="gucci-account-card">
            <div className="account-card-header">
              <div className="account-avatar-lg">{user.avatar || 'SW'}</div>
              <div>
                <span className="account-tier-badge">✦ ATELIER PRIVILEGE MEMBER</span>
                <h1 className="account-welcome-name">Welcome, {user.name}</h1>
                <p className="account-welcome-email">{user.email}</p>
              </div>
            </div>

            <div className="account-privileges-grid">
              <div className="privilege-box">
                <span className="privilege-k">Membership Status</span>
                <span className="privilege-v">VIP Patron</span>
                <span className="privilege-sub">Complimentary Express Shipping</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Return Window</span>
                <span className="privilege-v">30 Days</span>
                <span className="privilege-sub">Free Doorstep Pickup</span>
              </div>
            </div>

            <div className="account-services-list">
              <h3 className="services-heading">Your Atelier Privileges</h3>
              <div className="service-item">
                <span className="gold-check">✓</span>
                <span><strong>Free Express Delivery</strong> on all orders with no minimum threshold</span>
              </div>
              <div className="service-item">
                <span className="gold-check">✓</span>
                <span><strong>Instant 1-Click Checkout</strong> with saved shipping addresses</span>
              </div>
              <div className="service-item">
                <span className="gold-check">✓</span>
                <span><strong>Early Access to Limited Drops</strong> & seasonal linen & wool releases</span>
              </div>
            </div>

            <div className="account-actions-row">
              <Link to="/products" className="btn-gucci-solid-lg">Explore Apparel Catalog →</Link>
              <button type="button" onClick={logout} className="btn-gucci-outline-lg" style={{ borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page gucci-account-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="gucci-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">SHOPWAVE ATELIER</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">ACCOUNT LOGIN</span>
        </nav>

        <div className="gucci-auth-grid">
          {/* Left Column: Brand Story & Client Privileges */}
          <div className="gucci-auth-editorial">
            <span className="editorial-crest">✦ MODERN ESSENTIALS</span>
            <h1 className="editorial-title">
              SHOPWAVE ATELIER<br />
              <span className="editorial-sub">MEMBER PORTAL</span>
            </h1>

            <p className="editorial-desc">
              Sign in to manage your orders, track deliveries in real time, save favorite styles
              to your wishlist, and enjoy complimentary express delivery.
            </p>

            <div className="editorial-perks">
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Express Order Tracking</h4>
                  <p className="perk-p">Real-time status updates with SMS & email dispatch notifications.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Fast 30-Day Doorstep Returns</h4>
                  <p className="perk-p">One-click return initiation with hassle-free doorstep pickup across India.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Member Exclusive Previews</h4>
                  <p className="perk-p">Priority access to new shirt cuts, selvedge denim restocks, and seasonal capsule edits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fashion Form */}
          <div className="gucci-auth-form-wrap">
            <div className="gucci-form-box">
              {/* Tab Switcher */}
              <div className="gucci-tab-switch">
                <button
                  type="button"
                  className={`gucci-tab-btn${tab === 'login' ? ' active' : ''}`}
                  onClick={() => setTab('login')}
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  className={`gucci-tab-btn${tab === 'register' ? ' active' : ''}`}
                  onClick={() => setTab('register')}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              {/* One-Click Quick Demo Login */}
              <div className="gucci-demo-login-bar">
                <div className="demo-info">
                  <span className="demo-badge">ONE-CLICK DEMO ACCESS</span>
                  <span className="demo-sub">Sign in instantly as an Atelier member</span>
                </div>
                <button
                  type="button"
                  className="btn-gucci-gold-sm"
                  onClick={handleDemoLogin}
                >
                  ⚡ One-Click Sign In
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="gucci-auth-form">
                {tab === 'register' && (
                  <div className="gucci-input-group">
                    <label className="gucci-input-label" htmlFor="auth-name">FULL NAME</label>
                    <input
                      id="auth-name"
                      type="text"
                      className="gucci-text-input"
                      placeholder="e.g. Ashieq Ahamed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="gucci-input-group">
                  <label className="gucci-input-label" htmlFor="auth-email">EMAIL ADDRESS</label>
                  <input
                    id="auth-email"
                    type="email"
                    className="gucci-text-input"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="gucci-input-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="gucci-input-label" htmlFor="auth-password" style={{ margin: 0 }}>PASSWORD</label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="gucci-show-pwd-btn"
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    className="gucci-text-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="gucci-form-options">
                  <label className="gucci-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember my preferences</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast('Password reset link sent to your email.', 'info'); }} className="gucci-forgot-link">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn-gucci-solid-lg"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {tab === 'login' ? 'SIGN IN TO ATELIER' : 'CREATE ATELIER ACCOUNT'}
                </button>
              </form>

              {/* Bottom Guarantee */}
              <div className="gucci-form-footer">
                <span className="lock-icon">🔒</span>
                <span>256-Bit Encrypted Secure Member Portal • Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
