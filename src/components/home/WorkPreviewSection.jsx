import React from 'react';
import SectionHeading from '../SectionHeading';
import { ArrowUpRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * WorkPreviewSection
 * Dark contrast showcase (Forest Green #06110C) presenting a balanced selection of
 * event productions across Weddings, Corporate, Birthdays, College, Cultural, and Entertainment.
 */
export default function WorkPreviewSection() {
  const portfolioItems = [
    {
      id: 1,
      title: 'The Glasshouse Grand Reception',
      category: 'weddings',
      categoryLabel: 'Weddings & Receptions',
      location: 'Hyderabad Heritage Estate',
      image: 'https://images.unsplash.com/photo-1792015939252-232064694652?auto=format&fit=crop&w=1000&q=80',
      description: 'Architectural floral arches, cascading chandeliers, and personalized banquet dining.',
    },
    {
      id: 2,
      title: 'Global Tech Leadership Summit',
      category: 'corporate',
      categoryLabel: 'Corporate Events',
      location: 'Convention Center Main Hall',
      image: 'https://images.unsplash.com/photo-1759922378100-89dca9fe3c98?auto=format&fit=crop&w=1000&q=80',
      description: 'Keynote theater staging, seamless multi-channel AV, and VIP delegation lounges.',
    },
    {
      id: 3,
      title: 'Neon Pulse Campus Music Fest',
      category: 'college',
      categoryLabel: 'College & Educational',
      location: 'University Open Ground Arena',
      image: 'https://images.unsplash.com/photo-1712314947761-a8d718bd8c32?auto=format&fit=crop&w=1000&q=80',
      description: '10,000+ student cultural festival featuring live band performances and crowd management.',
    },
    {
      id: 4,
      title: 'Heritage Courtyard Deepavali Gala',
      category: 'cultural',
      categoryLabel: 'Cultural & Traditional',
      location: 'Royal Palace Grounds',
      image: 'https://images.unsplash.com/photo-1774438362290-ae513277ff28?auto=format&fit=crop&w=1000&q=80',
      description: 'Thousands of handcrafted brass diyas, traditional classical musicians, and heritage decor.',
    },
    {
      id: 5,
      title: 'Golden Horizon 50th Jubilee Soirée',
      category: 'birthday',
      categoryLabel: 'Birthday Celebrations',
      location: 'Private Lakefront Villa',
      image: 'https://images.unsplash.com/photo-1768767289640-6a79085a9895?auto=format&fit=crop&w=1000&q=80',
      description: 'Intimate bespoke milestone birthday dinner with custom acoustic jazz and curated menus.',
    },
    {
      id: 6,
      title: 'Acoustic Symphony Live Showcase',
      category: 'entertainment',
      categoryLabel: 'Concerts & Entertainment',
      location: 'City Amphitheater',
      image: 'https://images.unsplash.com/photo-1769542300531-2f9bf965260c?auto=format&fit=crop&w=1000&q=80',
      description: 'High-fidelity acoustic engineering, dynamic concert lighting, and artist liaison.',
    },
  ];


  return (
    <section id="work-preview" className="py-20 md:py-32 bg-forest text-ivory border-b border-gold/25 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-init flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-light font-sans font-medium mb-3">
            Our Work Preview
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ivory leading-[1.15] tracking-tight mb-4">
            Curated Glimpses of Celebrations
          </h2>
          <div className="w-12 h-[1px] bg-gold/40 mb-4" />
          <p className="text-base sm:text-lg font-sans font-light text-beige/80 leading-relaxed">
            Every occasion we produce is tailored from scratch. Explore our selected captures across private celebrations, professional summits, and grand public spectacles.
          </p>
        </div>

        <div className="reveal-init delay-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((work, index) => (
            <div
              key={work.id}
              className={`group bg-forest-light border border-gold/20 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-gold hover:-translate-y-1 shadow-floating delay-${(index % 3) * 100}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-forest/90 backdrop-blur-xs px-2.5 py-1 border border-gold/30 text-[9px] uppercase tracking-widest text-gold-light font-sans">
                  {work.categoryLabel}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-sans text-gold uppercase tracking-wider block mb-1">
                    {work.location}
                  </span>
                  <h3 className="font-serif text-xl text-ivory group-hover:text-gold-light transition-colors">
                    {work.title}
                  </h3>
                  <p className="font-sans text-xs text-beige/70 leading-relaxed mt-2">
                    {work.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/20 flex items-center justify-between">
                  <Link
                    to="/gallery-contact"
                    className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-sans text-gold-light hover:text-white transition-colors group/link"
                  >
                    <span>Inquire For This Style</span>
                    <ArrowUpRight className="ml-1 w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                  <Camera className="w-3.5 h-3.5 text-gold/50" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center pt-8 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/gallery-contact"
            className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em] px-8 py-3.5 bg-crimson text-white hover:bg-crimson-hover transition-colors shadow-subtle border border-crimson"
          >
            <span>Explore Full Gallery & Contact</span>
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.16em] px-8 py-3.5 border border-gold text-ivory hover:bg-gold hover:text-white bg-transparent transition-colors"
          >
            <span>Review Full Service Scope</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
