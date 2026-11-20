import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

/**
 * HeroSection
 * Agency-grade hero section representing the full spectrum of ADI REDDY EVENTS:
 * Weddings, Corporate Summits, Concerts, Cultural Celebrations, and College Fests.
 */
export default function HeroSection() {
  const scrollToSpecialties = (e) => {
    e.preventDefault();
    const element = document.getElementById('event-specialties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = (e) => {
    e.preventDefault();
    const element = document.getElementById('work-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-ivory pt-12 pb-20 md:pt-20 md:pb-32 border-b border-gold/20">
      {/* Subtle architectural vertical hairlines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
          <div className="border-r border-gold/20 h-full"></div>
          <div className="hidden sm:block border-r border-gold/20 h-full col-span-2"></div>
          <div className="hidden lg:block border-r border-gold/20 h-full col-span-4"></div>
          <div className="border-r border-gold/20 h-full"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 border border-gold/40 bg-beige/60 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Full-Spectrum Event Planning & Management Atelier</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.08] tracking-tight">
              Every Event Has a Story.{' '}
              <span className="italic font-light text-forest block mt-1">
                We Make It Unforgettable.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-charcoal/80 max-w-xl leading-relaxed font-light">
              From grand celebrations and corporate gatherings to cultural festivals and intimate occasions, we bring every vision to life with creativity, precision and passion.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#event-specialties"
                onClick={scrollToSpecialties}
                className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em] px-6 sm:px-8 py-3.5 bg-forest text-ivory hover:bg-forest-light border border-forest hover:border-gold/30 shadow-subtle transition-all duration-300 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#work-preview"
                onClick={scrollToWork}
                className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em] px-6 sm:px-8 py-3.5 border border-gold text-charcoal hover:bg-gold hover:text-white bg-transparent transition-all duration-300 group"
              >
                <span>View Our Work</span>
                <Compass className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </div>

            {/* Diversity Indicators */}
            <div className="pt-8 border-t border-gold/25 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                  Weddings & Galas
                </span>
                <span className="font-serif text-sm sm:text-base text-charcoal mt-1 block">
                  Royal & Bespoke
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                  Corporate
                </span>
                <span className="font-serif text-sm sm:text-base text-charcoal mt-1 block">
                  Summits & Launches
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                  Concerts & Fests
                </span>
                <span className="font-serif text-sm sm:text-base text-charcoal mt-1 block">
                  Live Stage Shows
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                  Cultural & Parties
                </span>
                <span className="font-serif text-sm sm:text-base text-charcoal mt-1 block">
                  Traditional & Private
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Dimensional Event Photography Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Large Image Frame: Grand Event Stage & Lighting Production */}
              <div className="relative z-10 overflow-hidden bg-beige border border-gold/30 shadow-floating aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1762765685348-4bced247d12c?auto=format&fit=crop&w=1200&q=80"
                  alt="Grand Corporate & Cultural Stage Production by Adi Reddy Events"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  loading="eager"
                />
                {/* Subtle luxury badge on image */}
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1.5 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                  Comprehensive Event Staging
                </div>
                <div className="absolute inset-0 pointer-events-none border border-black/5" />
              </div>

              {/* Offset Second Image: Refined Banquet / Celebration Setting */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 z-20 w-44 md:w-52 aspect-square overflow-hidden bg-ivory border-2 border-gold/40 shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1745573673235-5f2cee3ff9a8?auto=format&fit=crop&w=600&q=80"
                  alt="Celebration Banquet Tablescape Detail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-forest/85 backdrop-blur-xs py-1 px-2 text-center">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-sans">
                    Social & Intimate
                  </span>
                </div>
              </div>

              {/* Decorative Subtle Corner Accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/40 pointer-events-none -z-0" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
