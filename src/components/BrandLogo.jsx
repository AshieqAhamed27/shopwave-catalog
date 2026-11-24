export default function BrandLogo({ size = 'md', className = '' }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const markSize = isSm ? 24 : isLg ? 38 : 30;
  const brandFontSize = isSm ? '1.1rem' : isLg ? '1.75rem' : '1.35rem';
  const subtitleSize = isSm ? '0.52rem' : isLg ? '0.68rem' : '0.58rem';

  return (
    <div className={`shopwave-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: isSm ? '0.65rem' : '0.85rem', textDecoration: 'none' }}>
      {/* Refined Geometric Monogram Emblem */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle cx="22" cy="22" r="21" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.85" />
        <circle cx="22" cy="22" r="17.5" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="2 2" />
        {/* Modern Stylized Monogram S & W */}
        <path
          d="M14 17.5C14 15 16 13.5 19 13.5C22 13.5 23.5 15 23.5 17C23.5 20.5 14 19.5 14 24C14 27 16.5 28.5 20 28.5C22.8 28.5 24.5 27.2 25 26"
          stroke="#c5a059"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 17L23.5 28.5L26.5 19L29.5 28.5L32 17"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />
        <circle cx="22" cy="7" r="1.2" fill="#c5a059" />
        <circle cx="22" cy="37" r="1.2" fill="#c5a059" />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span
          style={{
            fontFamily: "'Playfair Display', 'Cinzel', 'Didot', Georgia, serif",
            fontSize: brandFontSize,
            fontWeight: 800,
            letterSpacing: '0.22em',
            color: '#ffffff',
            textTransform: 'uppercase',
            textIndent: '0.22em'
          }}
        >
          SHOPWAVE
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', -apple-system, sans-serif",
            fontSize: subtitleSize,
            fontWeight: 600,
            letterSpacing: '0.4em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginTop: '3px',
            textIndent: '0.4em'
          }}
        >
          ATELIER • MODERN ESSENTIALS
        </span>
      </div>
    </div>
  );
}
