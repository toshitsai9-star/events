import React from 'react';
import SectionHeading from '../SectionHeading';
import { Layers, Lightbulb, UserCheck, Sparkles, CheckSquare, Heart } from 'lucide-react';

/**
 * WhyChooseAdhiReddy
 * Highlights the six core reasons clients choose Adi Reddy Events.
 * Strictly adheres to authentic professional standards with zero invented numbers, awards, or reviews.
 */
export default function WhyChooseAdhiReddy() {
  const points = [
    {
      icon: Layers,
      title: 'Multiple Event Categories',
      description: 'From weddings and private anniversaries to college fests, corporate summits and live concerts, we manage diverse event formats with equal mastery.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Event Concepts',
      description: 'Every setup begins with original creative thought. We develop distinctive themes and decor directions that make your occasion stand apart.',
    },
    {
      icon: UserCheck,
      title: 'Personalized Planning',
      description: 'We listen closely to your vision, preferences, and cultural traditions, tailoring every detail around your specific expectations.',
    },
    {
      icon: Sparkles,
      title: 'Attention to Detail',
      description: 'From stage lighting temperatures and floral aesthetics to schedule timing, we care deeply about the nuances that shape the guest experience.',
    },
    {
      icon: CheckSquare,
      title: 'Organized Coordination',
      description: 'Disciplined timeline management, reliable vendor oversight, and clear communication keep the planning process structured and stress-free.',
    },
    {
      icon: Heart,
      title: 'Focus on Memorable Experiences',
      description: 'Beyond decor and logistics, our ultimate goal is bringing people together and creating meaningful moments that resonate for years to come.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Adi Reddy Advantage"
          title="Why Choose Us for Your Next Event?"
          description="We combine multi-category versatility with genuine care, ensuring that every celebration is organized, imaginative, and unforgettable."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`reveal-init delay-${(idx % 3) * 100} p-8 bg-beige/35 border border-gold/25 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:bg-beige/60 group`}
              >
                <div>
                  <div className="w-12 h-12 bg-ivory border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-forest group-hover:border-forest transition-colors">
                    <Icon className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                  </div>

                  <span className="font-mono text-[11px] text-gold block mb-2">
                    0{idx + 1} //
                  </span>

                  <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-forest transition-colors">
                    {p.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                    Commitment
                  </span>
                  <div className="w-3 h-[1px] bg-gold/40" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

