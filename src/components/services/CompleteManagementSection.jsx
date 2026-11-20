import React from 'react';
import SectionHeading from '../SectionHeading';
import {
  Lightbulb,
  Palette,
  MapPin,
  Layers,
  Volume2,
  Sparkles,
  Calendar,
  Users2,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';

/**
 * CompleteManagementSection
 * Demonstrates the 10 holistic management capabilities of Adi Reddy Events.
 * Highlights that full-service event management encompasses far more than decoration.
 */
export default function CompleteManagementSection() {
  const capabilities = [
    {
      icon: Lightbulb,
      title: 'Event Concept Development',
      desc: 'Formulating the overarching artistic vision, storytelling angles, and strategic goals for your gathering.',
    },
    {
      icon: Palette,
      title: 'Theme and Design Planning',
      desc: 'Developing harmonious color palettes, custom spatial schematics, and cohesive aesthetic motifs.',
    },
    {
      icon: MapPin,
      title: 'Venue Coordination',
      desc: 'Site inspection, spatial layout planning, electrical load feasibility, and venue management alignment.',
    },
    {
      icon: Layers,
      title: 'Stage and Backdrop Design',
      desc: 'Architectural staging, 3D structural backdrops, elevated podia, and ceremonial mandap fabrication.',
    },
    {
      icon: Volume2,
      title: 'Lighting and Sound Coordination',
      desc: 'Acoustic calibration, intelligent beam lighting, ambient mood illumination, and stage monitor engineering.',
    },
    {
      icon: Sparkles,
      title: 'Decoration and Styling',
      desc: 'Fresh floral installations, curated furniture rentals, bespoke tablescapes, and atmospheric accents.',
    },
    {
      icon: Calendar,
      title: 'Event Scheduling',
      desc: 'Drafting minute-by-minute run-of-show itineraries, artist call times, and ritual timing synchronizations.',
    },
    {
      icon: Users2,
      title: 'Vendor Coordination',
      desc: 'Sourcing, contracting, briefing, and supervising third-party caterers, technicians, and specialized artisans.',
    },
    {
      icon: HeartHandshake,
      title: 'Guest Experience Planning',
      desc: 'Seamless guest registration, VIP hospitality protocols, valet parking management, and usher briefing.',
    },
    {
      icon: ShieldCheck,
      title: 'On-site Event Coordination',
      desc: 'Calm, proactive live supervision behind the scenes, ensuring flawless cue-to-cue execution throughout the day.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-beige/40 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Turnkey Execution Capabilities"
          title="From Planning to Execution, We Bring It All Together."
          description="Professional event management involves far more than decoration. We manage all ten operational, creative, and technical layers to guarantee an effortless experience for you and your guests."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* 10 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 bg-ivory border border-gold/25 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:border-gold hover:shadow-card hover:-translate-y-1 group reveal-init reveal-delay-${(idx % 5) * 100}`}
              >
                <div>
                  <div className="w-10 h-10 bg-beige border border-gold/40 flex items-center justify-center mb-5 group-hover:bg-forest group-hover:border-forest transition-colors">
                    <Icon className="w-4 h-4 text-gold group-hover:text-gold-light transition-colors" />
                  </div>

                  <span className="font-mono text-[10px] text-gold block mb-1.5">
                    CAPABILITY {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} //
                  </span>

                  <h3 className="font-serif text-lg text-charcoal mb-2 group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-medium">
                    Verified Scope
                  </span>
                  <div className="w-2.5 h-[1px] bg-gold/40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Proposed Capability Note */}
        <div className="mt-14 p-5 bg-ivory border border-gold/30 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
            <strong className="text-charcoal font-medium">Client Presentation Note:</strong> These ten capabilities represent the comprehensive proposed production capabilities for Adi Reddy Events. Every module can be customized or expanded based on your specific commission requirements.
          </p>
        </div>

      </div>
    </section>
  );
}
