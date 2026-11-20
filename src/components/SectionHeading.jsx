import React from 'react';

/**
 * SectionHeading
 * Editorial-style section heading component adhering to luxury event branding.
 *
 * @param {string} eyebrow - Small uppercase category / subtitle above the main title
 * @param {string} title - Primary editorial heading
 * @param {string} description - Descriptive copy underneath
 * @param {'left' | 'center' | 'right'} align - Text alignment
 * @param {boolean} dark - True when rendered on dark backgrounds (Forest Green / Charcoal)
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignmentClasses[align]} ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs md:text-sm uppercase tracking-[0.25em] font-sans font-medium mb-3 ${
            dark ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {eyebrow}
        </span>
      )}

      {title && (
        <h2
          className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.15] tracking-tight mb-4 ${
            dark ? 'text-ivory' : 'text-charcoal'
          }`}
        >
          {title}
        </h2>
      )}

      {/* Subtle decorative divider line */}
      <div 
        className={`w-12 h-[1px] mb-4 ${
          dark ? 'bg-gold/40' : 'bg-gold/60'
        } ${align === 'center' ? 'mx-auto' : ''}`}
      />

      {description && (
        <p
          className={`text-base sm:text-lg font-sans font-light leading-relaxed ${
            dark ? 'text-beige/80' : 'text-charcoal/70'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

