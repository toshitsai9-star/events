import React, { useState } from 'react';
import '../../styles/servicesMobileCards.css';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../SectionHeading';

/**
 * ServicesShowcase
 * Editorial showcase for all 9 Event Categories of Adi Reddy Events.
 * Shows a short service list first; the remaining categories stay available on demand.
 */
export default function ServicesShowcase() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAllCategories, setShowAllMobileCategories] = useState(false);
  const categories = [
    {
      id: 'weddings',
      number: '01',
      title: 'Weddings & Receptions',
      eyebrow: 'Bespoke Nuptials & Grand Galas',
      intro: 'From architectural floral mandaps and royal stage decor to seamless guest hospitality, we orchestrate wedding celebrations that reflect your heritage and personal love story.',
      primaryImage: '/videos/optimized/wedding-poster-720.jpg',
      services: [
        'Wedding planning',
        'Reception arrangements',
        'Engagement ceremonies',
        'Wedding stage decoration',
        'Floral decoration',
        'Lighting and venue styling',
        'Guest experience coordination',
      ],
      tag: 'Grand Celebrations',
    },
    {
      id: 'birthdays',
      number: '02',
      title: 'Birthday Celebrations',
      eyebrow: 'Milestones & Themed Parties',
      intro: 'Creating joyous, imaginative celebrations—from magical wonderland themes for children to sophisticated milestone jubilee dinners filled with tailored personal touches.',
      primaryImage: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
      services: [
        "Kids' birthday parties",
        'Adult birthday celebrations',
        'Milestone birthdays',
        'Themed birthday parties',
        'Surprise birthday arrangements',
        'Balloon and stage decoration',
        'Customized celebration setups',
      ],
      tag: 'Joyful Occasions',
    },
    {
      id: 'corporate',
      number: '03',
      title: 'Corporate Events',
      eyebrow: 'Conferences & Brand Launches',
      intro: 'Engineering polished, technically flawless corporate environments that reinforce company stature, captivate stakeholders, and facilitate executive networking.',
      primaryImage: '/videos/portfolio/film2_poster.jpg',
      services: [
        'Corporate conferences',
        'Business meetings',
        'Product launches',
        'Award ceremonies',
        'Corporate celebrations',
        'Networking events',
        'Company annual gatherings',
      ],
      tag: 'Professional Execution',
    },
    {
      id: 'college',
      number: '04',
      title: 'College & Educational Events',
      eyebrow: 'Campus Carnivals & Cultural Fests',
      intro: 'Energizing university campuses with high-spirited cultural competitions, celebrity pro-nights, and commemorative ceremonies orchestrated with total crowd safety.',
      primaryImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
      services: [
        'College festivals',
        "Freshers' parties",
        'Farewell celebrations',
        'Annual day functions',
        'Cultural competitions',
        'College concerts',
        'Graduation celebrations',
        'Student events',
      ],
      tag: 'Youth & Campus',
    },
    {
      id: 'cultural',
      number: '05',
      title: 'Cultural & Traditional Events',
      eyebrow: 'Heritage Festivities & Community',
      intro: 'Honoring sacred traditions, festive melas, and cultural gatherings with authentic thematic decor, traditional stage craft, and deep ritualistic respect.',
      primaryImage: '/videos/optimized/feast-poster-720.jpg',
      services: [
        'Cultural festivals',
        'Traditional celebrations',
        'Community gatherings',
        'Religious and cultural programs',
        'Traditional stage arrangements',
        'Public celebrations',
        'Cultural performances',
      ],
      tag: 'Heritage & Faith',
    },
    {
      id: 'concerts',
      number: '06',
      title: 'Concerts & Entertainment',
      eyebrow: 'Live Music & Arena Shows',
      intro: 'Managing stadium acoustics, intelligent truss beam choreography, artist liaison, and safe crowd ingress for electrifying musical nights and public spectacles.',
      primaryImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      services: [
        'Live music shows',
        'DJ events',
        'Stage performances',
        'Entertainment programs',
        'Public shows',
        'Artist event arrangements',
        'Stage and lighting coordination',
      ],
      tag: 'Stage & Spectacle',
    },
    {
      id: 'private',
      number: '07',
      title: 'Private Parties & Special Occasions',
      eyebrow: 'Intimate Soirées & Family Feasts',
      intro: 'Orchestrating exclusive family milestones in private residences and scenic estates, focusing on intimate warmth, bespoke dining, and subtle acoustic luxury.',
      primaryImage: '/videos/optimized/housewarming-poster-720.jpg',
      services: [
        'Anniversary celebrations',
        'Baby showers',
        'Engagement parties',
        'Family gatherings',
        'Private celebrations',
        'Theme-based parties',
        'Special occasion arrangements',
      ],
      tag: 'Bespoke & Intimate',
    },
    {
      id: 'exhibitions',
      number: '08',
      title: 'Exhibitions & Public Events',
      eyebrow: 'Trade Expos & Brand Activations',
      intro: 'Constructing immersive exhibition pavilions, promotional trade stalls, and structured public event zones designed for high footfall engagement and brand recall.',
      primaryImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      services: [
        'Trade exhibitions',
        'Product exhibitions',
        'Promotional events',
        'Public gatherings',
        'Community events',
        'Brand activations',
        'Promotional stalls and setups',
      ],
      tag: 'Public & Commercial',
    },
    {
      id: 'custom',
      number: '09',
      title: 'Custom Event Management',
      eyebrow: 'Tailored Concepts & Unique Themes',
      intro: 'For rare concepts, experiential pop-ups, and unconventional celebrations. If you can envision it, our production engineers and artists will build it.',
      primaryImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      services: [
        'Personalized event planning',
        'Unique event concepts',
        'Customized themes',
        'Special celebrations',
        'Tailored event coordination',
      ],
      tag: 'Experiential Concepts',
    },
  ];

  return (
    <section id="services-showcase" className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Complete Event Services"
          title="Nine Distinct Disciplines. One Uncompromising Standard."
          description="We are a comprehensive event management atelier. Browse our event services and see how we can help."
          align="center"
          className="mb-12 md:mb-16"
        />



        {/* Alternating Editorial Showcase for All 9 Categories */}
        <div className="space-y-28 md:space-y-40">
          {categories.map((cat, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={cat.id}
                id={`category-${cat.id}`}
                className="service-category grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center group scroll-mt-28 reveal-init"
                data-mobile-expanded={expandedCategory === cat.id}
                data-category-hidden={index >= 3 && !showAllCategories}
              >
                <button
                  type="button"
                  className="service-category__mobile-toggle"
                  aria-expanded={expandedCategory === cat.id}
                  aria-controls={`category-details-${cat.id}`}
                  onClick={() => setExpandedCategory((open) => open === cat.id ? null : cat.id)}
                >
                  <span className="service-category__mobile-number">{cat.number}</span>
                  <span className="service-category__mobile-title">{cat.title}</span>
                  <span className="service-category__mobile-symbol" aria-hidden="true">{expandedCategory === cat.id ? '−' : '+'}</span>
                </button>
                <div id={`category-details-${cat.id}`} className="service-category__details">
                {/* Image Column: Combination of Large and Small Images */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative">
                    {/* Primary Large Image */}
                    <div className="relative overflow-hidden bg-beige border border-gold/30 shadow-card aspect-[16/11]">
                      <img
                        src={cat.primaryImage}
                        alt={`${cat.title} - Adi Reddy Events`}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                        {cat.tag}
                      </div>
                      <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1 font-mono text-xs text-charcoal font-medium border border-gold/30">
                        CATEGORY {cat.number}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Subtle decorative architectural corner line */}
                    <div
                      className={`hidden sm:block absolute -top-4 ${
                        isEven ? '-right-4' : '-left-4'
                      } w-20 h-20 border-t-2 ${
                        isEven ? 'border-r-2' : 'border-l-2'
                      } border-gold/35 pointer-events-none`}
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 text-left ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-gold font-semibold">
                        CATEGORY {cat.number}
                      </span>
                      <div className="w-8 h-[1px] bg-gold/40" />
                    </div>

                    <span className="text-[11px] uppercase tracking-[0.22em] text-forest/75 font-sans font-medium block mb-2">
                      {cat.eyebrow}
                    </span>

                    <h3 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
                    {cat.intro}
                  </p>

                  {/* Service Inclusions Checklist */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-3">
                      Included Service Offerings:
                    </span>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-sans text-charcoal/85">
                      {cat.services.slice(0, 4).map((s, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-4 h-4 rounded-full bg-beige border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-gold" />
                          </div>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enquiry Action Button */}
                  <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      to={`/gallery-contact?category=${cat.id}`}
                      className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans px-6 py-3 bg-crimson text-white hover:bg-crimson-hover transition-colors shadow-subtle border border-crimson group/link"
                    >
                      <span>Enquire About This Event</span>
                      <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>

                    <span className="text-[11px] uppercase tracking-widest text-charcoal/50 font-sans">
                      Adi Reddy Events
                    </span>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="service-category__mobile-more"
          aria-expanded={showAllCategories}
          onClick={() => setShowAllMobileCategories((visible) => !visible)}
        >
          {showAllCategories ? 'Show fewer categories' : 'View all 9 event services'}
        </button>

      </div>
    </section>
  );
}
