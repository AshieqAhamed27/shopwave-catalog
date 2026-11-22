import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, formatPrice, getDiscount, renderStars } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <main className="page">
        <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
            Product Not Found
          </h1>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </main>
    );
  }

  const discount = getDiscount(product.price, product.originalPrice);
  const inWishlist = isInWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="page">
      <div className="container">
        <div className="product-detail">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to="/products">Products</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to={`/products?category=${product.category}`} style={{ textTransform: 'capitalize' }}>
              {product.category}
            </Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          {/* Detail Grid */}
          <div className="product-detail-grid">
            {/* Images */}
            <div className="product-detail-images">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="product-main-image"
                id="product-main-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = './placeholder.svg';
                }}
              />
              <div className="product-thumbnails">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className={`product-thumb${activeImage === i ? ' active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    id={`product-thumb-${i}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = './placeholder.svg';
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="product-detail-info">
              <p className="product-detail-category">{product.category}</p>
              <h1 className="product-detail-title">{product.name}</h1>

              {/* Rating */}
              <div className="product-detail-rating">
                <span className="stars" style={{ fontSize: '1.1rem' }}>{renderStars(product.rating)}</span>
                <strong style={{ fontSize: '1rem' }}>{product.rating}</strong>
                <span className="review-count">({product.reviewCount.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="product-detail-price">
                <span className="price-current">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="price-original">{formatPrice(product.originalPrice)}</span>
                )}
                {discount && (
                  <span className="discount-badge">{discount}% OFF</span>
                )}
              </div>

              {/* Description */}
              <p className="product-detail-description">{product.description}</p>

              {/* Features */}
              <div className="product-detail-features">
                <p className="detail-features-title">What's Included</p>
                <div className="feature-list">
                  {product.features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-check">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="product-detail-actions">
                <button
                  className="btn btn-primary btn-lg"
                  id={`detail-add-cart-${product.id}`}
                  onClick={() => addToCart(product)}
                >
                  🛒 Add to Cart
                </button>
                <button
                  className={`wishlist-action-btn${inWishlist ? ' active' : ''}`}
                  id={`detail-wishlist-${product.id}`}
                  onClick={() => toggleWishlist(product)}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {inWishlist ? '♥' : '♡'}
                </button>
              </div>

              {/* Tags */}
              <div className="product-meta-tags">
                {product.tags.map((tag, i) => (
                  <span key={i} className="meta-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div style={{ marginTop: '5rem' }}>
              <div className="section-header">
                <span className="section-label">More Like This</span>
                <h2 className="section-title">Related <span className="gradient-text">Products</span></h2>
              </div>
              <div className="products-grid">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
