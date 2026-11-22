import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import PrimaryButton from '../PrimaryButton';

/**
 * ServicesHero
 * Full-width premium hero for the Services page with breadcrumb navigation.
 */
export default function ServicesHero() {
  return (
    <section className="relative bg-ivory pt-12 pb-20 md:pt-16 md:pb-28 border-b border-gold/20 overflow-hidden">
      {/* Background hairlines for architectural elegance */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
          <div className="border-r border-gold/20 h-full"></div>
          <div className="hidden sm:block border-r border-gold/20 h-full col-span-2"></div>
          <div className="hidden lg:block border-r border-gold/20 h-full col-span-4"></div>
          <div className="border-r border-gold/20 h-full"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans text-charcoal/60 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-crimson transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold" />
          <span className="text-gold font-medium">Services</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-gold/40 bg-beige/50 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-sans animate-fade-down">
              <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Event Planning & Production</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.1] tracking-tight animate-fade-up">
              Every Occasion.{' '}
              <span className="italic font-light text-forest block mt-1">
                One Creative Partner.
              </span>
            </h1>

            <div className="w-16 h-[1px] bg-gold animate-fade-in delay-100" />

            <p className="font-sans text-base sm:text-lg text-charcoal/80 max-w-xl leading-relaxed font-light animate-fade-up delay-200">
              Event planning and production for celebrations of every size.
            </p>

            {/* Hero Action CTA */}
            <div className="pt-2 animate-fade-up delay-300">
              <PrimaryButton to="/gallery-contact" variant="crimson" icon={ArrowRight}>
                Discuss Your Event
              </PrimaryButton>
            </div>

          </div>

          {/* Right Column: Multi-Category Event Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[4/5]">
                <img
                  src="/videos/portfolio/film2_poster.jpg"
                  alt="Real event production footage from Adi Reddy Events"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  loading="eager"
                />
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                  On-site Event Production
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative Corner Trim */}
              <div className="hidden sm:block absolute -bottom-5 -right-5 w-24 h-24 border-b-2 border-r-2 border-gold/40 pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
