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
      email: 'ashieq@gucci.com',
      tier: 'Gucci Privilege Client',
      points: 5800,
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
              <div className="account-avatar-lg">{user.avatar || 'GC'}</div>
              <div>
                <span className="account-tier-badge">✦ GUCCI PRIVILEGE CLIENT</span>
                <h1 className="account-welcome-name">Welcome, {user.name}</h1>
                <p className="account-welcome-email">{user.email}</p>
              </div>
            </div>

            <div className="account-privileges-grid">
              <div className="privilege-box">
                <span className="privilege-k">Client Status</span>
                <span className="privilege-v">VIP Member</span>
                <span className="privilege-sub">Private Client Advisor Active</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Delivery Privileges</span>
                <span className="privilege-v">White-Glove</span>
                <span className="privilege-sub">Complimentary Worldwide</span>
              </div>
            </div>

            <div className="account-services-list">
              <h3 className="services-heading">Your Exclusive Services</h3>
              <div className="service-item">
                <span className="gold-check">✓</span>
                <span><strong>Priority Atelier Appointments</strong> at flagship boutiques worldwide</span>
              </div>
              <div className="service-item">
                <span className="gold-check">✓</span>
                <span><strong>Complimentary Monogramming & Embossing</strong> on leather creations</span>
              </div>
              <div className="service-item">
                <span className="gold-check">✓</span>
                <span><strong>Early Preview Access</strong> to seasonal Runway collections</span>
              </div>
            </div>

            <div className="account-actions-row">
              <Link to="/products" className="btn-gucci-solid-lg">Discover Collections →</Link>
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
          <Link to="/">GUCCI</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">MY GUCCI ACCOUNT</span>
        </nav>

        <div className="gucci-auth-grid">
          {/* Left Column: Brand Story & Client Privileges */}
          <div className="gucci-auth-editorial">
            <span className="editorial-crest">✦ FIRENZE 1921</span>
            <h1 className="editorial-title">
              MY GUCCI<br />
              <span className="editorial-sub">CLIENT PORTAL</span>
            </h1>

            <p className="editorial-desc">
              Sign in to manage your appointments, track your bespoke orders, save creations
              to your private wishlist, and receive invitations to private previews.
            </p>

            <div className="editorial-perks">
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Personalized Styling</h4>
                  <p className="perk-p">Connect directly with dedicated House advisors for tailored wardrobe curation.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Order Archiving & Tracking</h4>
                  <p className="perk-p">View real-time insured delivery milestones and authenticated receipts.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Archival Previews</h4>
                  <p className="perk-p">Gain priority invitations to limited leather drops and runway trunk shows.</p>
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
                  <span className="demo-badge">PRIVILEGE CLIENT ACCESS</span>
                  <span className="demo-sub">Explore with pre-authenticated client profile</span>
                </div>
                <button
                  type="button"
                  className="btn-gucci-gold-sm"
                  onClick={handleDemoLogin}
                  title="One-click access"
                >
                  ⚡ One-Click Sign In
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="gucci-form">
                {tab === 'register' && (
                  <div className="gucci-field-group">
                    <label className="gucci-label" htmlFor="reg-name">TITLE & FULL NAME *</label>
                    <input
                      id="reg-name"
                      type="text"
                      className="gucci-input"
                      placeholder="e.g. Ashieq Ahamed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="gucci-field-group">
                  <label className="gucci-label" htmlFor="auth-email">EMAIL ADDRESS *</label>
                  <input
                    id="auth-email"
                    type="text"
                    className="gucci-input"
                    placeholder="client@gucci.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="gucci-field-group">
                  <div className="gucci-label-row">
                    <label className="gucci-label" htmlFor="auth-password">PASSWORD *</label>
                    {tab === 'login' && (
                      <button
                        type="button"
                        className="gucci-forgot-btn"
                        onClick={() => addToast('Reset instructions sent to your email.', 'info')}
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="gucci-password-wrap">
                    <input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      className="gucci-input"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="gucci-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password"
                    >
                      {showPassword ? '👁' : '👁‍🗨'}
                    </button>
                  </div>
                </div>

                <div className="gucci-remember-row">
                  <label className="gucci-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember my credentials securely</span>
                  </label>
                </div>

                <button type="submit" className="btn-gucci-solid-lg" style={{ marginTop: '0.75rem' }}>
                  {tab === 'login' ? 'SIGN IN TO MY GUCCI' : 'CREATE MY ACCOUNT'}
                </button>
              </form>

              {/* Social Login Options */}
              <div className="gucci-divider">
                <span>OR SIGN IN WITH</span>
              </div>

              <div className="gucci-social-grid">
                <button
                  type="button"
                  className="gucci-social-btn"
                  onClick={handleDemoLogin}
                >
                  Google
                </button>
                <button
                  type="button"
                  className="gucci-social-btn"
                  onClick={handleDemoLogin}
                >
                  Apple
                </button>
              </div>

              <p className="gucci-disclaimer">
                By entering, you confirm your acceptance of Gucci's <strong>Terms of Service</strong> and <strong>Privacy Code</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
