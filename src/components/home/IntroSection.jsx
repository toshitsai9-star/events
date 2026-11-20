import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * IntroSection
 * Editorial introduction highlighting Adi Reddy Events' holistic philosophy.
 */
export default function IntroSection() {
  const highlights = [
    'Bespoke spatial design & theme conceptualization',
    'Full-service logistics, vendor curation & coordination',
    'Live entertainment, artist management & acoustic staging',
    'Seamless on-ground execution for gatherings of any scale',
  ];

  return (
    <section id="intro-section" className="relative py-20 md:py-32 bg-ivory border-b border-gold/20 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Complementary Event Photograph with Editorial Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1768508948334-541161d1cb5c?auto=format&fit=crop&w=1000&q=80"
                  alt="Atmospheric Evening Gathering orchestrated by Adi Reddy Events"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <span className="text-[10px] uppercase tracking-widest text-gold-light font-sans block mb-1">
                    Atmosphere & Ambiance
                  </span>
                  <p className="font-serif italic text-base sm:text-lg text-ivory/95">
                    "Every space transformed into a living, breathing sanctuary of celebration."
                  </p>
                </div>
              </div>

              {/* Offset Decorative Accent Badge */}
              <div className="hidden sm:block absolute -top-6 -right-6 bg-beige border border-gold/40 p-4 shadow-subtle max-w-[180px]">
                <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-0.5">
                  Complete
                </span>
                <span className="font-serif text-sm text-charcoal block">
                  Turnkey Event Management
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">
                The Adi Reddy Philosophy
              </span>
              <div className="w-12 h-[1px] bg-gold mt-2" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] tracking-tight">
              More Than Events.{' '}
              <span className="italic font-light text-forest block">
                We Create Experiences.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
              At Adi Reddy Events, we believe every occasion deserves thoughtful planning and exceptional execution. From personal celebrations to large-scale gatherings, we create experiences that bring people together and leave lasting impressions.
            </p>

            <div className="space-y-3.5 pt-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm font-sans text-charcoal/80">
                  <div className="w-5 h-5 rounded-full bg-beige border border-gold/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans font-medium text-forest hover:text-crimson transition-colors group border-b border-forest/30 pb-1"
              >
                <span>Learn More About Our Team & Story</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

