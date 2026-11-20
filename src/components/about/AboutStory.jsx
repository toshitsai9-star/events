import React from 'react';
import { Quote } from 'lucide-react';

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
                At Adi Reddy Events, we believe every occasion deserves to be celebrated in a special way. Whether it is a wedding, a birthday, a corporate gathering, a college celebration or a large-scale cultural event, our focus is on turning ideas into memorable experiences.
              </p>
              <p>
                We bring creativity, thoughtful planning and attention to detail together to make every event meaningful.
              </p>
              <p>
                From the first concept to the final execution, we aim to create experiences that people remember long after the celebration ends.
              </p>
            </div>

            <div className="pt-4 p-6 bg-beige/40 border-l-2 border-gold flex items-start space-x-4 shadow-subtle">
              <Quote className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <p className="font-serif italic text-base sm:text-lg text-charcoal/90 leading-relaxed">
                "Our focus is not on simply executing a schedule—it is about cultivating an atmosphere that leaves an indelible imprint in the memories of those who gather."
              </p>
            </div>
          </div>

          {/* Complementary Photography Column */}
          <div className="reveal-init delay-200 lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative z-10 overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
                  alt="Thoughtfully planned event atmosphere orchestrated by Adi Reddy Events"
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
