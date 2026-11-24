export default function BrandLogo({ size = 'md', className = '' }) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const markSize = isSm ? 26 : isLg ? 40 : 32;
  const brandFontSize = isSm ? '1.1rem' : isLg ? '1.65rem' : '1.32rem';
  const subtitleSize = isSm ? '0.52rem' : isLg ? '0.66rem' : '0.58rem';

  return (
    <div
      className={`shopwave-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSm ? '0.6rem' : '0.8rem',
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      {/* Sleek Minimalist Luxury Diamond Emblem */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Outer Diamond Crest */}
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          rx="2"
          transform="rotate(45 20 20)"
          stroke="#c5a059"
          strokeWidth="1.25"
          strokeOpacity="0.9"
        />
        {/* Subtle Inner Accent Diamond */}
        <rect
          x="11"
          y="11"
          width="18"
          height="18"
          rx="1"
          transform="rotate(45 20 20)"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.25"
        />

        {/* Clean S Wave & W Architectural Monogram */}
        <path
          d="M14.5 15.5C14.5 13.8 16.5 12.5 20 12.5C23.2 12.5 25 13.8 25 15.5C25 18.2 15 18.8 15 21.8C15 23.5 16.8 24.8 20 24.8C22.8 24.8 24.5 23.5 25 22"
          stroke="#c5a059"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 22.5L16.5 28.5L20 24L23.5 28.5L27 22.5"
          stroke="#ffffff"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.95"
        />

        {/* Accent Diamond Pips */}
        <circle cx="20" cy="5.5" r="1.1" fill="#c5a059" />
        <circle cx="20" cy="34.5" r="1.1" fill="#c5a059" />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Playfair Display', 'Cinzel', Georgia, serif",
            fontSize: brandFontSize,
            fontWeight: 800,
            letterSpacing: '0.24em',
            color: '#ffffff',
            textTransform: 'uppercase',
            textIndent: '0.24em'
          }}
        >
          SHOPWAVE
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', -apple-system, sans-serif",
            fontSize: subtitleSize,
            fontWeight: 600,
            letterSpacing: '0.42em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginTop: '4px',
            textIndent: '0.42em'
          }}
        >
          ATELIER
        </span>
      </div>
    </div>
  );
}
