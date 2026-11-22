import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ options, value, onChange, id = 'product-sort' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="custom-select-wrapper" ref={containerRef} id={id}>
      <button
        type="button"
        className={`custom-select-trigger${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="custom-select-icon">⇅</span>
        <span className="custom-select-label">{selectedOption?.label}</span>
        <svg
          className={`custom-select-arrow${isOpen ? ' rotated' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="custom-select-menu" role="listbox">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option${isSelected ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <span className="option-label">{opt.label}</span>
                {isSelected && <span className="custom-select-check">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
