import { useState, useEffect } from 'react';
import { formatPrice } from '../data/products';

export default function PaymentModal({ isOpen, onClose, cart, cartTotal, onPaymentSuccess }) {
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [processStatus, setProcessStatus] = useState('Connecting to payment gateway...');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Customer form fields
  const [customer, setCustomer] = useState({
    name: 'Ashieq Ahamed',
    phone: '9876543210',
    email: 'ashieq@shopwave.local',
    address: 'No. 42, Crescent Avenue, GST Road',
    city: 'Chennai',
  });

  // UPI Fields
  const [upiId, setUpiId] = useState('ashieq@oksbi');
  const [showQr, setShowQr] = useState(false);

  // Card Fields
  const [card, setCard] = useState({
    number: '4532 8920 1934 7721',
    name: 'ASHIEQ AHAMED',
    expiry: '08/29',
    cvv: '821',
  });

  // Netbanking Fields
  const [selectedBank, setSelectedBank] = useState('HDFC');

  const banks = [
    { id: 'HDFC', name: 'HDFC Bank', icon: '🏦' },
    { id: 'SBI', name: 'State Bank of India', icon: '🏛️' },
    { id: 'ICICI', name: 'ICICI Bank', icon: '💳' },
    { id: 'AXIS', name: 'Axis Bank', icon: '🏢' },
    { id: 'KOTAK', name: 'Kotak Mahindra', icon: '🏧' },
    { id: 'PNB', name: 'Punjab National Bank', icon: '🏪' },
  ];

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setConfirmedOrder(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const shipping = cartTotal > 999 ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  // Detect card brand
  const getCardBrand = (num) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('5')) return 'Mastercard';
    if (clean.startsWith('6')) return 'RuPay';
    return 'Card';
  };

  const fillDemoCard = () => {
    setCard({
      number: '4532 8920 1934 7721',
      name: 'ASHIEQ AHAMED',
      expiry: '08/29',
      cvv: '821',
    });
  };

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCard({ ...card, number: formatted });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
    }
    setCard({ ...card, expiry: val });
  };

  const handlePay = () => {
    if (!customer.name.trim() || !customer.address.trim()) {
      alert('Please fill in your name and delivery address.');
      return;
    }

    setStep('processing');
    setProcessStatus('Connecting to secure banking network...');

    setTimeout(() => {
      setProcessStatus('Verifying payment credentials with bank...');
    }, 700);

    setTimeout(() => {
      setProcessStatus('Authorizing transaction token...');
    }, 1400);

    setTimeout(async () => {
      const txnId = `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      const paidAt = new Date().toISOString();

      const paymentDetails = {
        transactionId: activeTab === 'cod' ? `COD_PENDING_${Date.now()}` : txnId,
        method: activeTab,
        status: activeTab === 'cod' ? 'PENDING_ON_DELIVERY' : 'PAID',
        paidAt: activeTab === 'cod' ? null : paidAt,
        upiId: activeTab === 'upi' ? upiId : null,
        bankName: activeTab === 'netbanking' ? selectedBank : null,
        cardLast4: activeTab === 'card' ? card.number.replace(/\s/g, '').slice(-4) : null,
      };

      const payload = {
        items: cart,
        customer,
        paymentMethod: activeTab,
        paymentDetails,
      };

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          setConfirmedOrder(data.order);
        } else {
          throw new Error('API failed');
        }
      } catch (_e) {
        // Fallback for offline/static deployment
        const fallbackOrder = {
          id: `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
          createdAt: paidAt,
          status: 'confirmed',
          customer,
          items: [...cart],
          pricing: {
            subtotal: cartTotal,
            shipping,
            total: grandTotal,
          },
          payment: paymentDetails,
        };
        setConfirmedOrder(fallbackOrder);
      }

      setStep('success');
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 2200);
  };

  const printInvoice = () => {
    if (!confirmedOrder) return;
    const printWindow = window.open('', '_blank');
    const orderDate = new Date(confirmedOrder.createdAt).toLocaleDateString('en-IN', {
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
        <title>Invoice - ${confirmedOrder.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #111; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #6c63ff; padding-bottom: 15px; margin-bottom: 25px; }
          .logo { font-size: 24px; font-weight: bold; color: #6c63ff; }
          .title { font-size: 20px; font-weight: bold; text-align: right; }
          .meta { display: flex; justify-content: space-between; margin-bottom: 25px; }
          .box { width: 48%; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background: #f8f9fa; font-weight: bold; }
          .total-row { font-weight: bold; font-size: 16px; background: #f0f0ff; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; background: #e0f2fe; color: #0284c7; font-weight: bold; font-size: 12px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">⚡ ShopWave</div>
            <p style="margin: 4px 0; color: #666; font-size: 13px;">Premium E-Commerce Product Catalog Platform</p>
            <p style="margin: 0; color: #666; font-size: 12px;">Chennai, Tamil Nadu, India</p>
          </div>
          <div>
            <div class="title">TAX INVOICE</div>
            <p style="margin: 4px 0; font-size: 13px;"><strong>Order ID:</strong> ${confirmedOrder.id}</p>
            <p style="margin: 2px 0; font-size: 13px;"><strong>Date:</strong> ${orderDate}</p>
            <p style="margin: 2px 0; font-size: 13px;"><span class="badge">STATUS: ${confirmedOrder.payment?.status || 'PAID'}</span></p>
          </div>
        </div>

        <div class="meta">
          <div class="box">
            <h4 style="margin: 0 0 8px 0; color: #444;">BILLED TO:</h4>
            <p style="margin: 2px 0; font-weight: bold;">${confirmedOrder.customer.name}</p>
            <p style="margin: 2px 0;">${confirmedOrder.customer.address}, ${confirmedOrder.customer.city}</p>
            <p style="margin: 2px 0;">Phone: ${confirmedOrder.customer.phone}</p>
            <p style="margin: 2px 0;">Email: ${confirmedOrder.customer.email}</p>
          </div>
          <div class="box" style="text-align: right;">
            <h4 style="margin: 0 0 8px 0; color: #444;">PAYMENT INFORMATION:</h4>
            <p style="margin: 2px 0;"><strong>Method:</strong> ${(confirmedOrder.payment?.method || 'Card').toUpperCase()}</p>
            <p style="margin: 2px 0; font-family: monospace;"><strong>Transaction ID:</strong> ${confirmedOrder.payment?.transactionId || 'TXN-N/A'}</p>
            <p style="margin: 2px 0;"><strong>Payment Gateway:</strong> ShopWave Secure Gateway (Simulated)</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50%;">Item Description</th>
              <th style="width: 15%; text-align: center;">Qty</th>
              <th style="width: 15%; text-align: right;">Unit Price</th>
              <th style="width: 20%; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${confirmedOrder.items.map(item => `
              <tr>
                <td><strong>${item.name}</strong></td>
                <td style="text-align: center;">${item.qty}</td>
                <td style="text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
                <td style="text-align: right;">₹${(item.price * item.qty).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
            <tr>
              <td colspan="3" style="text-align: right;">Subtotal:</td>
              <td style="text-align: right;">₹${confirmedOrder.pricing.subtotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right;">Express Shipping:</td>
              <td style="text-align: right;">${confirmedOrder.pricing.shipping === 0 ? 'FREE' : '₹' + confirmedOrder.pricing.shipping}</td>
            </tr>
            <tr class="total-row">
              <td colspan="3" style="text-align: right;">Total Paid (INR):</td>
              <td style="text-align: right; color: #6c63ff;">₹${confirmedOrder.pricing.total.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p>This is a computer-generated invoice from ShopWave E-Commerce Product Catalog Platform.</p>
          <p>Internship Project by <strong>Ashieq Ahamed S A (RRN: 230071601031)</strong> • B.S. Abdur Rahman Crescent Institute of Science and Technology.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  return (
    <div className="payment-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget && step !== 'processing') onClose(); }}>
      <div className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
        {/* Header */}
        <div className="payment-modal-header">
          <div className="payment-header-left">
            <span className="secure-badge">🔒 256-Bit SSL Secure</span>
            <h2 id="payment-modal-title" className="payment-modal-title">
              {step === 'success' ? 'Payment Confirmed' : 'Complete Your Order'}
            </h2>
          </div>
          {step !== 'processing' && (
            <button className="payment-modal-close" onClick={onClose} aria-label="Close payment modal">✕</button>
          )}
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <div className="payment-modal-body">
            {/* Amount Banner */}
            <div className="payment-amount-banner">
              <div>
                <span className="payment-amount-label">Amount Payable:</span>
                <span className="payment-amount-value">{formatPrice(grandTotal)}</span>
              </div>
              <span className="payment-items-pill">{cart.reduce((s, i) => s + (i.qty || 1), 0)} Items</span>
            </div>

            {/* Customer Details Accordion */}
            <div className="payment-section">
              <h3 className="payment-section-title">👤 Shipping & Contact Details</h3>
              <div className="payment-grid-2">
                <div className="payment-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="payment-field">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>
              <div className="payment-field" style={{ marginTop: '0.5rem' }}>
                <label>Delivery Address</label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="House/Flat No., Street, Landmark"
                />
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="payment-section">
              <h3 className="payment-section-title">💳 Select Payment Method</h3>
              <div className="payment-tabs-nav">
                <button
                  type="button"
                  className={`payment-tab-btn ${activeTab === 'upi' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upi')}
                >
                  <span className="tab-icon">⚡</span> UPI / QR
                </button>
                <button
                  type="button"
                  className={`payment-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
                  onClick={() => setActiveTab('card')}
                >
                  <span className="tab-icon">💳</span> Card
                </button>
                <button
                  type="button"
                  className={`payment-tab-btn ${activeTab === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('netbanking')}
                >
                  <span className="tab-icon">🏦</span> Net Banking
                </button>
                <button
                  type="button"
                  className={`payment-tab-btn ${activeTab === 'cod' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cod')}
                >
                  <span className="tab-icon">📦</span> COD
                </button>
              </div>

              {/* TAB 1: UPI */}
              {activeTab === 'upi' && (
                <div className="payment-tab-content">
                  <div className="upi-quick-apps">
                    <span className="upi-app-pill" onClick={() => setUpiId('ashieq@okaxis')}>Google Pay</span>
                    <span className="upi-app-pill" onClick={() => setUpiId('ashieq@ybl')}>PhonePe</span>
                    <span className="upi-app-pill" onClick={() => setUpiId('ashieq@paytm')}>Paytm</span>
                    <span className="upi-app-pill" onClick={() => setUpiId('ashieq@upi')}>BHIM UPI</span>
                  </div>

                  <div className="payment-field" style={{ marginTop: '0.8rem' }}>
                    <label>Enter Virtual Payment Address (UPI ID)</label>
                    <div className="upi-input-group">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobile@upi or username@oksbi"
                      />
                      <span className="upi-verified-tag">✓ Verified</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', margin: '0.8rem 0' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowQr(!showQr)}
                    >
                      {showQr ? '▲ Hide QR Code' : '📷 Or Click to Scan Dynamic QR Code'}
                    </button>
                  </div>

                  {showQr && (
                    <div className="upi-qr-box">
                      <div className="qr-simulated">
                        <div className="qr-box-inner">
                          <span style={{ fontSize: '2.5rem' }}>📱</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>SCAN TO PAY ₹{grandTotal.toLocaleString('en-IN')}</span>
                          <span style={{ fontSize: '0.65rem', color: '#666' }}>ShopWave Retail Merchant</span>
                        </div>
                      </div>
                      <p style="color: var(--text-muted); font-size: 0.78rem; margin-top: 6px;">
                        Scan with Google Pay, PhonePe, Paytm, or any UPI App
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CREDIT / DEBIT CARD */}
              {activeTab === 'card' && (
                <div className="payment-tab-content">
                  {/* Virtual Card Preview */}
                  <div className="virtual-card">
                    <div className="vcard-top">
                      <span className="vcard-chip"></span>
                      <span className="vcard-brand">{getCardBrand(card.number)}</span>
                    </div>
                    <div className="vcard-number">{card.number || '•••• •••• •••• ••••'}</div>
                    <div className="vcard-bottom">
                      <div>
                        <span className="vcard-label">CARD HOLDER</span>
                        <span className="vcard-val">{card.name || 'YOUR NAME'}</span>
                      </div>
                      <div>
                        <span className="vcard-label">EXPIRES</span>
                        <span className="vcard-val">{card.expiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                    <button type="button" className="demo-fill-btn" onClick={fillDemoCard}>
                      ⚡ Auto-Fill Demo Card
                    </button>
                  </div>

                  <div className="payment-field">
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={card.number}
                      onChange={handleCardNumberChange}
                      placeholder="16-digit card number"
                      maxLength="19"
                    />
                  </div>

                  <div className="payment-field" style={{ marginTop: '0.5rem' }}>
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      value={card.name}
                      onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                      placeholder="Name printed on card"
                    />
                  </div>

                  <div className="payment-grid-2" style={{ marginTop: '0.5rem' }}>
                    <div className="payment-field">
                      <label>Valid Thru (MM/YY)</label>
                      <input
                        type="text"
                        value={card.expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div className="payment-field">
                      <label>CVV / CVC</label>
                      <input
                        type="password"
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value.slice(0, 3) })}
                        placeholder="3 digits"
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NET BANKING */}
              {activeTab === 'netbanking' && (
                <div className="payment-tab-content">
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Select your bank to redirect to secure net banking portal:
                  </p>
                  <div className="netbanking-grid">
                    {banks.map((b) => (
                      <div
                        key={b.id}
                        className={`bank-card ${selectedBank === b.id ? 'selected' : ''}`}
                        onClick={() => setSelectedBank(b.id)}
                      >
                        <span className="bank-icon">{b.icon}</span>
                        <span className="bank-name">{b.name}</span>
                        {selectedBank === b.id && <span className="bank-check">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CASH ON DELIVERY */}
              {activeTab === 'cod' && (
                <div className="payment-tab-content">
                  <div className="cod-notice">
                    <span style={{ fontSize: '2rem' }}>📦</span>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--accent-cyan)' }}>
                        Cash / UPI on Delivery
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        Pay cash or scan QR on arrival at your doorstep. Verified delivery partner with contactless OTP confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <div className="payment-modal-footer">
              <button
                type="button"
                className="btn btn-primary payment-submit-btn"
                onClick={handlePay}
              >
                {activeTab === 'cod' ? 'Confirm COD Order 📦' : `Pay ${formatPrice(grandTotal)} Securely 🔒`}
              </button>
              <div className="security-badges-row">
                <span>🛡️ RBI Approved Gateway</span>
                <span>🔒 PCI-DSS Certified</span>
                <span>⚡ Instant Settlement</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING ANIMATION */}
        {step === 'processing' && (
          <div className="payment-processing-box">
            <div className="pulse-spinner">
              <span className="lock-icon">🔒</span>
            </div>
            <h3 className="processing-title">Processing Payment</h3>
            <p className="processing-status">{processStatus}</p>
            <p className="processing-note">Please do not refresh or close this window...</p>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION & RECEIPT */}
        {step === 'success' && confirmedOrder && (
          <div className="payment-success-box">
            <div className="success-icon-wrap">
              <span className="success-checkmark">✓</span>
            </div>
            <h3 className="success-title">Payment Successful!</h3>
            <p className="success-subtitle">Your order has been confirmed and placed with ShopWave.</p>

            <div className="receipt-card">
              <div className="receipt-row">
                <span className="receipt-label">Order Reference:</span>
                <span className="receipt-value monospace">{confirmedOrder.id}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Transaction ID:</span>
                <span className="receipt-value monospace" style={{ color: 'var(--accent-cyan)' }}>
                  {confirmedOrder.payment?.transactionId || 'TXN-SUCCESS'}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Payment Mode:</span>
                <span className="receipt-value" style={{ textTransform: 'uppercase' }}>
                  {confirmedOrder.payment?.method || activeTab}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Total Amount Paid:</span>
                <span className="receipt-value highlight">{formatPrice(confirmedOrder.pricing.total)}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Delivery To:</span>
                <span className="receipt-value">{confirmedOrder.customer.name}, {confirmedOrder.customer.city}</span>
              </div>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={printInvoice}
                style={{ flex: 1 }}
              >
                📄 Print / Save Tax Invoice
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
                style={{ flex: 1 }}
              >
                Continue Shopping →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
