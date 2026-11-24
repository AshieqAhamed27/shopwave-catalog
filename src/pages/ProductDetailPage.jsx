import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, formatPrice, getDiscount, renderStars } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import PaymentModal from '../components/PaymentModal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Zoom magnifier state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const mainImageRef = useRef(null);

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

  // Default selections
  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : null);
  const currentColor = selectedColor || (product.colors ? product.colors[0] : null);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.images[activeImage]})`,
      backgroundSize: '250%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      setPincodeStatus({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code' });
      return;
    }
    setPincodeStatus({
      valid: true,
      deliveryDate: 'Tomorrow, 9 PM',
      charges: 'FREE',
      codAvailable: true
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    setIsPaymentOpen(true);
  };

  return (
    <main className="page pdp-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
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

        {/* Amazon/Flipkart 2-Column Product Layout */}
        <div className="pdp-layout-grid">
          {/* Left Column: Visual Gallery + Action Buttons */}
          <div className="pdp-gallery-column">
            <div className="pdp-visual-container">
              {/* Vertical Thumbnail Strip */}
              <div className="pdp-thumbnail-strip">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`pdp-thumb-box${activeImage === i ? ' active' : ''}`}
                    onMouseEnter={() => setActiveImage(i)}
                    onClick={() => setActiveImage(i)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${i + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = './placeholder.svg';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image with Zoom Pan */}
              <div
                className="pdp-main-image-wrap"
                ref={mainImageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="pdp-main-image"
                  id="product-main-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = './placeholder.svg';
                  }}
                />

                {/* Wishlist floating toggle */}
                <button
                  className={`pdp-wishlist-float${inWishlist ? ' active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-label="Wishlist"
                >
                  {inWishlist ? '♥' : '♡'}
                </button>

                {/* Zoom Pan Overlay */}
                <div className="pdp-zoom-overlay" style={zoomStyle} />
              </div>
            </div>

            {/* High-Conversion Flipkart Style Action Buttons */}
            <div className="pdp-action-buttons">
              <button
                className="pdp-btn pdp-btn-cart"
                id={`detail-add-cart-${product.id}`}
                onClick={() => addToCart(product)}
              >
                <span className="btn-icon">🛒</span> ADD TO CART
              </button>
              <button
                className="pdp-btn pdp-btn-buy"
                id={`detail-buy-now-${product.id}`}
                onClick={handleBuyNow}
              >
                <span className="btn-icon">⚡</span> BUY NOW
              </button>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Offers & Specs */}
          <div className="pdp-info-column">
            {/* Brand Header */}
            <div className="pdp-brand-row">
              <span className="pdp-brand-name">{product.brand || 'SHOPWAVE SIGNATURE'}</span>
              <span className="pdp-brand-store-link">Visit the Store</span>
            </div>

            {/* Product Title */}
            <h1 className="pdp-product-title">{product.name}</h1>

            {/* Rating Banner & Flipkart Assured Pill */}
            <div className="pdp-rating-row">
              <div className="fk-rating-pill-lg">
                <span>{product.rating}</span>
                <span className="star-icon">★</span>
              </div>
              <span className="pdp-rating-reviews">
                {product.reviewCount ? product.reviewCount.toLocaleString() : '3,420'} Ratings & {Math.round(product.reviewCount * 0.15 || 450)} Reviews
              </span>
              {product.assured && (
                <span className="pdp-assured-tag" title="100% Quality Assured by ShopWave">
                  <span className="assured-lightning">⚡</span> Assured
                </span>
              )}
            </div>

            {/* Flipkart / Amazon Pricing Box */}
            <div className="pdp-price-container">
              <div className="pdp-price-row">
                <span className="pdp-price-special">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="pdp-price-mrp">{formatPrice(product.originalPrice)}</span>
                )}
                {discount && (
                  <span className="pdp-discount-pill">{discount}% off</span>
                )}
              </div>
              <p className="pdp-tax-note">Inclusive of all taxes</p>
            </div>

            {/* Flipkart Bank & Partner Offers Section */}
            <div className="pdp-offers-box">
              <h3 className="offers-title">🏷️ Available Offers</h3>
              <ul className="offers-list">
                <li>
                  <strong className="offer-tag">Bank Offer</strong> 10% instant discount up to ₹500 on HDFC & SBI Credit Cards on orders above ₹1,999.
                </li>
                <li>
                  <strong className="offer-tag">Special Price</strong> Get extra ₹150 off on your first order with coupon code <code>SHOPWAVE150</code>.
                </li>
                <li>
                  <strong className="offer-tag">Partner Offer</strong> Sign up for ShopWave Pay Later and get ₹100 cashback on your next purchase.
                </li>
                <li>
                  <strong className="offer-tag">No Cost EMI</strong> Standard EMI options available starting at ₹{Math.round(product.price / 6)}/month.
                </li>
              </ul>
            </div>

            {/* Size Selector for Apparel / Shoes / Accessories */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pdp-variant-section">
                <div className="pdp-variant-header">
                  <span className="variant-label">Select Size:</span>
                  <button
                    type="button"
                    className="pdp-size-guide-trigger"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                  >
                    📏 Size Chart
                  </button>
                </div>
                <div className="pdp-size-pills">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`pdp-size-pill${currentSize === sz ? ' selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Expandable Size Guide */}
                {showSizeGuide && (
                  <div className="pdp-size-guide-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Chest (in)</th>
                          <th>Waist (in)</th>
                          <th>Length (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>S</td><td>38</td><td>30</td><td>27.5</td></tr>
                        <tr><td>M</td><td>40</td><td>32</td><td>28.5</td></tr>
                        <tr><td>L</td><td>42</td><td>34</td><td>29.5</td></tr>
                        <tr><td>XL</td><td>44</td><td>36</td><td>30.5</td></tr>
                        <tr><td>XXL</td><td>46</td><td>38</td><td>31.5</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="pdp-variant-section">
                <span className="variant-label">Color: <strong>{currentColor}</strong></span>
                <div className="pdp-color-swatches">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`pdp-color-chip${currentColor === c ? ' selected' : ''}`}
                      onClick={() => setSelectedColor(c)}
                      title={c}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Pincode Checker */}
            <div className="pdp-delivery-box">
              <span className="delivery-title">Delivery & Services</span>
              <form onSubmit={checkPincode} className="pdp-pincode-form">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="pdp-pincode-input"
                />
                <button type="submit" className="pdp-pincode-btn">Check</button>
              </form>

              {pincodeStatus && (
                <div className={`pdp-pincode-result${pincodeStatus.valid ? ' success' : ' error'}`}>
                  {pincodeStatus.valid ? (
                    <>
                      <div className="delivery-item">
                        <span className="check-icon">✓</span> Delivery by <strong>{pincodeStatus.deliveryDate}</strong> | <strong>FREE</strong>
                      </div>
                      <div className="delivery-item">
                        <span className="check-icon">✓</span> Cash on Delivery Available
                      </div>
                      <div className="delivery-item">
                        <span className="check-icon">✓</span> 7 Days Replacement Policy
                      </div>
                    </>
                  ) : (
                    <div className="error-text">{pincodeStatus.message}</div>
                  )}
                </div>
              )}
            </div>

            {/* Product Highlights / Specifications (Flipkart table) */}
            <div className="pdp-specs-section">
              <h3 className="specs-heading">Product Specifications</h3>
              <table className="pdp-specs-table">
                <tbody>
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key}>
                        <td className="spec-label">{key}</td>
                        <td className="spec-value">{val}</td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr><td className="spec-label">Brand</td><td className="spec-value">{product.brand || 'ShopWave'}</td></tr>
                      <tr><td className="spec-label">Category</td><td className="spec-value">{product.category}</td></tr>
                      <tr><td className="spec-label">Warranty</td><td className="spec-value">1 Year Domestic Warranty</td></tr>
                      <tr><td className="spec-label">Country of Origin</td><td className="spec-value">India</td></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* What's in the box / Key features */}
            <div className="pdp-features-section">
              <h3 className="features-heading">Key Features & Description</h3>
              <p className="pdp-description-text">{product.description}</p>
              <div className="feature-list">
                {product.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-check">✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="product-meta-tags">
              {product.tags.map((tag, i) => (
                <span key={i} className="meta-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {related.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <span className="section-label">Customers Also Viewed</span>
              <h2 className="section-title">Similar <span className="gradient-text">Products</span></h2>
            </div>
            <div className="products-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal for Instant Buy Now */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={[{ ...product, quantity: 1 }]}
        totalAmount={product.price}
      />
    </main>
  );
}
