export default function BrandLogo({ size = 'md', className = '' }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const iconSize = isSm ? 28 : isLg ? 44 : 36;
  const fontSize = isSm ? '1.15rem' : isLg ? '1.75rem' : '1.4rem';

  return (
    <div className={`shopwave-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: isSm ? '0.5rem' : '0.65rem', textDecoration: 'none' }}>
      {/* Dynamic Wave-Cart SVG Brand Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 12px rgba(108, 99, 255, 0.45))' }}
      >
        <defs>
          <linearGradient id="sw-logo-grad" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6c63ff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="sw-wave-grad" x1="6" y1="28" x2="42" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="sw-spark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>

        {/* Modern Shopping Bag Silhouette with Rounded Contours */}
        <rect x="6" y="14" width="36" height="30" rx="9" fill="url(#sw-logo-grad)" />

        {/* Bag Handle */}
        <path
          d="M17 15V10C17 6.13401 20.134 3 24 3C27.866 3 31 6.13401 31 10V15"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Electric Ocean Wave Crest Cutting Across the Bag */}
        <path
          d="M8 29C12 24 16 33 22 28C28 23 32 31 40 26"
          stroke="url(#sw-wave-grad)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Speed Spark / Star (Flipkart/Amazon energetic flair) */}
        <path
          d="M24 18L25.2 21.2L28.5 22L25.2 22.8L24 26L22.8 22.8L19.5 22L22.8 21.2L24 18Z"
          fill="url(#sw-spark)"
        />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display, "Outfit", sans-serif)', fontSize, fontWeight: 900, letterSpacing: '-0.5px' }}>
          <span style={{ color: '#ffffff' }}>Shop</span>
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginLeft: '1px'
          }}>
            Wave
          </span>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#22d3ee',
            marginLeft: '3px',
            boxShadow: '0 0 8px #22d3ee'
          }} />
        </div>
        {/* Amazon-style dynamic wave smile line */}
        <svg width={isSm ? "60" : "80"} height="6" viewBox="0 0 80 6" fill="none" style={{ marginTop: '2px', overflow: 'visible' }}>
          <path
            d="M2 2C18 5.5 58 5.5 76 2"
            stroke="url(#sw-logo-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
