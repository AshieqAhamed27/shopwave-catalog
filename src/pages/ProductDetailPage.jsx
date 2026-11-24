import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import PaymentModal from '../components/PaymentModal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('craftsmanship'); // 'craftsmanship' or 'details' or 'delivery'

  // Zoom state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const mainImageRef = useRef(null);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <main className="page">
        <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', letterSpacing: '0.1em' }}>
            Piece Not Found
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
            The requested creation is currently unavailable in the online catalog.
          </p>
          <Link to="/products" className="btn-gucci-solid">Return to Collection</Link>
        </div>
      </main>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const currentColor = selectedColor || (product.colors ? product.colors[0] : null);
  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : null);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.images[activeImage]})`,
      backgroundSize: '240%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleBuyNow = () => {
    addToCart(product);
    setIsPaymentOpen(true);
  };

  return (
    <main className="page gucci-pdp-page">
      <div className="container">
        {/* Minimalist Editorial Breadcrumb */}
        <nav className="gucci-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">GUCCI</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/products">COLLECTIONS</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category.toUpperCase()}
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Gucci Split Stage */}
        <div className="gucci-pdp-layout">
          {/* Visual Gallery Column */}
          <div className="gucci-pdp-gallery">
            <div className="gucci-gallery-container">
              {/* Vertical Thumbnail Strip */}
              <div className="gucci-thumbs-strip">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`gucci-thumb-btn${activeImage === i ? ' active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View creation angle ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = './placeholder.svg';
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Main Image Stage */}
              <div
                className="gucci-main-stage"
                ref={mainImageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="gucci-main-stage-img"
                  id="product-main-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = './placeholder.svg';
                  }}
                />

                {/* Floating Wishlist Button */}
                <button
                  className={`gucci-pdp-wishlist-btn${inWishlist ? ' active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={inWishlist ? 'Remove from Saved Items' : 'Save to Wishlist'}
                  aria-label="Wishlist"
                >
                  {inWishlist ? '♥' : '♡'}
                </button>

                {/* Zoom Pan Lens */}
                <div className="gucci-pdp-zoom-overlay" style={zoomStyle} />
              </div>
            </div>

            {/* Atelier Heritage Tag */}
            <div className="gucci-atelier-tag">
              <span className="atelier-crest">✦</span>
              <span>HANDCRAFTED IN FLORENCE, ITALY — ARCHIVAL HERITAGE</span>
            </div>
          </div>

          {/* Product Details & Purchase Column */}
          <div className="gucci-pdp-details">
            <div className="gucci-details-header">
              <span className="gucci-pdp-line-tag">
                {product.tags?.[0] || 'GUCCI SIGNATURE'}
              </span>
              <h1 className="gucci-pdp-title">{product.name}</h1>
              <div className="gucci-pdp-price">
                {formatPrice(product.price)}
              </div>
              <p className="gucci-pdp-tax-note">
                Complimentary express delivery & taxes included
              </p>
            </div>

            {/* Colorway / Variations */}
            {product.colors && product.colors.length > 0 && (
              <div className="gucci-variant-block">
                <span className="variant-title">
                  COLOR: <strong style={{ color: '#ffffff' }}>{currentColor}</strong>
                </span>
                <div className="gucci-color-pills">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`gucci-color-pill${currentColor === c ? ' active' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options (For Shoes / Apparel / Rings / Belts) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="gucci-variant-block">
                <div className="variant-title-row">
                  <span className="variant-title">
                    SIZE: <strong style={{ color: '#ffffff' }}>{currentSize}</strong>
                  </span>
                  <span className="gucci-size-guide-link">Size & Fit Guide</span>
                </div>
                <div className="gucci-size-grid">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`gucci-size-btn${currentSize === sz ? ' active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Luxury Action Buttons */}
            <div className="gucci-pdp-actions">
              <button
                type="button"
                className="btn-gucci-solid-lg"
                id={`detail-add-cart-${product.id}`}
                onClick={() => addToCart(product)}
              >
                ADD TO SHOPPING BAG
              </button>
              <button
                type="button"
                className="btn-gucci-gold-lg"
                id={`detail-buy-now-${product.id}`}
                onClick={handleBuyNow}
              >
                PURCHASE & CHECKOUT NOW
              </button>
            </div>

            {/* Gucci Client Services Box */}
            <div className="gucci-services-box">
              <div className="gucci-service-row">
                <span className="service-icon">🎁</span>
                <div>
                  <h4 className="service-title">Signature Gucci Gift Packaging</h4>
                  <p className="service-sub">Delivered in an archival green gift box hand-tied with a satin ribbon.</p>
                </div>
              </div>
              <div className="gucci-service-row">
                <span className="service-icon">🚚</span>
                <div>
                  <h4 className="service-title">Complimentary Insured Delivery</h4>
                  <p className="service-sub">Dispatched via secure armored courier with live signature verification.</p>
                </div>
              </div>
              <div className="gucci-service-row">
                <span className="service-icon">🔄</span>
                <div>
                  <h4 className="service-title">Complimentary 30-Day Returns</h4>
                  <p className="service-sub">Doorstep collection and exchange service available worldwide.</p>
                </div>
              </div>
            </div>

            {/* Editorial Information Tabs */}
            <div className="gucci-pdp-tabs">
              <div className="tabs-header">
                <button
                  type="button"
                  className={`tab-title-btn${activeTab === 'craftsmanship' ? ' active' : ''}`}
                  onClick={() => setActiveTab('craftsmanship')}
                >
                  CRAFTSMANSHIP & STORY
                </button>
                <button
                  type="button"
                  className={`tab-title-btn${activeTab === 'details' ? ' active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  SPECIFICATIONS
                </button>
              </div>

              <div className="tab-body">
                {activeTab === 'craftsmanship' ? (
                  <div className="tab-pane">
                    <p className="gucci-story-text">{product.description}</p>
                    <ul className="gucci-features-list">
                      {product.features?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="tab-pane">
                    <table className="gucci-specs-table">
                      <tbody>
                        {product.specifications && Object.entries(product.specifications).map(([k, v]) => (
                          <tr key={k}>
                            <td className="spec-k">{k}</td>
                            <td className="spec-v">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curated Recommendations */}
        {related.length > 0 && (
          <div className="gucci-related-section">
            <div className="gucci-section-header">
              <span className="section-eyebrow">CURATED COMPLEMENTS</span>
              <h2 className="section-main-title">You May Also Admire</h2>
            </div>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={[{ ...product, quantity: 1 }]}
        totalAmount={product.price}
      />
    </main>
  );
}
