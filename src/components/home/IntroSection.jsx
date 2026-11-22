import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * IntroSection
 * Editorial introduction highlighting Adi Reddy Events' holistic philosophy.
 */
export default function IntroSection() {
  const highlights = [
    'Creative event design',
    'Planning and vendor coordination',
    'On-site production',
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
                  src="/videos/optimized/feast-poster-720.jpg"
                  alt="Real footage from a traditional Konaseema celebration"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent pointer-events-none" />
                
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">
                Planning & Production
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
              We plan and produce weddings, cultural celebrations and large events, bringing each idea through to on-site execution.
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

