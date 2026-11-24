export default function BrandLogo({ size = 'md', className = '' }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const markSize = isSm ? 22 : isLg ? 36 : 28;
  const brandFontSize = isSm ? '1.15rem' : isLg ? '1.85rem' : '1.45rem';
  const subtitleSize = isSm ? '0.55rem' : isLg ? '0.72rem' : '0.62rem';

  return (
    <div className={`gucci-luxury-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: isSm ? '0.6rem' : '0.85rem', textDecoration: 'none' }}>
      {/* Interlocking GG Luxury Emblem */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle cx="20" cy="20" r="19" stroke="#c5a059" strokeWidth="1.2" strokeOpacity="0.8" />
        {/* Left G */}
        <path
          d="M21 13C16.5 13 13 16.5 13 20C13 23.5 16.5 27 21 27C23.5 27 25.5 25.8 26.5 24H21V21.5H29V25C27.5 27.8 24.5 29.5 21 29.5C15 29.5 10.5 25.2 10.5 20C10.5 14.8 15 10.5 21 10.5C24.5 10.5 27.5 12.2 29 15L27 16.5C25.8 14.2 23.5 13 21 13Z"
          fill="#c5a059"
        />
        {/* Mirror Interlocking Right G */}
        <path
          d="M19 27C23.5 27 27 23.5 27 20C27 16.5 23.5 13 19 13C16.5 13 14.5 14.2 13.5 16H19V18.5H11V15C12.5 12.2 15.5 10.5 19 10.5C25 10.5 29.5 14.8 29.5 20C29.5 25.2 25 29.5 19 29.5C15.5 29.5 12.5 27.8 11 25L13 23.5C14.2 25.8 16.5 27 19 27Z"
          fill="#ffffff"
          fillOpacity="0.85"
        />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Playfair Display', 'Cinzel', 'Didot', Georgia, serif",
            fontSize: brandFontSize,
            fontWeight: 800,
            letterSpacing: '0.28em',
            color: '#ffffff',
            textTransform: 'uppercase',
            textIndent: '0.28em'
          }}
        >
          GUCCI
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', -apple-system, sans-serif",
            fontSize: subtitleSize,
            fontWeight: 600,
            letterSpacing: '0.45em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginTop: '3px',
            textIndent: '0.45em'
          }}
        >
          FIRENZE 1921
        </span>
      </div>
    </div>
  );
}
