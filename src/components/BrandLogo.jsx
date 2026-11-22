import React from 'react';
import { Link } from 'react-router-dom';

export function BrandMark({ className = '' }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" className="h-full w-full" role="presentation">
        <circle cx="24" cy="24" r="22" fill="#06110C" stroke="#B49A70" strokeWidth="1.25" />
        <circle cx="24" cy="24" r="17.5" fill="none" stroke="#B49A70" strokeOpacity=".32" strokeWidth=".7" />
        <path d="M24 10.5 27.2 20.8 37.5 24l-10.3 3.2L24 37.5l-3.2-10.3L10.5 24l10.3-3.2L24 10.5Z" fill="#D4B982" />
        <circle cx="34.5" cy="12.8" r="1.1" fill="#D4B982" />
        <circle cx="13.5" cy="35.2" r="1.1" fill="#D4B982" />
      </svg>
    </span>
  );
}

export default function BrandLogo({ theme = 'light', className = '' }) {
  const isLight = theme === 'light';

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-90 ${className}`}
      aria-label="ADI REDDY EVENTS Home"
    >
      <BrandMark className="h-9 w-9 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[15px] sm:text-lg md:text-xl font-semibold tracking-[0.09em] transition-colors duration-300 ${
          isLight ? 'text-ivory group-hover:text-gold-light' : 'text-charcoal group-hover:text-forest'
        }`}>
          ADI REDDY
        </span>
        <span className={`mt-1 text-[8px] sm:text-[9px] uppercase font-sans font-semibold tracking-[0.24em] transition-colors duration-300 ${
          isLight ? 'text-gold' : 'text-forest/75'
        }`}>
          EVENTS & FACILITATORS
        </span>
      </span>
    </Link>
  );
}
