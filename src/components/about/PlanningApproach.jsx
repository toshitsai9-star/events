import React from 'react';
import SectionHeading from '../SectionHeading';
import { Search, Palette, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';

/**
 * PlanningApproach
 * 4-Step Event Planning Journey for Adi Reddy Events:
 * Discover -> Design -> Plan -> Celebrate.
 */
export default function PlanningApproach() {
  const steps = [
    {
      step: 'STEP 01',
      title: 'DISCOVER',
      icon: Search,
      description: "Understand the client's vision, requirements, occasion and expectations.",
      deliverable: 'Discovery session, budget alignment, initial feasibility review.',
    },
    {
      step: 'STEP 02',
      title: 'DESIGN',
      icon: Palette,
      description: 'Develop the creative concept, event theme and visual direction.',
      deliverable: 'Moodboards, theme palettes, spatial decor concepts.',
    },
    {
      step: 'STEP 03',
      title: 'PLAN',
      icon: CalendarCheck,
      description: 'Coordinate the arrangements, schedules, requirements and execution details.',
      deliverable: 'Vendor alignment, technical checklists, run-of-show timeline.',
    },
    {
      step: 'STEP 04',
      title: 'CELEBRATE',
      icon: Sparkles,
      description: 'Bring the plan to life and create an enjoyable event experience.',
      deliverable: 'Live on-site coordination, guest hospitality, flawless finish.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-beige/40 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Planning Process"
          title="From First Conversation to Final Celebration."
          description="We make event planning calm, transparent, and joyful. Our four-step workflow ensures no detail is left to chance."
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
                className={`workflow-step-card reveal-init delay-${idx * 100} relative z-10 bg-ivory border border-gold/30 p-5 sm:p-6 lg:p-7 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-card group`}
                data-step={`0${idx + 1}`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-beige border border-gold/40 flex items-center justify-center group-hover:bg-forest group-hover:border-forest transition-colors">
                      <Icon className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-forest transition-colors">
                    {s.title}
                  </h3>

                  <p className="font-sans text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/15">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-1">
                    Key Focus:
                  </span>
                  <p className="text-xs font-sans text-charcoal/65 leading-snug">
                    {s.deliverable}
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

