import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CustomSelect from '../components/CustomSelect';

const sortOptions = [
  { value: 'default', label: 'Sort: Featured Styles' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated ★' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const activeCategory = searchParams.get('category') || 'all';

  const setCategory = (cat) => {
    if (cat === 'all') searchParams.delete('category');
    else searchParams.set('category', cat);
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    // Category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Badge filter
    const badge = searchParams.get('badge');
    if (badge) list = list.filter(p => p.badge === badge);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'popular') list.sort((a, b) => b.reviewCount - a.reviewCount);

    return list;
  }, [activeCategory, search, sort, searchParams]);

  return (
    <main className="page">
      {/* Editorial Collection Banner */}
      <div className="page-banner" style={{ background: '#090909', borderBottom: '1px solid var(--border-subtle)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.3em', color: 'var(--gold-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
            SHOPWAVE ATELIER • READY-TO-WEAR & ACCESSORIES
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
            {activeCategory === 'all' ? 'All Collections' : categories.find(c => c.id === activeCategory)?.label || 'Apparel Collection'}
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.65rem' }}>
            Discover {filtered.length} modern lifestyle essentials crafted with world-class natural fabrics and precision tailoring.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Category Department Bar */}
        <div className="categories-bar" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
              id={`cat-filter-${cat.id}`}
              onClick={() => setCategory(cat.id)}
              style={{
                borderRadius: '2px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                borderColor: activeCategory === cat.id ? 'var(--gold-primary)' : 'var(--border-subtle)',
                background: activeCategory === cat.id ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--gold-light)' : 'var(--text-secondary)'
              }}
            >
              <span className="category-pill-icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter / Search / Sort Bar */}
        <div className="products-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          {/* Search Box */}
          <div className="search-box" style={{ maxWidth: '360px', flex: 1 }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search shirts, chinos, denim, jackets, footwear..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              id="search-input"
              style={{ background: '#0e0e0e', borderColor: 'var(--border-subtle)', fontSize: '0.85rem' }}
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch('')}
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600 }}>
              {filtered.length} {filtered.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
            </span>
            <CustomSelect
              options={sortOptions}
              value={sort}
              onChange={setSort}
              id="sort-select"
            />
          </div>
        </div>

        {/* Aligned Products Grid */}
        {filtered.length === 0 ? (
          <div className="products-empty" style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--gold-primary)' }}>✦</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }}>No Matching Products Found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Try adjusting your search criteria or explore all categories.</p>
            <button
              className="btn-gucci-solid-lg"
              onClick={() => { setSearch(''); setCategory('all'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
