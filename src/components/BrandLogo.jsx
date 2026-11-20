import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Text-Based Luxury Brand Logo for ADI REDDY EVENTS
 * Crafted with editorial typography (Playfair Display & DM Sans)
 * and tailored letter-spacing for high-end luxury aesthetics.
 */
export default function BrandLogo({ theme = 'light', className = '' }) {
  const isLight = theme === 'light'; // Light text on dark bg

  return (
    <Link 
      to="/" 
      className={`inline-flex flex-col group transition-opacity duration-300 hover:opacity-90 ${className}`}
      aria-label="ADI REDDY EVENTS Home"
    >
      <div className="flex items-center space-x-2">
        <span 
          className={`font-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wider transition-colors duration-300 ${
            isLight ? 'text-ivory group-hover:text-gold-light' : 'text-charcoal group-hover:text-forest'
          }`}
        >
          ADI REDDY
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
      </div>
      <span 
        className={`text-[9px] sm:text-[10px] uppercase font-sans font-medium tracking-[0.3em] transition-colors duration-300 -mt-0.5 ${
          isLight ? 'text-gold' : 'text-forest/70'
        }`}
      >
        EVENTS
      </span>
    </Link>
  );
}

