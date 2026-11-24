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
      <aside className="cart-drawer" aria-label="Shopping cart">
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">Your Cart {cart.length > 0 && `(${cart.length})`}</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">Your cart is empty.<br />Start adding products!</p>
              <button className="btn btn-primary btn-sm" onClick={() => setCartOpen(false)}>
                Browse Products
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = './placeholder.svg';
                  }}
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-value">{formatPrice(cartTotal)}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Free express shipping on all orders over ₹999
            </p>
            <button
              className="btn btn-primary cart-checkout-btn"
              id="checkout-btn"
              onClick={() => setIsPaymentOpen(true)}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onPaymentSuccess={() => {
          clearCart();
          addToast('Payment verified & order confirmed! 🎉', 'success');
        }}
      />
    </>
  );
}
