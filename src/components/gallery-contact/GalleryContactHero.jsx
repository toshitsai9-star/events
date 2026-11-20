import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Camera, ArrowRight } from 'lucide-react';

/**
 * GalleryContactHero
 * Premium hero section for the Gallery & Contact page.
 * Heading: "Moments That Deserve to Be Remembered."
 * Breadcrumb: Home / Gallery & Contact
 */
export default function GalleryContactHero() {
  const scrollToPortfolio = (e) => {
    const el = document.getElementById('video-showcase') || document.getElementById('event-gallery');
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
          <span className="text-gold font-medium">Gallery & Contact</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-gold/40 bg-beige/50 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-sans animate-fade-down">
              <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>Event Stories & Inquiries</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.1] tracking-tight animate-fade-up">
              Moments That Deserve <br className="hidden sm:inline" />
              <span className="italic font-light text-forest">to Be Remembered.</span>
            </h1>

            <div className="w-16 h-[1px] bg-gold animate-fade-in delay-100" />

            <p className="font-sans text-base sm:text-lg text-charcoal/80 max-w-xl leading-relaxed font-light animate-fade-up delay-200">
              Explore a collection of celebrations, gatherings and experiences that inspire the art of event management.
            </p>

            {/* Quick Navigation Anchors */}
            <div className="pt-2 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
              <Link
                to="/our-work"
                className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em] px-6 sm:px-8 py-3.5 bg-forest text-ivory hover:bg-forest-light border border-forest hover:border-gold/30 shadow-subtle transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
              >
                <Camera className="mr-2 w-4 h-4 text-gold" />
                <span>Explore Event Films</span>
              </Link>

              <a
                href="#contact-enquiry"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em] px-6 sm:px-8 py-3.5 bg-crimson text-white hover:bg-crimson-hover border border-crimson shadow-subtle transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Reassurance Badges */}
            <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center gap-6 text-xs font-sans text-charcoal/65 animate-fade-up delay-400">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold block font-medium">Event Categories</span>
                <span className="font-serif text-charcoal text-sm">9 Diverse Event Disciplines</span>
              </div>
              <div className="w-[1px] h-8 bg-gold/25 hidden sm:block"></div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold block font-medium">Inquiry Response</span>
                <span className="font-serif text-charcoal text-sm">Detailed Proposals within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1774092137702-2abdbf38e683?auto=format&fit=crop&w=1200&q=80"
                  alt="Atmospheric Grand Staging and Production by Adi Reddy Events"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  loading="eager"
                />
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                  Event Production
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Offset Decorative Accent Badge */}
              <div className="hidden sm:block absolute -bottom-5 -left-5 bg-ivory border-2 border-gold/40 p-4 shadow-subtle max-w-[210px]">
                <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-0.5">
                  Full Turnkey Scope
                </span>
                <span className="font-serif text-xs text-charcoal block leading-snug">
                  Personal, Cultural, Corporate & Arenas
                </span>
              </div>
              <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-gold/40 pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
