import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';

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
        p.tags.some(t => t.toLowerCase().includes(q))
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
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-banner-bg" />
        <div className="container" style={{ position: 'relative' }}>
          <h1 className="page-banner-title">
            All <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Products</span>
          </h1>
          <p className="page-banner-subtitle">
            {products.length} premium products across {categories.length - 1} categories
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
        {/* Category Pills */}
        <div className="categories-bar" style={{ marginBottom: '1.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
              id={`cat-filter-${cat.id}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="category-pill-icon">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="filter-toolbar">
          <div className="filter-left">
            {/* Search */}
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                id="product-search"
                placeholder="Search products, brands, tags…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="results-count">
              <strong>{filtered.length}</strong> products found
            </span>
          </div>

          {/* Sort */}
          <select
            className="sort-select"
            id="product-sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="products-empty">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No products found</h3>
            <p className="empty-desc">Try adjusting your search or filters.</p>
            <button
              className="btn btn-primary"
              onClick={() => { setSearch(''); setCategory('all'); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
