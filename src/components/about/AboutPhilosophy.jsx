import React from 'react';
import SectionHeading from '../SectionHeading';
import { Lightbulb, UserCheck, Sparkles, Layers } from 'lucide-react';

/**
 * AboutPhilosophy
 * Editorial presentation of the four guiding philosophy principles of Adi Reddy Events.
 */
export default function AboutPhilosophy() {
  const principles = [
    {
      number: '01',
      title: 'Creativity',
      icon: Lightbulb,
      description: 'Every event begins with an idea. We believe in creating concepts that reflect the occasion and the people celebrating it.',
    },
    {
      number: '02',
      title: 'Personalization',
      icon: UserCheck,
      description: "Every celebration has its own personality. Our approach focuses on understanding the client's vision.",
    },
    {
      number: '03',
      title: 'Attention to Detail',
      icon: Sparkles,
      description: 'The smallest details can make a big difference in the overall event experience.',
    },
    {
      number: '04',
      title: 'Seamless Execution',
      icon: Layers,
      description: 'Thoughtful coordination and planning help bring every event together.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Editorial Statement */}
          <div className="reveal-init lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium block">
                Our Core Philosophy
              </span>
              <div className="w-12 h-[1px] bg-gold mt-2" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] tracking-tight">
              Every Event Is Unique.{' '}
              <span className="italic font-light text-forest block">
                So Is Our Approach.
              </span>
            </h2>

            <p className="font-sans text-base text-charcoal/75 leading-relaxed font-light">
              We reject one-size-fits-all event planning. Whether designing a traditional festival, an executive summit, or a family milestone, our four philosophy pillars ensure every decision aligns with your values.
            </p>

            <div className="p-6 bg-beige/45 border-l-2 border-forest mt-8 shadow-subtle">
              <p className="font-serif text-base text-charcoal/90 italic leading-relaxed">
                "True distinction is achieved when genuine creativity meets disciplined preparation."
              </p>
            </div>
          </div>

          {/* Right Column: 4 Editorial Principles (Clean Sequenced Layout) */}
          <div className="lg:col-span-7 space-y-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`reveal-init delay-${idx * 100} p-8 bg-beige/30 border border-gold/25 transition-all duration-300 hover:border-gold hover:bg-beige/60 hover:-translate-y-0.5 group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ivory border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-forest transition-colors">
                        <Icon className="w-4 h-4 text-gold group-hover:text-gold-light transition-colors" />
                      </div>
                      <h3 className="font-serif text-2xl text-charcoal group-hover:text-forest transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <span className="font-mono text-sm text-gold font-medium">
                      {p.number}
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed font-light pl-1">
                    {p.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-end">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                      Adi Reddy Principle
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

