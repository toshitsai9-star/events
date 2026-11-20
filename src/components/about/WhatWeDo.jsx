import React from 'react';
import SectionHeading from '../SectionHeading';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * WhatWeDo
 * Highlights Adi Reddy Events' comprehensive management of diverse event types.
 * Firmly reinforces that the brand is not limited to weddings.
 */
export default function WhatWeDo() {
  const categories = [
    {
      title: 'Weddings & Receptions',
      subtitle: 'Sacred Vows & Grand Banquets',
      desc: 'Stage decoration, mandap architecture, floral installations, and welcoming hospitality for your milestone union.',
      image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Corporate Functions',
      subtitle: 'Conferences & Product Launches',
      desc: 'Seamless audiovisual integration, keynote auditoriums, award nights, and structured executive hospitality.',
      image: 'https://images.unsplash.com/photo-1776039325240-02916820bfeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Concerts & Entertainment',
      subtitle: 'Live Shows & Stage Performances',
      desc: 'High-energy acoustic engineering, dynamic beam lighting, artist management, and secure crowd logistics.',
      image: 'https://images.unsplash.com/photo-1773966584200-344163b545e2?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'College & Educational Events',
      subtitle: 'Campus Fests & Annual Days',
      desc: 'Youth festivals, celebrity DJ nights, cultural competitions, and ceremonial farewells executed with enthusiasm and order.',
      image: 'https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Cultural & Traditional Events',
      subtitle: 'Festivals & Heritage Gatherings',
      desc: 'Authentic festive decorations, traditional lighting, community gatherings, and ritualistic reverence.',
      image: 'https://images.unsplash.com/photo-1759648301835-a0ccd345a417?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Birthday Celebrations',
      subtitle: 'Milestone Jubilees & Themed Parties',
      desc: 'Joyful birthdays tailored with personalized themes, custom dessert backdrops, and memorable entertainment.',
      image: 'https://images.unsplash.com/photo-1770804673655-36b6e9bf68f1?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Private Parties',
      subtitle: 'Anniversaries & Family Soirées',
      desc: 'Intimate dinner gatherings, baby showers, and anniversary celebrations staged with discreet warmth.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Custom Celebrations',
      subtitle: 'Tailored Concepts & Unique Themes',
      desc: 'Bespoke event concepts, pop-up environments, and custom experiential productions crafted to unique briefs.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-beige/40 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Full-Spectrum Event Planning"
          title="Celebrating Every Occasion, Big or Small."
          description="Adi Reddy Events is a versatile event management company. We bring the same dedication, artistic eye, and logistical discipline to intimate family gatherings as we do to multi-thousand attendee conventions and concerts."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`reveal-init group bg-ivory border border-gold/25 shadow-subtle overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-card delay-${(idx % 4) * 100}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-beige">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-ivory/95 px-2 py-0.5 font-mono text-[11px] text-charcoal font-medium border border-gold/30">
                  0{idx + 1}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-forest transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/70 leading-relaxed mt-2 font-light">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold/15">
                  <Link
                    to="/services"
                    className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-sans text-forest group-hover:text-crimson transition-colors"
                  >
                    <span>View Specialty</span>
                    <ArrowUpRight className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-14 p-6 bg-ivory border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
            <div>
              <p className="font-serif text-base text-charcoal">Complete Turnkey Management</p>
              <p className="text-xs font-sans text-charcoal/65">From venue scouting to live day orchestration across all event categories</p>
            </div>
          </div>
          <Link
            to="/gallery-contact"
            className="text-xs uppercase tracking-[0.18em] font-sans px-6 py-2.5 bg-forest text-ivory hover:bg-forest-light transition-colors border border-forest"
          >
            Inquire For Your Event
          </Link>
        </div>

      </div>
    </section>
  );
}

