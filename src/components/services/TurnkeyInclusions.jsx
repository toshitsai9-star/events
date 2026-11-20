import React from 'react';
import SectionHeading from '../SectionHeading';
import { Layers, UserCheck, ShieldCheck, Zap, Sparkles, RefreshCw } from 'lucide-react';

/**
 * TurnkeyInclusions
 * Highlights standard enterprise-grade inclusions across every Adi Reddy Events production.
 */
export default function TurnkeyInclusions() {
  const standards = [
    {
      icon: Layers,
      title: '3D Spatial Schematics',
      desc: 'Accurate spatial floor plans and aesthetic 3D renderings before fabrication begins, ensuring zero surprises on the day.',
    },
    {
      icon: UserCheck,
      title: 'Dedicated Lead Director',
      desc: 'One direct point of contact overseeing timelines, budget stewardship, and vendor orchestrations from inception to completion.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety & Civic Permitting',
      desc: 'Comprehensive liaison with municipal authorities, fire safety compliance, sound permissions, and venue regulations.',
    },
    {
      icon: Zap,
      title: 'Redundant Power & AV',
      desc: 'Double-generator power backups and backup audio-visual chains to safeguard high-profile performances and keynotes.',
    },
    {
      icon: Sparkles,
      title: 'Uniformed Concierge Crew',
      desc: 'Articulate, impeccably groomed event hostesses and floor managers trained in polite guest hospitality and crisis management.',
    },
    {
      icon: RefreshCw,
      title: 'Complete Site Restoration',
      desc: 'Post-event breakdown, waste segregation, and pristine venue handover completed swiftly and responsibly.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="The Turnkey Standard"
          title="Every Commission Receives Flawless Engineering"
          description="Beyond decor and aesthetics, we provide a robust production infrastructure that guarantees absolute peace of mind."
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standards.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-beige/35 border border-gold/25 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:border-gold hover:bg-beige/60 group"
              >
                <div>
                  <div className="w-12 h-12 bg-ivory border border-gold/40 flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-forest transition-colors">
                    <Icon className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors" />
                  </div>

                  <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-forest transition-colors">
                    {s.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                    Standard Guarantee
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

