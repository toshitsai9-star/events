import React from 'react';
import SectionHeading from '../SectionHeading';
import { Search, Palette, CalendarCheck2, Sparkles } from 'lucide-react';

/**
 * ServicesProcess
 * 4-Step Event Planning Workflow for the Services Page:
 * 01 DISCOVER -> 02 CREATE -> 03 ORGANIZE -> 04 EXECUTE.
 */
export default function ServicesProcess() {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      icon: Search,
      description: 'Understand the occasion, requirements and expectations.',
      detail: 'Initial client briefing, attendee demographics, venue feasibility & budget priorities.',
    },
    {
      number: '02',
      title: 'CREATE',
      icon: Palette,
      description: 'Develop the event concept and visual direction.',
      detail: 'Thematic moodboarding, 3D structural blueprints, floral schematics & color palettes.',
    },
    {
      number: '03',
      title: 'ORGANIZE',
      icon: CalendarCheck2,
      description: 'Coordinate the arrangements and event details.',
      detail: 'Vendor contracting, AV technical coordination, permitting & run-of-show scheduling.',
    },
    {
      number: '04',
      title: 'EXECUTE',
      icon: Sparkles,
      description: 'Bring everything together for the event.',
      detail: 'Live on-site direction, stage management, crisis mitigation & guest concierge.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Our Proven Workflow"
          title="Your Event, Planned with Purpose."
          description="We follow a disciplined four-stage workflow that transforms preliminary ideas into a flawlessly synchronized event."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="workflow-step-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-14 left-16 right-16 h-[1px] bg-gold/30 -z-0" />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className={`workflow-step-card reveal-init delay-${idx * 100} relative z-10 bg-beige/30 border border-gold/30 p-5 sm:p-6 lg:p-7 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:border-gold hover:bg-beige/60 hover:-translate-y-1 hover:shadow-card group`}
                data-step={`0${idx + 1}`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-ivory border border-gold/40 flex items-center justify-center group-hover:bg-forest group-hover:border-forest transition-colors">
                      <Icon className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">
                      PHASE <span className="number-display">{s.number}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-forest transition-colors">
                    {s.title}
                  </h3>

                  <p className="font-sans text-sm text-charcoal/85 leading-relaxed font-light mb-4">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/15">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-1">
                    Operational Scope:
                  </span>
                  <p className="text-xs font-sans text-charcoal/65 leading-snug">
                    {s.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
