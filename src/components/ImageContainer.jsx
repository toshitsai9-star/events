import React, { useState } from 'react';

/**
 * ImageContainer
 * Editorial luxury image wrapper with fine borders, gentle aspect ratio clipping,
 * and elegant placeholder handling.
 *
 * @param {'landscape' | 'portrait' | 'square' | 'wide' | 'auto'} aspectRatio
 */
export default function ImageContainer({
  src,
  alt = 'Adi Reddy Events Exhibition',
  aspectRatio = 'landscape',
  caption,
  className = '',
  imgClassName = '',
  hoverEffect = true,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClasses = {
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    wide: 'aspect-[16/9]',
    auto: 'aspect-auto',
  };

  return (
    <figure className={`flex flex-col group ${className}`}>
      <div 
        className={`relative overflow-hidden bg-beige border border-gold/25 shadow-subtle ${aspectClasses[aspectRatio]}`}
      >
        {/* Placeholder state while loading */}
        {!loaded && !error && (
          <div className="absolute inset-0 bg-beige/60 animate-pulse flex items-center justify-center">
            <span className="font-serif italic text-gold/60 text-sm">Adi Reddy Events</span>
          </div>
        )}

        {src && !error ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              hoverEffect ? 'group-hover:scale-105' : ''
            } ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-beige/40">
            <span className="font-serif text-lg text-charcoal/60 mb-1">{alt}</span>
            <span className="text-xs uppercase tracking-widest text-gold font-sans">Curated Atmosphere</span>
          </div>
        )}

        {/* Subtle vignette/border overlay for luxury magazine aesthetic */}
        <div className="absolute inset-0 pointer-events-none border border-black/5" />
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-xs font-sans text-charcoal/60 italic tracking-wide text-left">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

