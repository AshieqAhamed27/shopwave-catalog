import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleCardClick = (e) => {
    if (e.target.closest('.gucci-card-wishlist') || e.target.closest('.gucci-quick-bag-btn') || e.target.closest('.gucci-angle-dot')) return;
    navigate(`/products/${product.id}`);
  };

  // Fixed: Do NOT flip image on card hover. Stays consistent on the chosen packshot.
  const currentImage = (product.images && product.images[activeImageIndex]) || product.images?.[0] || './placeholder.svg';

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="gucci-luxury-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={product.name}
    >
      {/* Visual Frame */}
      <div className="gucci-card-media-wrap">
        <img
          src={currentImage}
          alt={product.name}
          className="gucci-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './placeholder.svg';
          }}
        />

        {/* E-Commerce Status Badge */}
        {product.badge && (
          <span className="gucci-card-badge">
            {product.badge === 'hot' ? 'BESTSELLER' :
             product.badge === 'new' ? 'NEW ARRIVAL' :
             product.badge === 'limited' ? 'LIMITED EDITION' : product.badge.toUpperCase()}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          className={`gucci-card-wishlist${inWishlist ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          title={inWishlist ? 'Remove from Saved Items' : 'Save to Wishlist'}
          aria-label="Save to Wishlist"
        >
          {inWishlist ? '♥' : '♡'}
        </button>

        {/* Angle Preview Dots */}
        {product.images && product.images.length > 1 && (
          <div className="gucci-angle-dots">
            {product.images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`gucci-angle-dot${activeImageIndex === idx ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                aria-label={`View angle ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Quick Add Overlay on Hover */}
        <div className="gucci-card-hover-actions">
          <button
            type="button"
            className="gucci-quick-bag-btn"
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          >
            + ADD TO BAG
          </button>
        </div>
      </div>

      {/* Aligned Card Body */}
      <div className="gucci-card-body">
        {/* Category & Collection Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.35rem' }}>
          <span className="gucci-card-collection">
            {product.tags?.[0] || product.category.toUpperCase()}
          </span>
          {product.rating && (
            <span style={{ fontSize: '0.72rem', color: '#c5a059', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              ★ {product.rating} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>({product.reviewCount || 120})</span>
            </span>
          )}
        </div>

        {/* Title (2-line clamped with fixed min-height for baseline alignment) */}
        <h3 className="gucci-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Size Availability Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            Sizes: <span style={{ color: 'rgba(255,255,255,0.75)' }}>{product.sizes.slice(0, 5).join(' · ')}</span>
          </div>
        )}

        {/* Real E-Commerce Price with Strike-through & Discount */}
        <div className="gucci-card-price" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.05rem' }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                {formatPrice(product.originalPrice)}
              </span>
              <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 700 }}>
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        {/* Delivery / Guarantee Note */}
        <span className="gucci-card-service-note" style={{ marginTop: '0.45rem' }}>
          {product.deliveryDays === 1 ? '⚡ Next-Day Delivery • ' : ''}Free 30-Day Returns
        </span>
      </div>
    </article>
  );
}
