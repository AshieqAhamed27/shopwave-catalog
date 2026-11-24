import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function LoginPage() {
  const { user, login, logout, orders, addToast } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState('login'); // 'login' | 'register'
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

  const handleQuickLogin = (profile) => {
    login(profile);
    addToast(`Signed in as ${profile.name} (${profile.tier}) ✨`, 'success');
  };

  // Printable Invoice from Dashboard
  const printDashboardInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to view the invoice.');
      return;
    }
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #111; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #c5a880; padding-bottom: 15px; margin-bottom: 25px; }
          .logo { font-size: 22px; font-weight: bold; color: #111; text-transform: uppercase; letter-spacing: 1px; }
          .badge { display: inline-block; padding: 4px 10px; background: #ecfdf5; color: #065f46; font-weight: bold; font-size: 11px; border-radius: 4px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border-bottom: 1px solid #e5e7eb; padding: 10px; text-align: left; }
          th { background: #111827; color: #fff; font-size: 11px; text-transform: uppercase; }
          .total-row { font-weight: bold; font-size: 15px; }
          .footer { text-align: center; color: #6b7280; font-size: 11px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">✦ SHOPWAVE ATELIER</div>
            <p style="margin: 4px 0; color: #6b7280; font-size: 12px;">Luxury Apparel & Product Catalog Platform</p>
            <p style="margin: 0; color: #6b7280; font-size: 11px;">GSTIN: 33AAACS1010P1Z1 • Chennai, Tamil Nadu</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 18px;">TAX INVOICE</h2>
            <p style="margin: 3px 0; font-size: 12px;"><strong>Order ID:</strong> ${order.id}</p>
            <p style="margin: 3px 0; font-size: 12px;">Date: ${orderDate}</p>
            <span class="badge">STATUS: ${(order.payment?.status || 'PAID').toUpperCase()}</span>
          </div>
        </div>
        <div>
          <h4 style="margin: 0 0 5px 0;">BILLED TO:</h4>
          <p style="margin: 2px 0;"><strong>${order.customer?.name || user?.name}</strong></p>
          <p style="margin: 2px 0;">${order.customer?.address || 'Chennai, Tamil Nadu'}</p>
          <p style="margin: 2px 0;">Payment: ${(order.payment?.method || 'UPI').toUpperCase()} • Txn ID: ${order.payment?.transactionId || 'TXN-RBI-9021'}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(order.items || []).map(it => `
              <tr>
                <td><strong>${it.name}</strong></td>
                <td style="text-align: center;">${it.qty || it.quantity || 1}</td>
                <td style="text-align: right;">₹${Number(it.price).toLocaleString('en-IN')}</td>
                <td style="text-align: right;">₹${((Number(it.price) || 0) * (Number(it.qty || it.quantity) || 1)).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="3" style="text-align: right;">Total Paid:</td>
              <td style="text-align: right; color: #c5a880;">₹${Number(order.pricing?.total || 0).toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <p>Project by <strong>Ashieq Ahamed S A (RRN: 230071601031)</strong> • B.S. Abdur Rahman Crescent Institute of Science and Technology.</p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 400);
  };

  // =========================================================================
  // VIEW 1: AUTHENTICATED PROFILE & ORDERS DASHBOARD
  // =========================================================================
  if (user) {
    return (
      <main className="page gucci-account-page">
        <div className="container" style={{ maxWidth: '960px', padding: '3.5rem 1.5rem' }}>
          {/* Breadcrumb */}
          <nav className="gucci-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
            <Link to="/">SHOPWAVE ATELIER</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">MEMBER DASHBOARD</span>
          </nav>

          <div className="gucci-account-card">
            {/* Header */}
            <div className="account-card-header">
              <div className="account-avatar-lg">{user.avatar || 'AA'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="account-tier-badge">✦ {user.tier || 'ATELIER PRIVILEGE MEMBER'}</span>
                  {user.rrn && (
                    <span className="account-rrn-badge">RRN: {user.rrn}</span>
                  )}
                </div>
                <h1 className="account-welcome-name">Welcome, {user.name}</h1>
                <p className="account-welcome-email">{user.email} • {user.phone || '+91 98765 43210'}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="btn-viva-logout"
                title="Sign out of current account"
              >
                Sign Out
              </button>
            </div>

            {/* Privileges Matrix */}
            <div className="account-privileges-grid">
              <div className="privilege-box">
                <span className="privilege-k">Membership Status</span>
                <span className="privilege-v">VIP Patron</span>
                <span className="privilege-sub">Complimentary Express Shipping</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Atelier Credits</span>
                <span className="privilege-v">{user.points || 4250} Pts</span>
                <span className="privilege-sub">Ready to redeem on next order</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Return Guarantee</span>
                <span className="privilege-v">30 Days</span>
                <span className="privilege-sub">Free Doorstep Pickup across India</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Security Tier</span>
                <span className="privilege-v">2FA Active</span>
                <span className="privilege-sub">256-Bit SSL Encrypted Session</span>
              </div>
            </div>

            {/* Quick Demo Switcher for Examiners */}
            <div className="viva-examiner-switch-bar">
              <span className="viva-switch-label">⚡ SWITCH DEMO ACCOUNT (FOR COLLEGE VIVA):</span>
              <div className="viva-switch-pills">
                <button
                  type="button"
                  className={`btn-viva-pill ${user.email === 'ashieq@shopwave.in' ? 'active' : ''}`}
                  onClick={() => handleQuickLogin({
                    name: 'Ashieq Ahamed S A',
                    email: 'ashieq@shopwave.in',
                    phone: '+91 98765 43210',
                    tier: 'Student Author (RRN: 230071601031)',
                    rrn: '230071601031',
                    points: 5400,
                    avatar: 'AA'
                  })}
                >
                  👤 Ashieq Ahamed (Student)
                </button>
                <button
                  type="button"
                  className={`btn-viva-pill ${user.email === 'evaluator@crescent.education' ? 'active' : ''}`}
                  onClick={() => handleQuickLogin({
                    name: 'Faculty Evaluator',
                    email: 'evaluator@crescent.education',
                    phone: '+91 94440 12345',
                    tier: 'Examiner / Faculty Profile',
                    rrn: 'CSE-VIVA-2026',
                    points: 9999,
                    avatar: 'FE'
                  })}
                >
                  🎓 Faculty Examiner
                </button>
                <button
                  type="button"
                  className={`btn-viva-pill ${user.email === 'patron@atelier.in' ? 'active' : ''}`}
                  onClick={() => handleQuickLogin({
                    name: 'Aarav Sharma',
                    email: 'patron@atelier.in',
                    phone: '+91 91234 56789',
                    tier: 'VIP Luxury Patron',
                    rrn: 'VIP-7721',
                    points: 7800,
                    avatar: 'AS'
                  })}
                >
                  💎 VIP Luxury Patron
                </button>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="account-orders-section" style={{ marginTop: '2.5rem' }}>
              <div className="section-title-row">
                <div>
                  <h3 className="section-h">Your Order History & Invoices</h3>
                  <p className="section-p">Live tracking & computer-generated tax receipts from ShopWave Gateway</p>
                </div>
                <Link to="/products" className="btn-gucci-gold-sm">
                  + Place New Order
                </Link>
              </div>

              {orders && orders.length > 0 ? (
                <div className="orders-cards-list">
                  {orders.map((ord) => (
                    <div key={ord.id} className="order-summary-card">
                      <div className="order-card-top">
                        <div>
                          <span className="order-id-label">ORDER #{ord.id}</span>
                          <span className="order-date-text">
                            Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className="order-status-tag">{ord.status || 'Confirmed'}</span>
                          <div className="order-price-tag">
                            ₹{Number(ord.pricing?.total || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <div className="order-card-items">
                        {(ord.items || []).map((it, idx) => (
                          <div key={idx} className="order-item-mini-row">
                            <span className="item-qty-badge">{it.qty || it.quantity || 1}x</span>
                            <span className="item-name-text">{it.name}</span>
                            <span className="item-price-text">₹{Number(it.price).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-bottom">
                        <div className="order-meta-info">
                          <span>Payment: <strong>{(ord.payment?.method || 'UPI').toUpperCase()}</strong></span>
                          <span>•</span>
                          <span>Txn: <code style={{ color: 'var(--accent-gold)' }}>{ord.payment?.transactionId || 'TXN-SUCCESS'}</code></span>
                        </div>
                        <button
                          type="button"
                          className="btn-print-mini-invoice"
                          onClick={() => printDashboardInvoice(ord)}
                        >
                          📄 Print Tax Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-orders-box">
                  <span style={{ fontSize: '2.5rem' }}>🛍️</span>
                  <h4>No orders placed yet</h4>
                  <p>Browse our luxury collection and test the simulated checkout gateway.</p>
                  <Link to="/products" className="btn-gucci-solid-lg" style={{ marginTop: '0.8rem' }}>
                    Explore Ready-To-Wear Collection →
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Addresses Section */}
            <div className="account-address-section" style={{ marginTop: '2.5rem' }}>
              <h3 className="section-h">Default Delivery Destination</h3>
              <div className="address-card-box">
                <div className="address-badge">PRIMARY ADDRESS</div>
                <p className="addr-name"><strong>{user.name}</strong></p>
                <p className="addr-line">No. 42, Crescent Avenue, GST Road, Vandalur</p>
                <p className="addr-line">Chennai, Tamil Nadu – 600 048</p>
                <p className="addr-line">Contact: +91 98765 43210</p>
              </div>
            </div>

            {/* Actions */}
            <div className="account-actions-row" style={{ marginTop: '2.5rem' }}>
              <Link to="/products" className="btn-gucci-solid-lg">Explore Apparel Catalog →</Link>
              <Link to="/wishlist" className="btn-gucci-outline-lg">View Saved Items</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // VIEW 2: LOGIN / REGISTER FORM WITH ONE-CLICK VIVA ACCESS
  // =========================================================================
  return (
    <main className="page gucci-account-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="gucci-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">SHOPWAVE ATELIER</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">MEMBER AUTHENTICATION</span>
        </nav>

        <div className="gucci-auth-grid">
          {/* Left Column: Brand Editorial & Viva Accreditation */}
          <div className="gucci-auth-editorial">
            <span className="editorial-crest">✦ MODERN ATELIER ESSENTIALS</span>
            <h1 className="editorial-title">
              SHOPWAVE ATELIER<br />
              <span className="editorial-sub">MEMBER PORTAL</span>
            </h1>

            <p className="editorial-desc">
              Sign in to experience high-velocity product discovery, simulated 1-click checkout,
              dynamic tax invoice generation, and full order lifecycle tracking.
            </p>

            <div className="editorial-perks">
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Realistic In-App Payment Gateway</h4>
                  <p className="perk-p">Zero-setup simulated UPI QR, Credit Card with live preview, Net Banking, and COD.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Computer-Generated GST Tax Invoices</h4>
                  <p className="perk-p">Printable receipts featuring order reference, HSN codes, and digital verification seal.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Persistent Client-Side State</h4>
                  <p className="perk-p">Shopping bag, wishlists, and order records survive reloads with LocalStorage synchronization.</p>
                </div>
              </div>
            </div>

            {/* Viva Project Watermark */}
            <div className="viva-project-credit-box">
              <span className="credit-tag">COLLEGE VIVA / PROJECT METRICS</span>
              <p className="credit-text">
                Author: <strong>ASHIEQ AHAMED S A</strong> (RRN: <strong>230071601031</strong>)<br />
                B.Tech in Computer Science and Engineering (4th Year)<br />
                B.S. Abdur Rahman Crescent Institute of Science and Technology
              </p>
            </div>
          </div>

          {/* Right Column: Luxury Form */}
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

              {/* One-Click Quick Viva Demo Login Bar */}
              <div className="gucci-demo-login-bar">
                <div className="demo-info">
                  <span className="demo-badge">⚡ ONE-CLICK VIVA ACCESS</span>
                  <span className="demo-sub">Select a test profile to sign in instantly</span>
                </div>
                <div className="viva-quick-buttons-row">
                  <button
                    type="button"
                    className="btn-viva-pill-primary"
                    onClick={() => handleQuickLogin({
                      name: 'Ashieq Ahamed S A',
                      email: 'ashieq@shopwave.in',
                      phone: '+91 98765 43210',
                      tier: 'Student Author (RRN: 230071601031)',
                      rrn: '230071601031',
                      points: 5400,
                      avatar: 'AA'
                    })}
                  >
                    👤 Student (Ashieq)
                  </button>
                  <button
                    type="button"
                    className="btn-viva-pill-outline"
                    onClick={() => handleQuickLogin({
                      name: 'Faculty Evaluator',
                      email: 'evaluator@crescent.education',
                      phone: '+91 94440 12345',
                      tier: 'Faculty Examiner',
                      rrn: 'CSE-VIVA-2026',
                      points: 9999,
                      avatar: 'FE'
                    })}
                  >
                    🎓 Faculty Examiner
                  </button>
                </div>
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
                    <span>Keep me signed in for 30 days</span>
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('Reset instructions sent to your email (simulated).', 'info');
                    }}
                    className="gucci-forgot-link"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn-gucci-solid-lg"
                  style={{ width: '100%', marginTop: '1.2rem' }}
                >
                  {tab === 'login' ? 'SIGN IN TO ATELIER' : 'CREATE ATELIER ACCOUNT'}
                </button>
              </form>

              {/* Bottom Guarantee */}
              <div className="gucci-form-footer">
                <span className="lock-icon">🔒</span>
                <span>256-Bit Encrypted Secure Member Portal • Zero Setup Viva Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
