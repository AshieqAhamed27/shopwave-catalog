import { Link } from 'react-router-dom';

const atelierHighlights = [
  {
    icon: '✦',
    title: 'Modern Tailored Essentials',
    desc: 'Designed with uncompromising attention to proportion, drape, and stitch density. Wardrobe building blocks made to look sharp effortlessly.',
  },
  {
    icon: '👔',
    title: 'Grade-A Natural Fibers',
    desc: 'We source exclusively from heritage mills: 100% long-staple pinpoint Oxford cotton, French flax linen, selvedge denim, and pure extrafine merino wool.',
  },
  {
    icon: '👖',
    title: 'Authentic Everyday Wear',
    desc: 'From slim-fit button-downs and crisp stretch chinos to selvedge jeans and unstructured wool blazers — pieces designed for modern daily life.',
  },
  {
    icon: '👞',
    title: 'Artisanal Footwear & Goods',
    desc: 'Full-grain calfskin penny loafers, minimal cup-sole sneakers, and vegetable-tanned leather belts handcrafted by seasoned cordwainers.',
  },
  {
    icon: '🎁',
    title: 'Complimentary Express Delivery',
    desc: 'Dispatched in signature matte black boxes with free delivery across India on orders over ₹1,999, backed by easy 30-day doorstep exchanges.',
  },
  {
    icon: '⚡',
    title: 'High-Performance E-Commerce',
    desc: 'Engineered with React 19, Vite, responsive luxury UI architecture, instant payment simulation, and verifiable stock availability.',
  },
];

export default function AboutPage() {
  return (
    <main className="page" style={{ paddingBottom: '6rem' }}>
      {/* Banner */}
      <div className="page-banner" style={{ background: '#090909', borderBottom: '1px solid var(--border-subtle)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.3em', color: 'var(--gold-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
            SHOPWAVE ATELIER • DESIGN MANIFESTO
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em', margin: 0 }}>
            Modern Essentials. Refined.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '1rem auto 0', lineHeight: 1.6 }}>
            Bridging luxury craftsmanship and everyday wearability with timeless silhouettes and ethical tailoring.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem 0' }}>
        {/* Story Section */}
        <div style={{ maxWidth: '820px', margin: '0 auto 5rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--gold-primary)', fontSize: '1.5rem' }}>✦</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#ffffff', margin: '1rem 0 1.25rem' }}>
            Craftsmanship Meets Everyday Living
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            ShopWave Atelier was established with a singular focus: to strip away fleeting trends and excessive markup,
            creating real, wearable garments engineered from the finest natural fibers on earth.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            Every Oxford shirt, selvedge denim pair, and tailored trouser is created with obsessive attention to stitch count,
            tensile durability, and balanced contours — delivering the effortless elegance of quiet luxury to your daily wardrobe.
          </p>
        </div>

        {/* Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
          {atelierHighlights.map((h, i) => (
            <div
              key={i}
              style={{
                background: '#111111',
                border: '1px solid var(--border-subtle)',
                padding: '2rem',
                borderRadius: '2px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{h.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>
                {h.title}
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.65', color: 'var(--text-muted)', margin: 0 }}>
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#0d0d0d', border: '1px solid var(--border-subtle)', padding: '4rem 2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.75rem' }}>
            Elevate Your Everyday Wardrobe
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Discover our full line-up of tailored shirts, stretch chinos, selvedge denim, knitwear, and shoes.
          </p>
          <Link to="/products" className="btn-gucci-solid-lg">
            EXPLORE THE COLLECTION →
          </Link>
        </div>
      </div>
    </main>
  );
}
