import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';
import PaymentModal from './PaymentModal';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, clearCart, cartTotal, addToast } = useShop();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" aria-label="Shopping bag">
        {/* Header */}
        <div className="cart-header" style={{ borderBottom: '1px solid var(--border-subtle)', padding: '1.25rem 1.5rem' }}>
          <h2 className="cart-title" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em', fontSize: '1.25rem' }}>
            Shopping Bag {cart.length > 0 && `(${cart.length})`}
          </h2>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close bag">✕</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
              <div className="cart-empty-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--gold-primary)' }}>✦</div>
              <p className="cart-empty-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '1.5rem' }}>
                Your Shopping Bag is empty.
              </p>
              <button className="btn-gucci-solid-lg" onClick={() => setCartOpen(false)}>
                Explore Creations
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '1.25rem 1.5rem' }}>
                <img
                  src={item.images?.[0] || './placeholder.svg'}
                  alt={item.name}
                  className="cart-item-image"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', background: '#0a0a0a', border: '1px solid var(--border-subtle)' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = './placeholder.svg';
                  }}
                />
                <div className="cart-item-info">
                  <p className="cart-item-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>
                    {item.name}
                  </p>
                  <p className="cart-item-price" style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.95rem' }}>
                    {formatPrice(item.price)}
                  </p>
                  <div className="cart-item-controls" style={{ marginTop: '0.5rem' }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove piece"
                      aria-label="Remove piece"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer" style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.5rem' }}>
            <div className="cart-subtotal" style={{ marginBottom: '0.75rem' }}>
              <span className="cart-subtotal-label" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Estimated Total</span>
              <span className="cart-subtotal-value" style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
                {formatPrice(cartTotal)}
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--gold-primary)', marginBottom: '1.25rem', letterSpacing: '0.04em' }}>
              ✦ Complimentary express delivery & signature gift packaging included
            </p>
            <button
              className="btn-gucci-gold-lg"
              id="checkout-btn"
              style={{ width: '100%' }}
              onClick={() => setIsPaymentOpen(true)}
            >
              PROCEED TO PURCHASE →
            </button>
          </div>
        )}
      </aside>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={cart}
        totalAmount={cartTotal}
        onPaymentSuccess={() => {
          clearCart();
          addToast('Payment verified & order confirmed! 🎉', 'success');
        }}
      />
    </>
  );
}
