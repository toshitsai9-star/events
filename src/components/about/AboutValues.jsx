import React from 'react';
import { Compass, Sparkles, Shield, HeartHandshake } from 'lucide-react';

/**
 * AboutValues
 * Dark contrast section (Forest Green #06110C) detailing the four enduring principles of Adi Reddy Events.
 */
export default function AboutValues() {
  const values = [
    {
      icon: Compass,
      title: 'Architectural Precision',
      desc: 'We treat every stage, truss, and seating layout with engineering precision. Floor plans are calibrated to the millimeter for optimal sightlines and guest flow.',
    },
    {
      icon: Sparkles,
      title: 'Creative Audacity',
      desc: 'We refuse repetitive templates. Every floral arch, lighting cue, and sensory installation is conceptualized uniquely for the client\'s narrative.',
    },
    {
      icon: Shield,
      title: 'Absolute Discretion',
      desc: 'We are privileged to serve prominent families, enterprise executives, and sovereign hosts. Privacy, non-disclosure protocols, and confidentiality are sacrosanct.',
    },
    {
      icon: HeartHandshake,
      title: 'Gracious Hospitality',
      desc: 'No matter the grandeur of the setting, genuine warmth and dignified attentiveness to every attending guest remain the heartbeat of our productions.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-forest text-ivory border-b border-gold/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-light font-sans font-medium block mb-3">
            Guiding Tenets
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ivory leading-[1.15] tracking-tight mb-4">
            The Principles That Govern Our Craft
          </h2>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-4" />
          <p className="font-sans text-base text-beige/80 font-light leading-relaxed">
            These four foundational pillars guide every production decision, vendor partnership, and live event we execute.
          </p>
        </div>

        {/* 4 Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-forest-light border border-gold/20 flex flex-col justify-between transition-all duration-300 hover:border-gold shadow-card group"
              >
                <div>
                  <div className="w-12 h-12 bg-forest border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                    <Icon className="w-5 h-5 text-gold-light" />
                  </div>

                  <span className="font-mono text-[11px] text-gold block mb-2">
                    0{idx + 1} //
                  </span>

                  <h3 className="font-serif text-xl text-ivory mb-3 group-hover:text-gold-light transition-colors">
                    {v.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-beige/70 leading-relaxed font-light">
                    {v.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                    Tenet
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

