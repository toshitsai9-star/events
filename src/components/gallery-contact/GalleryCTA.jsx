import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

/**
 * GalleryCTA
 * Intermediary Call to Action positioned directly between the Event Gallery and Contact Form.
 * Heading: "Have an Event You Want to Bring to Life?"
 * Supporting text: "Whether it's a grand celebration, a corporate gathering or a personal occasion, let's make it memorable."
 * Button: "Plan Your Event" linking smoothly to the contact form on this page.
 */
export default function GalleryCTA() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-forest text-ivory border-b border-gold/25 relative overflow-hidden">
      {/* Background hairlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
          <div className="border-r border-gold/20 h-full"></div>
          <div className="border-r border-gold/20 h-full col-span-3"></div>
          <div className="border-r border-gold/20 h-full col-span-4"></div>
          <div className="border-r border-gold/20 h-full"></div>
        </div>
      </div>

      <div className="reveal-init relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 border border-gold/40 bg-forest-light text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-light font-sans">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <span>Commission Your Vision</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ivory tracking-tight leading-tight">
          Have an Event You Want to Bring to Life?
        </h2>

        <div className="w-16 h-[1px] bg-gold/50 mx-auto" />

        <p className="font-sans text-base sm:text-lg text-beige/80 max-w-2xl mx-auto leading-relaxed font-light">
          Whether it's a grand celebration, a corporate gathering or a personal occasion, let's make it memorable.
        </p>

        <div className="pt-2">
          <a
            href="#contact-enquiry"
            onClick={scrollToForm}
            className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.18em] px-8 py-4 bg-crimson text-white hover:bg-crimson-hover border border-crimson shadow-subtle transition-all duration-300 group"
          >
            <span>Plan Your Event</span>
            <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

