import React from 'react';
import { ArrowRight, Sparkles, Calendar, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

/**
 * HomeCTASection
 * Prestigious closing invitation section leading directly into inquiries.
 */
export default function HomeCTASection() {
  return (
    <section className="py-20 md:py-32 bg-ivory relative overflow-hidden">
      {/* Decorative hairline accents */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-init bg-beige/45 border border-gold/30 p-8 sm:p-14 lg:p-16 text-center shadow-card relative">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold/50 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/50 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/50 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold/50 pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 border border-gold/40 bg-ivory text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-sans mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>Plan Your Milestone With Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] tracking-tight max-w-3xl mx-auto mb-6">
            Ready to Create Something <span className="italic font-light text-forest">Unforgettable</span>?
          </h2>

          <div className="w-16 h-[1px] bg-gold mx-auto mb-6" />

          <p className="font-sans text-base sm:text-lg text-charcoal/75 max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Whether you are planning a royal wedding, an executive conference, a campus cultural festival, or a private family gathering, we handle every detail with devotion and artistry.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton to="/gallery-contact" variant="crimson" icon={ArrowRight}>
              Plan Your Event
            </PrimaryButton>
            <SecondaryButton to="/about" variant="gold">
              Meet The Team
            </SecondaryButton>
          </div>

          <div className="mt-12 pt-8 border-t border-gold/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans text-charcoal/70">
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Tailored Timeline Curation</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Hyderabad & Nationwide</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Prompt Inquiry Responses</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

