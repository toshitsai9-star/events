import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

/**
 * AboutHero
 * Elegant full-width hero section for the About Us page with breadcrumb navigation.
 */
export default function AboutHero() {
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
        
        {/* Subtle Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans text-charcoal/60 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-crimson transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gold" />
          <span className="text-gold font-medium">About Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-gold/40 bg-beige/50 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-sans animate-fade-down">
              <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>About Adi Reddy Events</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.1] tracking-tight animate-fade-up">
              Behind Every Great Event Is a{' '}
              <span className="italic font-light text-forest block mt-1">
                Great Vision.
              </span>
            </h1>

            <div className="w-16 h-[1px] bg-gold animate-fade-in delay-100" />

            <p className="font-sans text-base sm:text-lg text-charcoal/80 max-w-xl leading-relaxed font-light animate-fade-up delay-200">
              Adi Reddy Events plans celebrations with creative direction, clear coordination and on-site production.
            </p>
          </div>

          {/* Hero Photography: Beautifully Arranged Event Venue */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[4/5]">
                <img
                  src="/anil-reddy-founder.jpg"
                  alt="Adi Reddy, founder of Adi Reddy Events"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  loading="eager"
                />
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                  Meet the Founder
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
