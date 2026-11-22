import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import PrimaryButton from '../PrimaryButton';

/**
 * ServicesCTA
 * Final call to action section for the Services page featuring the official Forest Green (#06110C) backdrop
 * and selective Crimson Red (#A31C18) CTA button.
 */
export default function ServicesCTA() {
  return (
    <section className="py-20 md:py-32 bg-forest text-ivory border-b border-gold/25 relative overflow-hidden">
      {/* Background hairlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
          <div className="border-r border-gold/20 h-full"></div>
          <div className="border-r border-gold/20 h-full col-span-3"></div>
          <div className="border-r border-gold/20 h-full col-span-4"></div>
          <div className="border-r border-gold/20 h-full"></div>
        </div>
      </div>

      <div className="reveal-init relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-gold/40 bg-forest-light text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-light font-sans">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span>Consultation & Proposals</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-ivory leading-[1.15] tracking-tight max-w-3xl mx-auto">
          Whatever the Occasion, Let's Make It Extraordinary.
        </h2>

        <div className="w-16 h-[1px] bg-gold/50 mx-auto" />

        <p className="font-sans text-base sm:text-lg text-beige/80 max-w-2xl mx-auto leading-relaxed font-light">
          Tell us what you have in mind.
        </p>

        {/* Primary & Secondary Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton to="/gallery-contact" variant="crimson" icon={ArrowRight}>
            Plan Your Event
          </PrimaryButton>
        </div>

        {/* Reassurance Metadata */}
        

      </div>
    </section>
  );
}
