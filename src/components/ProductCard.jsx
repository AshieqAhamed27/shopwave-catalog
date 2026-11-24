import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('.gucci-card-wishlist') || e.target.closest('.gucci-quick-bag-btn') || e.target.closest('.gucci-angle-dot')) return;
    navigate(`/products/${product.id}`);
  };

  const currentImage = (isHovered && product.images && product.images.length > 1)
    ? product.images[activeImageIndex === 0 ? 1 : activeImageIndex]
    : (product.images && product.images[activeImageIndex]) || product.images?.[0] || './placeholder.svg';

  return (
    <article
      className="gucci-luxury-card"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActiveImageIndex(0); }}
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

        {/* Minimal Luxury Badge */}
        {product.badge && (
          <span className="gucci-card-badge">
            {product.badge === 'hot' ? 'SIGNATURE' :
             product.badge === 'new' ? 'NEW COLLECTION' :
             product.badge === 'limited' ? 'EXCLUSIVITY' : product.badge.toUpperCase()}
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
                className={`gucci-angle-dot${(activeImageIndex === idx || (isHovered && activeImageIndex === 0 && idx === 1)) ? ' active' : ''}`}
                onMouseEnter={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
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
            + ADD TO SHOPPING BAG
          </button>
        </div>
      </div>

      {/* Aligned Card Body */}
      <div className="gucci-card-body">
        {/* Collection / Line */}
        <span className="gucci-card-collection">
          {product.tags?.[0] || 'GUCCI FLORENCE'}
        </span>

        {/* Title */}
        <h3 className="gucci-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="gucci-card-price">
          {formatPrice(product.price)}
        </div>

        {/* Complimentary Service Note */}
        <span className="gucci-card-service-note">
          Complimentary Delivery & Gift Packaging
        </span>
      </div>
    </article>
  );
}
