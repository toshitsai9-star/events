import React from 'react';

/**
 * AboutStory
 * Narrative detailing the core identity and mission of Adi Reddy Events.
 * Strictly adheres to authentic brand voice without fabricated historical dates or numbers.
 */
export default function AboutStory() {
  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Narrative Column */}
          <div className="reveal-init lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium block">
                Our Story & Vision
              </span>
              <div className="w-12 h-[1px] bg-gold mt-2" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] tracking-tight">
              More Than Just Event Planning.
            </h2>

            <div className="space-y-4 font-sans text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
              <p>
                We bring each celebration from the first idea through planning and on-site production, with details shaped around the people and occasion.
              </p>
            </div>

            
          </div>

          {/* Complementary Photography Column */}
          <div className="reveal-init delay-200 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative z-10 overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[4/5]">
                <img
                  src="/videos/optimized/wedding-poster-720.jpg"
                  alt="Real wedding celebration footage from Adi Reddy Events"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <span className="text-[10px] uppercase tracking-widest text-gold-light font-sans block mb-1">
                    Attention To Detail
                  </span>
                  <p className="font-serif text-sm text-ivory/95">
                    Turning concepts into seamless, sensory realities.
                  </p>
                </div>
              </div>

              {/* Offset Decorative Accent Badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 z-20 bg-ivory border-2 border-gold/40 p-5 shadow-subtle max-w-[210px]">
                <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-1">
                  Our Mission
                </span>
                <span className="font-serif text-xs text-charcoal leading-snug block">
                  Meaningful Experiences For Every Occasion
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
