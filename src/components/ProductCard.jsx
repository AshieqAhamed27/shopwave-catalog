import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice, getDiscount } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const discount = getDiscount(product.price, product.originalPrice);

  const handleCardClick = (e) => {
    // Don't navigate if clicking action buttons or thumbnail dots
    if (e.target.closest('.product-card-actions') || e.target.closest('.add-to-cart-btn') || e.target.closest('.card-thumb-dot')) return;
    navigate(`/products/${product.id}`);
  };

  // On hover, show image 1 (flip view) if available, otherwise image 0
  const currentImage = (isHovered && product.images && product.images.length > 1)
    ? product.images[activeImageIndex === 0 ? 1 : activeImageIndex]
    : (product.images && product.images[activeImageIndex]) || product.images?.[0] || './placeholder.svg';

  return (
    <article
      className="product-card fk-style-card"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActiveImageIndex(0); }}
      role="button"
      tabIndex={0}
    >
      {/* Image Container */}
      <div className="product-card-image-wrapper">
        <img
          src={currentImage}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './placeholder.svg';
          }}
        />

        {/* Badge */}
        {product.badge && (
          <span className={`product-card-badge badge-${product.badge}`}>
            {product.badge === 'hot' ? '🔥 Hot Deal' :
             product.badge === 'new' ? '✨ New' :
             product.badge === 'sale' ? '💰 Sale' :
             product.badge === 'limited' ? '⏳ Limited' : product.badge}
          </span>
        )}

        {/* Wishlist and Quick View Actions */}
        <div className="product-card-actions">
          <button
            className={`product-action-btn${inWishlist ? ' in-wishlist' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            id={`wishlist-btn-${product.id}`}
          >
            {inWishlist ? '♥' : '♡'}
          </button>
          <button
            className="product-action-btn"
            onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}`); }}
            title="Quick view"
          >
            👁
          </button>
        </div>

        {/* Multi-angle preview dots */}
        {product.images && product.images.length > 1 && (
          <div className="card-thumb-dots">
            {product.images.slice(0, 4).map((_, idx) => (
              <span
                key={idx}
                className={`card-thumb-dot${(activeImageIndex === idx || (isHovered && activeImageIndex === 0 && idx === 1)) ? ' active' : ''}`}
                onMouseEnter={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="product-card-body">
        {/* Brand Name */}
        <div className="product-card-brand-row">
          <span className="product-card-brand">{product.brand || 'ShopWave'}</span>
          {product.assured && (
            <span className="fk-assured-pill" title="ShopWave Assured Quality">
              <span className="assured-lightning">⚡</span> Assured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="product-card-name" title={product.name}>
          {product.name}
        </h3>

        {/* Rating Pill & Review Count */}
        <div className="product-card-rating-row">
          <span className="fk-rating-pill">
            {product.rating} <span className="star-icon">★</span>
          </span>
          <span className="fk-rating-count">
            ({product.reviewCount ? product.reviewCount.toLocaleString() : '1,240'})
          </span>
        </div>

        {/* Sizes Preview for apparel/shoes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="product-card-sizes-row">
            <span className="sizes-label">Size:</span>
            <span className="sizes-list">
              {product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 ? '+' : ''}
            </span>
          </div>
        )}

        {/* Price Row (Flipkart / Amazon format) */}
        <div className="product-card-footer">
          <div className="product-price-block">
            <div className="price-row-main">
              <span className="price-current">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="price-original">{formatPrice(product.originalPrice)}</span>
              )}
              {discount && (
                <span className="price-discount-tag">{discount}% off</span>
              )}
            </div>
            <span className="delivery-hint">Free delivery by Tomorrow</span>
          </div>

          <button
            className="add-to-cart-btn"
            id={`add-cart-${product.id}`}
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            title="Add to cart"
            aria-label="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
