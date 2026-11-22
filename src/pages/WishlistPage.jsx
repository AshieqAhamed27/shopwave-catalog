import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <main className="page">
      {/* Banner */}
      <div className="page-banner">
        <div className="page-banner-bg" />
        <div className="container" style={{ position: 'relative' }}>
          <h1 className="page-banner-title">
            My <span style={{ background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Wishlist</span>
          </h1>
          <p className="page-banner-subtitle">
            {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-icon">♡</div>
            <h2 className="empty-title">Your wishlist is empty</h2>
            <p className="empty-desc">
              Browse our products and click the heart icon to save your favorites here.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg" id="wishlist-browse-btn">
              Browse Products →
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
              </p>
              <Link to="/products" className="btn btn-outline btn-sm">
                Continue Shopping
              </Link>
            </div>
            <div className="products-grid">
              {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
