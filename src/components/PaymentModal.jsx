import { useState, useEffect, useMemo } from 'react';
import { formatPrice } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function PaymentModal({
  isOpen,
  onClose,
  cart,
  cartItems,
  cartTotal,
  totalAmount,
  amount,
  onPaymentSuccess
}) {
  const { user, addOrder, clearCart, addToast } = useShop();

  // Normalize inputs so it NEVER crashes
  const items = useMemo(() => {
    if (Array.isArray(cart) && cart.length > 0) return cart;
    if (Array.isArray(cartItems) && cartItems.length > 0) return cartItems;
    return [];
  }, [cart, cartItems]);

  const rawTotal = cartTotal ?? totalAmount ?? amount ?? 0;
  const calculatedSubtotal = useMemo(() => {
    if (typeof rawTotal === 'number' && rawTotal > 0) return rawTotal;
    return items.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.qty || i.quantity) || 1), 0);
  }, [rawTotal, items]);

  const shipping = calculatedSubtotal > 1999 || calculatedSubtotal === 0 ? 0 : 99;
  const grandTotal = calculatedSubtotal + shipping;

  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'
  const [processStatus, setProcessStatus] = useState('Initiating 256-bit SSL encrypted connection...');
  const [progressPercent, setProgressPercent] = useState(15);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Customer form fields
  const [customer, setCustomer] = useState({
    name: user?.name || 'Ashieq Ahamed',
    phone: user?.phone || '9876543210',
    email: user?.email || 'ashieq@shopwave.in',
    address: 'No. 42, Crescent Avenue, GST Road, Vandalur',
    city: 'Chennai',
    pincode: '600048',
    state: 'Tamil Nadu'
  });

  // Keep customer in sync with user if available
  useEffect(() => {
    if (user) {
      setCustomer(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  // UPI Fields
  const [upiId, setUpiId] = useState('ashieq@oksbi');
  const [upiApp, setUpiApp] = useState('gpay');
  const [showQr, setShowQr] = useState(true);
  const [qrCountdown, setQrCountdown] = useState(300); // 5 minutes

  // Card Fields
  const [card, setCard] = useState({
    number: '4532 8920 1934 7721',
    name: 'ASHIEQ AHAMED',
    expiry: '08/29',
    cvv: '821',
  });

  // Netbanking Fields
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // COD Fields
  const [codOtp, setCodOtp] = useState('');
  const [simulatedOtp] = useState('4291');

  const banks = [
    { id: 'HDFC', name: 'HDFC Bank', code: 'HDFC0001', tag: 'Fastest' },
    { id: 'SBI', name: 'State Bank of India', code: 'SBIN0002', tag: 'Popular' },
    { id: 'ICICI', name: 'ICICI Bank', code: 'ICIC0003', tag: 'Instant' },
    { id: 'AXIS', name: 'Axis Bank', code: 'UTIB0004', tag: 'Reliable' },
    { id: 'KOTAK', name: 'Kotak Mahindra', code: 'KKBK0005', tag: 'Instant' },
    { id: 'PNB', name: 'Punjab National Bank', code: 'PUNB0006', tag: 'Secure' },
  ];

  // Timer countdown for UPI QR
  useEffect(() => {
    if (!isOpen || step !== 'form' || activeTab !== 'upi') return;
    const interval = setInterval(() => {
      setQrCountdown(prev => (prev > 1 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step, activeTab]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setConfirmedOrder(null);
      setProgressPercent(15);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Detect card network
  const getCardBrand = (num) => {
    const clean = (num || '').replace(/\s+/g, '');
    if (clean.startsWith('4')) return { name: 'Visa', color: '#1a1f71', bg: 'linear-gradient(135deg, #1a1f71 0%, #00579f 100%)' };
    if (clean.startsWith('5')) return { name: 'Mastercard', color: '#eb001b', bg: 'linear-gradient(135deg, #141414 0%, #2b1f1f 100%)' };
    if (clean.startsWith('6')) return { name: 'RuPay', color: '#097939', bg: 'linear-gradient(135deg, #097939 0%, #004b23 100%)' };
    if (clean.startsWith('3')) return { name: 'Amex', color: '#002663', bg: 'linear-gradient(135deg, #0f3057 0%, #00587a 100%)' };
    return { name: 'Card', color: '#c5a880', bg: 'linear-gradient(135deg, #1a1816 0%, #2b2622 100%)' };
  };

  const currentBrand = getCardBrand(card.number);

  const fillDemoCard = () => {
    setCard({
      number: '4532 8920 1934 7721',
      name: 'ASHIEQ AHAMED',
      expiry: '08/29',
      cvv: '821',
    });
    addToast('Demo card credentials auto-filled! 💳', 'info');
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

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Simulated Payment Trigger
  const handlePay = () => {
    if (!customer.name.trim()) {
      alert('Please enter your full name for shipping.');
      return;
    }
    if (!customer.address.trim()) {
      alert('Please enter your delivery address.');
      return;
    }
    if (activeTab === 'cod' && codOtp && codOtp !== simulatedOtp) {
      alert(`Invalid OTP! Please enter ${simulatedOtp} to confirm COD.`);
      return;
    }

    setStep('processing');
    setProgressPercent(25);
    setProcessStatus('Initiating 256-bit SSL encrypted connection...');

    setTimeout(() => {
      setProgressPercent(50);
      setProcessStatus(
        activeTab === 'upi' ? 'Handshaking with NPCI UPI Gateway...' :
        activeTab === 'card' ? 'Connecting to 3D Secure 2.0 Banking Network...' :
        activeTab === 'netbanking' ? `Routing to ${selectedBank} Core Banking Server...` :
        'Generating Verified Delivery Dispatch Token...'
      );
    }, 650);

    setTimeout(() => {
      setProgressPercent(80);
      setProcessStatus('Authorizing payment token & validating account balance...');
    }, 1300);

    setTimeout(async () => {
      setProgressPercent(100);
      const txnId = `TXN-RBI-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderId = `ORD-SW-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const paidAt = new Date().toISOString();

      const paymentDetails = {
        transactionId: activeTab === 'cod' ? `COD-PENDING-${Date.now().toString().slice(-6)}` : txnId,
        method: activeTab,
        status: activeTab === 'cod' ? 'PENDING_ON_DELIVERY' : 'PAID',
        gateway: 'ShopWave In-App Simulated Gateway (Viva Mode)',
        paidAt: activeTab === 'cod' ? null : paidAt,
        upiId: activeTab === 'upi' ? upiId : null,
        bankName: activeTab === 'netbanking' ? selectedBank : null,
        cardLast4: activeTab === 'card' ? card.number.replace(/\s/g, '').slice(-4) : null,
      };

      const newOrder = {
        id: orderId,
        createdAt: paidAt,
        status: activeTab === 'cod' ? 'Confirmed (COD)' : 'Confirmed & Paid',
        customer: { ...customer },
        items: items.length > 0 ? [...items] : [
          {
            id: 'oxford-shirt',
            name: "Men's Slim Fit Oxford Cotton Button-Down Shirt",
            price: 2499,
            qty: 1
          }
        ],
        pricing: {
          subtotal: calculatedSubtotal,
          shipping,
          total: grandTotal,
        },
        payment: paymentDetails,
      };

      // Try server sync
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder),
        });
      } catch (_err) {
        // Safe offline fallback
      }

      // Record in Global ShopContext
      addOrder(newOrder);
      setConfirmedOrder(newOrder);

      // Trigger callback and clear cart
      if (onPaymentSuccess) {
        onPaymentSuccess(newOrder);
      } else {
        clearCart();
        addToast('Order confirmed & placed successfully! 🎉', 'success');
      }

      setStep('success');
    }, 2100);
  };

  // High-Quality Printable Official Tax Invoice
  const printInvoice = () => {
    if (!confirmedOrder) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to view the tax invoice.');
      return;
    }

    const orderDate = new Date(confirmedOrder.createdAt).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const invoiceHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Tax Invoice - ${confirmedOrder.id}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 35px;
            color: #111827;
            background: #ffffff;
            font-size: 13px;
            line-height: 1.5;
          }
          .invoice-box {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #e5e7eb;
            padding: 30px;
            border-radius: 8px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #c5a880;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .brand-title {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #111827;
            text-transform: uppercase;
          }
          .brand-sub {
            color: #c5a880;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.15em;
            margin-top: 2px;
          }
          .invoice-title {
            font-size: 20px;
            font-weight: 800;
            color: #111827;
            text-align: right;
            letter-spacing: 0.05em;
          }
          .badge-paid {
            display: inline-block;
            background: #ecfdf5;
            color: #065f46;
            font-weight: 800;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 11px;
            border: 1px solid #a7f3d0;
            margin-top: 6px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
            padding: 15px;
            background: #f9fafb;
            border-radius: 6px;
            border: 1px solid #f3f4f6;
          }
          .meta-col h4 {
            margin: 0 0 6px 0;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #6b7280;
          }
          .meta-col p {
            margin: 2px 0;
            font-size: 12.5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          th {
            background: #111827;
            color: #ffffff;
            font-weight: 700;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 10px 12px;
            text-align: left;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 12.5px;
          }
          .text-right { text-align: right; }
          .text-center { text-align: center; }
          .total-summary {
            width: 320px;
            margin-left: auto;
            margin-bottom: 30px;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            font-size: 13px;
          }
          .summary-row.grand {
            border-top: 2px solid #111827;
            padding-top: 10px;
            font-weight: 800;
            font-size: 16px;
            color: #111827;
          }
          .stamp-box {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px dashed #d1d5db;
          }
          .viva-note {
            font-size: 11px;
            color: #4b5563;
            max-width: 450px;
          }
          .signature-box {
            text-align: center;
            min-width: 180px;
          }
          .sig-line {
            border-top: 1px solid #111827;
            margin-top: 40px;
            padding-top: 6px;
            font-weight: 700;
            font-size: 11px;
          }
          @media print {
            body { padding: 0; }
            .invoice-box { border: none; padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <div class="brand-title">SHOPWAVE ATELIER</div>
              <div class="brand-sub">LUXURY APPAREL & PRODUCT CATALOG PLATFORM</div>
              <p style="margin: 6px 0 0 0; color: #6b7280; font-size: 11px;">
                GSTIN: 33AAACS1010P1Z1 • Reg: CIN-U72200TN2026PTC1098<br>
                GST Road, Vandalur, Chennai – 600 048, Tamil Nadu
              </p>
            </div>
            <div style="text-align: right;">
              <div class="invoice-title">OFFICIAL TAX INVOICE</div>
              <div style="font-weight: bold; margin-top: 4px;">Invoice #: ${confirmedOrder.id}</div>
              <div style="color: #6b7280; font-size: 11.5px; margin-top: 2px;">Date: ${orderDate}</div>
              <div><span class="badge-paid">PAYMENT CONFIRMED (${(confirmedOrder.payment?.method || 'UPI').toUpperCase()})</span></div>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-col">
              <h4>BILLED TO (CUSTOMER DETAILS)</h4>
              <p><strong>${confirmedOrder.customer.name}</strong></p>
              <p>${confirmedOrder.customer.address}</p>
              <p>${confirmedOrder.customer.city}, ${confirmedOrder.customer.state || 'Tamil Nadu'} - ${confirmedOrder.customer.pincode || '600048'}</p>
              <p>Mobile: +91 ${confirmedOrder.customer.phone} • Email: ${confirmedOrder.customer.email}</p>
            </div>
            <div class="meta-col text-right">
              <h4>TRANSACTION METRICS</h4>
              <p><strong>Gateway:</strong> ShopWave Simulated Gateway (RBI-Mode)</p>
              <p><strong>Txn Ref:</strong> <code style="font-family: monospace;">${confirmedOrder.payment?.transactionId || 'TXN-RBI-90214'}</code></p>
              <p><strong>Shipping Mode:</strong> Complimentary Atelier White-Glove Express</p>
              <p><strong>Est. Delivery:</strong> Within 48 Hours with Real-Time Tracking</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 50%;">Product Description</th>
                <th style="width: 15%;" class="text-center">Qty</th>
                <th style="width: 15%;" class="text-right">Unit Price</th>
                <th style="width: 15%;" class="text-right">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              ${confirmedOrder.items.map((it, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>
                    <strong>${it.name}</strong>
                    <div style="color: #6b7280; font-size: 10.5px;">HSN: 620520 • Grade-A Luxury Apparel Spec</div>
                  </td>
                  <td class="text-center">${it.qty || it.quantity || 1}</td>
                  <td class="text-right">₹${Number(it.price).toLocaleString('en-IN')}</td>
                  <td class="text-right">₹${((Number(it.price) || 0) * (Number(it.qty || it.quantity) || 1)).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-summary">
            <div class="summary-row">
              <span>Catalog Subtotal:</span>
              <span>₹${Number(confirmedOrder.pricing.subtotal).toLocaleString('en-IN')}</span>
            </div>
            <div class="summary-row">
              <span>Integrated Taxes (CGST 9% + SGST 9%):</span>
              <span style="color: #059669;">Included in Price</span>
            </div>
            <div class="summary-row">
              <span>Express Insured Shipping:</span>
              <span>${confirmedOrder.pricing.shipping === 0 ? '<strong style="color: #059669;">FREE</strong>' : '₹' + confirmedOrder.pricing.shipping}</span>
            </div>
            <div class="summary-row grand">
              <span>Total Paid (INR):</span>
              <span style="color: #c5a880;">₹${Number(confirmedOrder.pricing.total).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="stamp-box">
            <div class="viva-note">
              <strong>College Viva / Academic Project Verification:</strong><br>
              Developed by <strong>ASHIEQ AHAMED S A (RRN: 230071601031)</strong><br>
              Bachelor of Technology in Computer Science & Engineering<br>
              B.S. Abdur Rahman Crescent Institute of Science and Technology, Chennai.<br>
              <em>This is a verified in-app simulated payment gateway receipt designed for zero-setup live evaluation.</em>
            </div>
            <div class="signature-box">
              <div style="color: #c5a880; font-weight: bold; font-size: 13px;">✦ SHOPWAVE ATELIER</div>
              <div class="sig-line">Authorized Digital Signatory</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div
      className="payment-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 'processing') onClose();
      }}
    >
      <div className="payment-modal simulated-viva-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Luxury Top Banner */}
        <div className="viva-gateway-topbar">
          <div className="viva-badge-wrap">
            <span className="viva-shield-icon">🛡️</span>
            <div>
              <span className="viva-title">SHOPWAVE SIMULATED GATEWAY</span>
              <span className="viva-sub">ZERO-SETUP LIVE PAYMENT ENGINE • COLLEGE VIVA READY</span>
            </div>
          </div>
          {step !== 'processing' && (
            <button className="payment-modal-close" onClick={onClose} aria-label="Close modal">✕</button>
          )}
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <div className="payment-modal-body">
            {/* Amount Payable Hero */}
            <div className="viva-amount-card">
              <div className="amount-info">
                <span className="amount-caption">TOTAL AMOUNT PAYABLE</span>
                <div className="amount-number">
                  <span className="currency-symbol">₹</span>
                  <span className="digits">{grandTotal.toLocaleString('en-IN')}</span>
                  <span className="inclusive-tag">All Taxes & Shipping Included</span>
                </div>
              </div>
              <div className="items-summary-chip">
                <span>{items.reduce((sum, it) => sum + (it.qty || it.quantity || 1), 0)} Items</span>
              </div>
            </div>

            {/* Quick Demo Pre-fill for Viva */}
            <div className="viva-quick-fill-strip">
              <span className="strip-label">⚡ VIVA EXAMINER QUICK DEMO:</span>
              <button
                type="button"
                className="btn-viva-chip"
                onClick={() => {
                  setCustomer({
                    name: 'Ashieq Ahamed',
                    phone: '9876543210',
                    email: 'ashieq@shopwave.in',
                    address: 'No. 42, Crescent Avenue, GST Road, Vandalur',
                    city: 'Chennai',
                    pincode: '600048',
                    state: 'Tamil Nadu'
                  });
                  addToast('Prefilled student test profile (Ashieq Ahamed)', 'info');
                }}
              >
                👤 Student (Ashieq)
              </button>
              <button
                type="button"
                className="btn-viva-chip"
                onClick={() => {
                  setCustomer({
                    name: 'Faculty Evaluator',
                    phone: '9444012345',
                    email: 'examiner@crescent.education',
                    address: 'Department of CSE, BSA Crescent Campus',
                    city: 'Chennai',
                    pincode: '600048',
                    state: 'Tamil Nadu'
                  });
                  addToast('Prefilled Faculty Examiner test profile', 'info');
                }}
              >
                🎓 Faculty Examiner
              </button>
            </div>

            {/* Customer Details */}
            <div className="viva-section">
              <div className="viva-section-hdr">
                <span className="section-icon">📍</span>
                <h4 className="section-title">Shipping & Contact Destination</h4>
              </div>
              <div className="viva-input-row-2">
                <div className="viva-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Recipient's Name"
                  />
                </div>
                <div className="viva-field">
                  <label>Mobile Number (+91)</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>
              <div className="viva-field" style={{ marginTop: '0.6rem' }}>
                <label>Street & Doorstep Address</label>
                <input
                  type="text"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Apartment, Street, Landmark"
                />
              </div>
              <div className="viva-input-row-3" style={{ marginTop: '0.6rem' }}>
                <div className="viva-field">
                  <label>City</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  />
                </div>
                <div className="viva-field">
                  <label>State</label>
                  <input
                    type="text"
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  />
                </div>
                <div className="viva-field">
                  <label>PIN Code</label>
                  <input
                    type="text"
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Modes */}
            <div className="viva-section" style={{ marginTop: '1.25rem' }}>
              <div className="viva-section-hdr">
                <span className="section-icon">💳</span>
                <h4 className="section-title">Select Simulated Payment Channel</h4>
              </div>

              {/* Tabs */}
              <div className="viva-tabs-grid">
                <button
                  type="button"
                  className={`viva-tab-btn ${activeTab === 'upi' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upi')}
                >
                  <span className="tab-glyph">⚡</span>
                  <span className="tab-title">Instant UPI / QR</span>
                  <span className="tab-sub">GPay • PhonePe • Paytm</span>
                </button>
                <button
                  type="button"
                  className={`viva-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
                  onClick={() => setActiveTab('card')}
                >
                  <span className="tab-glyph">💳</span>
                  <span className="tab-title">Credit / Debit Card</span>
                  <span className="tab-sub">Visa • Mastercard • RuPay</span>
                </button>
                <button
                  type="button"
                  className={`viva-tab-btn ${activeTab === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('netbanking')}
                >
                  <span className="tab-glyph">🏦</span>
                  <span className="tab-title">Net Banking</span>
                  <span className="tab-sub">Top Indian Banks</span>
                </button>
                <button
                  type="button"
                  className={`viva-tab-btn ${activeTab === 'cod' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cod')}
                >
                  <span className="tab-glyph">📦</span>
                  <span className="tab-title">Cash on Delivery</span>
                  <span className="tab-sub">OTP Verified Handover</span>
                </button>
              </div>

              {/* TAB 1: UPI */}
              {activeTab === 'upi' && (
                <div className="viva-channel-panel">
                  {/* Quick Apps */}
                  <div className="upi-apps-row">
                    <button
                      type="button"
                      className={`upi-pill-btn ${upiApp === 'gpay' ? 'selected' : ''}`}
                      onClick={() => { setUpiApp('gpay'); setUpiId('ashieq@okaxis'); }}
                    >
                      <span className="app-dot gpay"></span> Google Pay
                    </button>
                    <button
                      type="button"
                      className={`upi-pill-btn ${upiApp === 'phonepe' ? 'selected' : ''}`}
                      onClick={() => { setUpiApp('phonepe'); setUpiId('ashieq@ybl'); }}
                    >
                      <span className="app-dot phonepe"></span> PhonePe
                    </button>
                    <button
                      type="button"
                      className={`upi-pill-btn ${upiApp === 'paytm' ? 'selected' : ''}`}
                      onClick={() => { setUpiApp('paytm'); setUpiId('ashieq@paytm'); }}
                    >
                      <span className="app-dot paytm"></span> Paytm
                    </button>
                    <button
                      type="button"
                      className={`upi-pill-btn ${upiApp === 'bhim' ? 'selected' : ''}`}
                      onClick={() => { setUpiApp('bhim'); setUpiId('ashieq@upi'); }}
                    >
                      <span className="app-dot bhim"></span> BHIM UPI
                    </button>
                  </div>

                  {/* UPI VPA Field */}
                  <div className="viva-field" style={{ marginTop: '0.9rem' }}>
                    <label>Virtual Payment Address (UPI ID)</label>
                    <div className="upi-input-wrap">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobile@upi or username@oksbi"
                      />
                      <span className="upi-verified-badge">✓ Active VPA</span>
                    </div>
                  </div>

                  {/* Dynamic QR Code Section */}
                  <div className="viva-qr-container">
                    <div className="qr-toggle-header">
                      <span>Dynamic Merchant QR Code</span>
                      <span className="qr-timer">⏱️ Expires in {formatCountdown(qrCountdown)}</span>
                    </div>

                    {showQr && (
                      <div className="qr-display-box">
                        {/* High Quality Simulated Vector QR */}
                        <div className="vector-qr-wrap">
                          <svg className="simulated-qr-svg" viewBox="0 0 100 100" width="140" height="140">
                            {/* Position Detection Squares */}
                            <rect x="5" y="5" width="28" height="28" fill="#111827" rx="3" />
                            <rect x="9" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                            <rect x="13" y="13" width="12" height="12" fill="#111827" rx="1" />

                            <rect x="67" y="5" width="28" height="28" fill="#111827" rx="3" />
                            <rect x="71" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                            <rect x="75" y="13" width="12" height="12" fill="#111827" rx="1" />

                            <rect x="5" y="67" width="28" height="28" fill="#111827" rx="3" />
                            <rect x="9" y="71" width="20" height="20" fill="#ffffff" rx="2" />
                            <rect x="13" y="75" width="12" height="12" fill="#111827" rx="1" />

                            {/* Data Matrix Dots */}
                            <circle cx="40" cy="12" r="3" fill="#111827" />
                            <circle cx="50" cy="18" r="2.5" fill="#c5a880" />
                            <circle cx="58" cy="10" r="2.5" fill="#111827" />
                            <circle cx="44" cy="28" r="3" fill="#111827" />
                            <circle cx="56" cy="26" r="2.5" fill="#111827" />

                            <circle cx="15" cy="45" r="3" fill="#111827" />
                            <circle cx="25" cy="40" r="2.5" fill="#111827" />
                            <circle cx="20" cy="55" r="3" fill="#c5a880" />

                            {/* Center Luxury Emblem */}
                            <rect x="36" y="36" width="28" height="28" fill="#ffffff" rx="4" stroke="#c5a880" strokeWidth="1.5" />
                            <text x="50" y="54" textAnchor="middle" fontSize="13" fontWeight="900" fill="#c5a880">SW</text>

                            {/* Lower Matrix */}
                            <circle cx="45" cy="75" r="2.5" fill="#111827" />
                            <circle cx="55" cy="70" r="3" fill="#111827" />
                            <circle cx="65" cy="80" r="2.5" fill="#c5a880" />
                            <circle cx="75" cy="65" r="3" fill="#111827" />
                            <circle cx="85" cy="72" r="2.5" fill="#111827" />
                            <circle cx="82" cy="85" r="3" fill="#111827" />
                          </svg>
                        </div>
                        <div className="qr-info-meta">
                          <div className="qr-target-merchant">ShopWave Atelier Verified Merchant</div>
                          <div className="qr-target-amt">Amount: ₹{grandTotal.toLocaleString('en-IN')}</div>
                          <div className="qr-scan-hint">Scan with any UPI application on your smartphone to pay</div>
                          <button
                            type="button"
                            className="btn-viva-approve"
                            onClick={() => {
                              addToast('Simulating mobile UPI app notification approval... 📲', 'info');
                              handlePay();
                            }}
                          >
                            ⚡ One-Click Simulate UPI Push Approval
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: CREDIT / DEBIT CARD */}
              {activeTab === 'card' && (
                <div className="viva-channel-panel">
                  {/* 3D Glassmorphic Interactive Virtual Card */}
                  <div
                    className="viva-virtual-card"
                    style={{ background: currentBrand.bg }}
                  >
                    <div className="vcard-gloss-overlay"></div>
                    <div className="vcard-top">
                      <div className="vcard-chip-gold">
                        <div className="chip-lines"></div>
                      </div>
                      <span className="vcard-network-badge" style={{ color: '#ffffff' }}>
                        {currentBrand.name}
                      </span>
                    </div>

                    <div className="vcard-number-display">
                      {card.number || '•••• •••• •••• ••••'}
                    </div>

                    <div className="vcard-footer">
                      <div className="vcard-holder">
                        <span className="vcard-label">CARD HOLDER</span>
                        <span className="vcard-value">{card.name || 'YOUR NAME'}</span>
                      </div>
                      <div className="vcard-expires">
                        <span className="vcard-label">EXPIRES</span>
                        <span className="vcard-value">{card.expiry || 'MM/YY'}</span>
                      </div>
                      <div className="vcard-cvv-preview">
                        <span className="vcard-label">CVV</span>
                        <span className="vcard-value">{card.cvv ? '•••' : '•••'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-demo-bar">
                    <span className="hint-text">Pre-loaded Viva Test Credentials:</span>
                    <button type="button" className="btn-viva-fill" onClick={fillDemoCard}>
                      ⚡ Auto-Fill Demo Card
                    </button>
                  </div>

                  <div className="viva-field" style={{ marginTop: '0.6rem' }}>
                    <label>Card Number (16 Digits)</label>
                    <input
                      type="text"
                      value={card.number}
                      onChange={handleCardNumberChange}
                      placeholder="4532 8920 1934 7721"
                      maxLength="19"
                    />
                  </div>

                  <div className="viva-input-row-2" style={{ marginTop: '0.6rem' }}>
                    <div className="viva-field">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                        placeholder="NAME ON CARD"
                      />
                    </div>
                    <div className="viva-input-row-2">
                      <div className="viva-field">
                        <label>Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={card.expiry}
                          onChange={handleExpiryChange}
                          placeholder="08/29"
                          maxLength="5"
                        />
                      </div>
                      <div className="viva-field">
                        <label>CVV</label>
                        <input
                          type="password"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                          placeholder="821"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NET BANKING */}
              {activeTab === 'netbanking' && (
                <div className="viva-channel-panel">
                  <p className="viva-panel-desc">
                    Select your bank to route through encrypted Core Banking Gateway:
                  </p>
                  <div className="banks-interactive-grid">
                    {banks.map((b) => (
                      <div
                        key={b.id}
                        className={`bank-tile ${selectedBank === b.id ? 'active' : ''}`}
                        onClick={() => setSelectedBank(b.id)}
                      >
                        <div className="bank-meta">
                          <span className="bank-name">{b.name}</span>
                          <span className="bank-tag">{b.tag}</span>
                        </div>
                        <div className="bank-status-check">
                          {selectedBank === b.id ? '✓ Selected' : '○'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: COD */}
              {activeTab === 'cod' && (
                <div className="viva-channel-panel">
                  <div className="cod-security-box">
                    <span className="cod-box-icon">📦</span>
                    <div>
                      <h4 className="cod-title">Cash / UPI Doorstep Delivery</h4>
                      <p className="cod-desc">
                        Pay with cash or scan dynamic delivery courier QR code upon arrival.
                        Doorstep deliveries are protected with contactless OTP verification.
                      </p>
                    </div>
                  </div>

                  <div className="viva-field" style={{ marginTop: '0.8rem' }}>
                    <label>Enter Delivery Confirmation OTP (Simulated: <strong>{simulatedOtp}</strong>)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        value={codOtp}
                        onChange={(e) => setCodOtp(e.target.value)}
                        placeholder="Enter 4291"
                        maxLength="4"
                      />
                      <button
                        type="button"
                        className="btn-viva-fill"
                        style={{ whiteSpace: 'nowrap' }}
                        onClick={() => setCodOtp(simulatedOtp)}
                      >
                        ⚡ Fill OTP ({simulatedOtp})
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="viva-modal-footer">
              <button
                type="button"
                className="btn-viva-pay-main"
                onClick={handlePay}
              >
                {activeTab === 'cod'
                  ? 'Confirm COD Order Handover 📦'
                  : `Authorize & Pay ₹${grandTotal.toLocaleString('en-IN')} Securely 🔒`}
              </button>

              <div className="viva-security-trust-bar">
                <span>🛡️ RBI Approved Simulation</span>
                <span>•</span>
                <span>🔒 256-Bit TLS 1.3</span>
                <span>•</span>
                <span>⚡ Instant Settlement</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING ANIMATION */}
        {step === 'processing' && (
          <div className="viva-processing-view">
            <div className="viva-radar-spinner">
              <div className="radar-core">
                <span className="lock-glyph">🔒</span>
              </div>
              <div className="radar-wave wave-1"></div>
              <div className="radar-wave wave-2"></div>
            </div>

            <h3 className="viva-proc-heading">Processing Simulated Transaction</h3>
            <p className="viva-proc-status">{processStatus}</p>

            <div className="viva-progress-bar-wrap">
              <div
                className="viva-progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <p className="viva-proc-sub">
              Connecting to ShopWave Secure Terminal • Handshake in progress...
            </p>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION & RECEIPT */}
        {step === 'success' && confirmedOrder && (
          <div className="viva-success-view">
            <div className="success-crest-badge">
              <span className="crest-glyph">✓</span>
            </div>

            <h3 className="success-heading">Payment Verified & Confirmed!</h3>
            <p className="success-message">
              Your transaction has successfully settled on the ShopWave platform.
            </p>

            {/* Receipt Card */}
            <div className="viva-receipt-card">
              <div className="receipt-row">
                <span className="rc-k">Order Number:</span>
                <span className="rc-v mono highlight">{confirmedOrder.id}</span>
              </div>
              <div className="receipt-row">
                <span className="rc-k">Bank Txn Ref:</span>
                <span className="rc-v mono">{confirmedOrder.payment?.transactionId}</span>
              </div>
              <div className="receipt-row">
                <span className="rc-k">Payment Method:</span>
                <span className="rc-v uppercase">{confirmedOrder.payment?.method} (Simulated Gateway)</span>
              </div>
              <div className="receipt-row">
                <span className="rc-k">Amount Settled:</span>
                <span className="rc-v gold font-lg">₹{confirmedOrder.pricing.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="receipt-row">
                <span className="rc-k">Shipping To:</span>
                <span className="rc-v">{confirmedOrder.customer.name}, {confirmedOrder.customer.city}</span>
              </div>
              <div className="receipt-row">
                <span className="rc-k">Estimated Handover:</span>
                <span className="rc-v">Complimentary Express (Within 48h)</span>
              </div>
            </div>

            <div className="viva-success-actions">
              <button
                type="button"
                className="btn-viva-invoice"
                onClick={printInvoice}
              >
                📄 View & Print Official Tax Invoice
              </button>
              <button
                type="button"
                className="btn-viva-continue"
                onClick={onClose}
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
