import '../../styles/specialtiesCards.css';
import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../SectionHeading';

/**
 * SpecialtiesSection
 * Comprehensive showcase of all 8 Event Categories for ADI REDDY EVENTS.
 * Designed as a high-end editorial alternating layout rather than repetitive cards.
 */
export default function SpecialtiesSection() {
  const categories = [
    {
      id: 'weddings',
      number: '01',
      title: 'Weddings & Receptions',
      eyebrow: 'Bespoke Nuptials & Grand Galas',
      description: 'Creating unforgettable wedding chapters with signature stage architecture, ethereal floral mandaps, and seamless hospitality for you and your honored guests.',
      highlights: [
        'Wedding celebrations',
        'Reception arrangements',
        'Engagement ceremonies',
        'Wedding stage decoration',
        'Floral & venue decoration',
      ],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
      tag: 'Signature Showcase',
    },
    {
      id: 'corporate',
      number: '02',
      title: 'Corporate Events',
      eyebrow: 'Executive Summits & Launches',
      description: 'High-precision event production for industry leaders-elevating corporate identity through state-of-the-art audiovisual staging, keynote theaters, and VIP hospitality.',
      highlights: [
        'Corporate meetings',
        'Conferences & symposiums',
        'Product launches',
        'Award ceremonies',
        'Business gatherings',
      ],
      image: 'https://images.unsplash.com/photo-1783486620945-f9bd1fa69f86?auto=format&fit=crop&w=1000&q=80',
      tag: 'Professional Execution',
    },
    {
      id: 'concerts',
      number: '03',
      title: 'Concerts & Entertainment Events',
      eyebrow: 'Live Performances & Spectacles',
      description: 'Engineering arena-scale acoustics, kinetic stage lighting, and artist coordination for electrifying musical nights, public festivals, and live concerts.',
      highlights: [
        'Live music events',
        'Stage shows & theatricals',
        'Entertainment programs',
        'Public performances',
        'Special showcases',
      ],
      image: 'https://images.unsplash.com/photo-1776883291831-ca37d8677358?auto=format&fit=crop&w=1000&q=80',
      tag: 'Arena & Stage',
    },
    {
      id: 'college',
      number: '04',
      title: 'College & Educational Events',
      eyebrow: 'Campus Festivals & Cultural Days',
      description: 'Energizing student communities with grand college fests, DJ nights, youth summits, and ceremonial farewells executed with maximum safety and flair.',
      highlights: [
        'College fests & carnivals',
        'Annual day celebrations',
        'Freshers\' parties',
        'Farewell events',
        'Cultural competitions',
      ],
      image: 'https://images.unsplash.com/photo-1762765684810-b734486c5eda?auto=format&fit=crop&w=1000&q=80',
      tag: 'Youth & Campus',
    },
    {
      id: 'cultural',
      number: '05',
      title: 'Cultural & Traditional Events',
      eyebrow: 'Heritage Festivities & Community',
      description: 'Honoring sacred traditions, festive carnivals, and cultural spectacles with authentic thematic decor, heritage lighting, and ritualistic reverence.',
      highlights: [
        'Festivals & festive melas',
        'Traditional celebrations',
        'Religious & community gatherings',
        'Cultural performances',
        'Public celebrations',
      ],
      image: 'https://images.unsplash.com/photo-1731529076100-bf59499fb61c?auto=format&fit=crop&w=1000&q=80',
      tag: 'Heritage & Faith',
    },
    {
      id: 'birthday',
      number: '06',
      title: 'Birthday Celebrations',
      eyebrow: 'Milestones & Themed Parties',
      description: 'From whimsical wonderland celebrations for children to opulent 50th jubilee dinners, we craft joyous birthdays filled with tailored themes and surprises.',
      highlights: [
        'Milestone birthdays (18th, 21st, 50th)',
        'Themed birthday events',
        'Surprise celebrations',
        'Kids\' themed parties',
        'Custom dessert & stage setups',
      ],
      image: 'https://images.unsplash.com/photo-1774290687117-eb1769c33df3?auto=format&fit=crop&w=1000&q=80',
      tag: 'Joyful Milestones',
    },
    {
      id: 'private',
      number: '07',
      title: 'Private Parties & Special Occasions',
      eyebrow: 'Intimate Soir�es & Family Feasts',
      description: 'Curating warm, luxurious private gatherings where personalized menus, bespoke floral arrangements, and cozy ambient lighting set the tone.',
      highlights: [
        'Anniversary celebrations',
        'Family reunions & gatherings',
        'Private dinner parties',
        'Baby showers & cradle ceremonies',
        'Intimate engagement parties',
      ],
      image: 'https://images.unsplash.com/photo-1757030477778-9a1710b16948?auto=format&fit=crop&w=1000&q=80',
      tag: 'Intimate & Bespoke',
    },
    {
      id: 'custom',
      number: '08',
      title: 'Custom Events',
      eyebrow: 'Experiential & Tailored Concepts',
      description: 'Have a rare concept or ambitious celebration in mind? We design bespoke scenarios, avant-garde themes, and custom-engineered pop-up environments.',
      highlights: [
        'Personalized event concepts',
        'Theme-based immersive worlds',
        'Special luxury celebrations',
        'Pop-up exhibitions',
        'Custom event planning',
      ],
      image: 'https://images.unsplash.com/photo-1788156225215-3c807c9d4730?auto=format&fit=crop&w=1000&q=80',
      tag: 'Infinite Possibility',
    },
  ];

  return (
    <section id="event-specialties" className="py-20 md:py-32 bg-beige/40 border-b border-gold/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Our Event Specialties"
          title="Comprehensive Planning For Every Occasion"
          description="We are a complete event management company. Whether it is a grand royal wedding, a high-level corporate convention, or an energetic college concert, we deliver perfection at every scale."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* Featured Showcase: 2 Marquee Categories in Large Editorial Format */}
        <div className="featured-specialty-grid grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 mb-10 md:mb-12">
          {categories.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="group bg-ivory border border-gold/30 shadow-card overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-gold hover:-translate-y-1 reveal-init"
            >
              <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-beige">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                  {item.tag}
                </div>
                <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1 number-display text-xs text-charcoal font-medium border border-gold/30">
                  {item.number}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[13px] sm:text-sm text-charcoal/75 leading-relaxed mt-2 sm:mt-3">
                    {item.description}
                  </p>

                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gold/20">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-2">
                      Key Capabilities:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-charcoal/80">
                      {item.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-gold/15 flex items-center justify-between">
                  <Link
                    to="/gallery-contact"
                    className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans font-medium text-crimson hover:text-crimson-hover transition-colors group/link"
                  >
                    <span>Inquire For This Category</span>
                    <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                  <span className="text-[11px] font-sans text-charcoal/50 uppercase tracking-widest">
                    Adi Reddy Events
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Six event dossiers in a framed editorial gallery */}
        <div className="event-dossier-grid">
          {categories.slice(2).map((item, idx) => {
            const tone = ['ivory', 'forest', 'sand', 'ink', 'paper', 'forest'][idx];
            return (
              <article key={item.id} className={`event-dossier event-dossier--${tone} reveal-init reveal-delay-${(idx % 3) * 100}`}>
                <header className="event-dossier__masthead"><span>{item.tag}</span><span className="event-dossier__folio">{item.number}<i>/</i></span></header>
                <div className="event-dossier__photo"><img src={item.image} alt={item.title} loading="lazy" /><span className="event-dossier__photo-caption">ADI REDDY EVENTS � HYDERABAD</span></div>
                <div className="event-dossier__copy">
                  <span className="event-dossier__eyebrow">{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>{item.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  <Link to="/gallery-contact" className="event-dossier__link"><span>Plan this event</span><ArrowUpRight aria-hidden="true" /></Link>
                </div>
                <span className="event-dossier__side-label">CURATED EVENT EXPERIENCE</span>
              </article>
            );
          })}
        </div>

        {/* Category Consultation Note */}
        <div className="mt-16 text-center">
          <p className="font-serif italic text-base text-charcoal/80 mb-4">
            "Looking to organize a unique combination of celebrations or an unlisted special format?"
          </p>
          <Link
            to="/gallery-contact"
            className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.18em] px-8 py-3.5 bg-crimson text-white hover:bg-crimson-hover transition-colors shadow-subtle border border-crimson"
          >
            <span>Discuss A Custom Event Brief</span>
          </Link>
        </div>

      </div>
    </section>
  );
}


