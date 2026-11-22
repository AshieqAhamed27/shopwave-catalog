import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatPrice, renderStars } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = (e) => {
    // Don't navigate if clicking action buttons
    if (e.target.closest('.product-card-actions') || e.target.closest('.add-to-cart-btn')) return;
    navigate(`/products/${product.id}`);
  };

  return (
    <article className="product-card" onClick={handleCardClick} role="button" tabIndex={0}>
      {/* Image */}
      <div className="product-card-image-wrapper">
        <img
          src={product.images[0]}
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
            {product.badge === 'hot' ? '🔥 Hot' :
             product.badge === 'new' ? '✨ New' :
             product.badge === 'sale' ? '💰 Sale' :
             product.badge === 'limited' ? '⏳ Limited' : product.badge}
          </span>
        )}

        {/* Hover Actions */}
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
      </div>

      {/* Body */}
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{product.rating}</span>
          <span className="rating-count">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="product-card-footer">
          <div className="product-price">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            className="add-to-cart-btn"
            id={`add-cart-${product.id}`}
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            title="Add to cart"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
