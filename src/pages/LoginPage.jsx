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
            <p style="margin: 4px 0; color: #6b7280; font-size: 12px;">Luxury Ready-To-Wear & Product Catalog</p>
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
          <p style="margin: 2px 0;">Payment: ${(order.payment?.method || 'UPI').toUpperCase()} • Txn ID: ${order.payment?.transactionId || 'TXN-9021'}</p>
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
                <td><strong>${it.name}${it.size ? ` <span style="color: #c5a880;">(Size: ${it.size})</span>` : ''}</strong></td>
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
          <p>Official tax receipt issued by <strong>ShopWave Atelier</strong>. All rights reserved.</p>
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
            <span className="breadcrumb-current">MY ATELIER ACCOUNT</span>
          </nav>

          <div className="gucci-account-card">
            {/* Header */}
            <div className="account-card-header">
              <div className="account-avatar-lg">{user.avatar || 'AA'}</div>
              <div style={{ flex: 1 }}>
                <span className="account-tier-badge">✦ ATELIER PRIVILEGE MEMBER</span>
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
                <span className="privilege-k">Membership Tier</span>
                <span className="privilege-v">VIP Patron</span>
                <span className="privilege-sub">Complimentary Express Shipping</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Atelier Credits</span>
                <span className="privilege-v">{user.points || 4250} Pts</span>
                <span className="privilege-sub">Available on next purchase</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Return Window</span>
                <span className="privilege-v">30 Days</span>
                <span className="privilege-sub">Complimentary Doorstep Pickup</span>
              </div>
              <div className="privilege-box">
                <span className="privilege-k">Protection</span>
                <span className="privilege-v">256-Bit SSL</span>
                <span className="privilege-sub">Encrypted Private Session</span>
              </div>
            </div>

            {/* Recent Orders Section */}
            <div className="account-orders-section" style={{ marginTop: '2.5rem' }}>
              <div className="section-title-row">
                <div>
                  <h3 className="section-h">Your Orders & Invoices</h3>
                  <p className="section-p">Live tracking and computer-generated tax receipts</p>
                </div>
                <Link to="/products" className="btn-gucci-gold-sm">
                  + New Order
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
                            <span className="item-name-text">
                              {it.name}
                              {it.size && <span style={{ color: 'var(--accent-gold)', marginLeft: '6px', fontSize: '0.78rem' }}>({it.size})</span>}
                            </span>
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
                  <p>Browse our luxury collection and checkout with our simulated payment gateway.</p>
                  <Link to="/products" className="btn-gucci-solid-lg" style={{ marginTop: '0.8rem' }}>
                    Explore Ready-To-Wear Collection →
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Addresses Section */}
            <div className="account-address-section" style={{ marginTop: '2.5rem' }}>
              <h3 className="section-h">Delivery Destination</h3>
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
  // VIEW 2: REAL LUXURY LOGIN / CREATE ACCOUNT PORTAL
  // =========================================================================
  return (
    <main className="page gucci-account-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="gucci-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">SHOPWAVE ATELIER</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">CLIENT LOGIN</span>
        </nav>

        <div className="gucci-auth-grid">
          {/* Left Column: Brand Story & Services */}
          <div className="gucci-auth-editorial">
            <span className="editorial-crest">✦ MODERN ATELIER ESSENTIALS</span>
            <h1 className="editorial-title">
              SHOPWAVE ATELIER<br />
              <span className="editorial-sub">MEMBER PORTAL</span>
            </h1>

            <p className="editorial-desc">
              Sign in to manage your orders, track deliveries in real time, curate your private
              wishlist, and receive complimentary express delivery across India.
            </p>

            <div className="editorial-perks">
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Express Doorstep Delivery</h4>
                  <p className="perk-p">Complimentary express shipping across all states with real-time tracking updates.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Effortless 30-Day Returns</h4>
                  <p className="perk-p">Simple one-click return initiation with doorstep pickup and instant credit refunds.</p>
                </div>
              </div>
              <div className="perk-row">
                <span className="perk-bullet">✦</span>
                <div>
                  <h4 className="perk-h">Privilege Previews & Capsule Drops</h4>
                  <p className="perk-p">Early access to limited-edition tailoring, selvedge denim cuts, and seasonal edits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Luxury Authentication Form */}
          <div className="gucci-auth-form-wrap">
            <div className="gucci-form-box">
              {/* Tabs */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="gucci-form">
                {tab === 'register' && (
                  <div className="gucci-field-group">
                    <label className="gucci-label" htmlFor="auth-name">FULL NAME</label>
                    <input
                      id="auth-name"
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
                  <label className="gucci-label" htmlFor="auth-email">EMAIL ADDRESS</label>
                  <input
                    id="auth-email"
                    type="email"
                    className="gucci-input"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="gucci-field-group">
                  <div className="gucci-label-row">
                    <label className="gucci-label" htmlFor="auth-password">PASSWORD</label>
                  </div>
                  <div className="gucci-password-wrap">
                    <input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      className="gucci-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="gucci-pwd-toggle-btn"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
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
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('Password reset link sent to your registered email.', 'info');
                    }}
                    className="gucci-forgot-link"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn-gucci-solid-lg"
                  style={{ width: '100%', marginTop: '1.25rem' }}
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
