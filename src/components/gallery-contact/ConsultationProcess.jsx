import React from 'react';
import SectionHeading from '../SectionHeading';
import { PhoneCall, Palette, FileText, CheckCircle2 } from 'lucide-react';

/**
 * ConsultationProcess
 * 4-Step assurance process explaining what happens after a prospective client reaches out.
 */
export default function ConsultationProcess() {
  const steps = [
    {
      step: '01',
      title: 'Initial Discovery Call',
      icon: PhoneCall,
      description: 'Within 24 hours of your inquiry, an event director calls to review your target date, venue preference, and guest profile.',
    },
    {
      step: '02',
      title: 'Bespoke Concept Deck',
      icon: Palette,
      description: 'We draft customized 3D spatial floorplans, lighting moodboards, and floral/decor palettes tailored to your aesthetic.',
    },
    {
      step: '03',
      title: 'Itemized Proposal',
      icon: FileText,
      description: 'Receive a clear, transparent cost breakdown spanning staging, AV, entertainment, and concierge hospitality with zero hidden fees.',
    },
    {
      step: '04',
      title: 'Directorate Alignment',
      icon: CheckCircle2,
      description: 'A lead production manager is assigned to supervise rehearsals, vendor alignment, and live-day execution seamlessly.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-beige/40 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="The Client Journey"
          title="What To Expect After You Connect"
          description="We value your time and peace of mind. Here is how our production directors guide you from initial inquiry to confirmed production."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`reveal-init delay-${idx * 100} bg-ivory border border-gold/25 p-8 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-card group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-beige border border-gold/40 flex items-center justify-center group-hover:bg-forest group-hover:border-forest transition-colors">
                      <Icon className="w-4 h-4 text-gold group-hover:text-gold-light transition-colors" />
                    </div>
                    <span className="font-mono text-sm text-gold font-medium">
                      {s.step} //
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-forest transition-colors">
                    {s.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                    Assurance
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
