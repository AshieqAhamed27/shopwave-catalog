import { Link } from 'react-router-dom';

const atelierHighlights = [
  {
    icon: '✦',
    title: 'The Florentine Heritage (1921)',
    desc: 'Founded by Guccio Gucci in Florence, Italy. Beginning as a small leather goods workshop inspired by refined luggage at London’s Savoy Hotel, evolving into an icon of world luxury.',
  },
  {
    icon: '👜',
    title: 'Icons of Haute Maroquinerie',
    desc: 'Discover 36 authentic archival creations: the Jackie 1961, Horsebit 1955, Bamboo 1947, Dionysus, and GG Marmont — each handcrafted from full-grain Italian calfskin.',
  },
  {
    icon: '👞',
    title: '70 Years of the 1953 Loafer',
    desc: 'The iconic Horsebit 1953 loafer, permanently exhibited at the Museum of Modern Art (MoMA) in New York, celebrated for its artisanal Blake construction and equestrian hardware.',
  },
  {
    icon: '🌸',
    title: 'Haute Parfumerie & Beauty',
    desc: 'The sensory world of Gucci Flora, Gucci Bloom, and The Alchemist’s Garden: luxury perfumes and botanical oils crafted in Grasse and Florence.',
  },
  {
    icon: '🎁',
    title: 'White-Glove Client Services',
    desc: 'Complimentary insured worldwide delivery, signature green gift packaging with satin ribbons, and dedicated private client consultations.',
  },
  {
    icon: '⚡',
    title: 'Full-Stack Digital Atelier',
    desc: 'Powered by modern React 19, Vite, client-side routing, and simulated secure payment gateway for high-conversion luxury retail experiences.',
  },
];

export default function AboutPage() {
  return (
    <main className="page" style={{ paddingBottom: '6rem' }}>
      {/* Banner */}
      <div className="page-banner" style={{ background: '#090909', borderBottom: '1px solid var(--border-subtle)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.3em', color: 'var(--gold-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
            ATELIER DIRETTO — FIRENZE, ITALIA
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.06em', margin: 0 }}>
            The House of Gucci
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '1rem auto 0', lineHeight: 1.6 }}>
            Over a century of Florentine craftsmanship, groundbreaking design, and timeless Italian luxury.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem 0' }}>
        {/* Story Section */}
        <div style={{ maxWidth: '820px', margin: '0 auto 5rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--gold-primary)', fontSize: '1.5rem' }}>✦</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#ffffff', margin: '1rem 0 1.25rem' }}>
            Florentine Craft Meets Contemporary Elegance
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Under the Tuscan sun in 1921, Guccio Gucci opened his first store selling leather luggage and equestrian accessories.
            Over the decades, through the creative vision of Italian masters, the House introduced icons that transformed fashion:
            the curved bamboo handle in 1947, the equestrian Horsebit in 1953, and the Jackie bag in 1961.
          </p>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            Today, this digital catalog presents the finest expressions of that century-old heritage, combining
            authentic materials, hand-finished edges, and impeccable aesthetics for clients worldwide.
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
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.4rem', color: 'var(--gold-primary)' }}>{h.icon}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                {h.title}
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#111111', border: '1px solid var(--border-gold)', padding: '3.5rem 2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>
            Experience the Official Creations
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
            Explore 36 archival pieces with complimentary insured delivery and signature gift packaging.
          </p>
          <Link to="/products" className="btn-gucci-solid-lg">
            EXPLORE THE COLLECTION →
          </Link>
        </div>
      </div>
    </main>
  );
}
