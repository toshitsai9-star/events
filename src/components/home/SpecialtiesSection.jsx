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
      description: 'High-precision event production for industry leaders—elevating corporate identity through state-of-the-art audiovisual staging, keynote theaters, and VIP hospitality.',
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
      eyebrow: 'Intimate Soirées & Family Feasts',
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {categories.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="group bg-ivory border border-gold/30 shadow-card overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-gold hover:-translate-y-1 reveal-init"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-beige">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                  {item.tag}
                </div>
                <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1 font-mono text-xs text-charcoal font-medium border border-gold/30">
                  {item.number}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal group-hover:text-forest transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/75 leading-relaxed mt-3">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gold/20">
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

                <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
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

        {/* Remaining 6 Categories in a Dynamic 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(2).map((item, idx) => {
            const cardLooks = [
              { shell: 'rounded-[2rem_2rem_0.5rem_2rem] bg-forest text-ivory border-forest shadow-xl', image: 'aspect-[3/4]', dark: true },
              { shell: 'rounded-xl bg-[#fbf4e6] text-charcoal border-gold/30 shadow-sm md:-translate-y-3', image: 'aspect-[16/10]', dark: false },
              { shell: 'rounded-t-[5rem] rounded-b-md bg-white text-charcoal border-gold/35 shadow-lg', image: 'aspect-[4/3]', dark: false },
              { shell: 'rounded-md bg-[#f5e8d7] text-charcoal border-transparent shadow-md md:rotate-[0.4deg]', image: 'aspect-[5/4]', dark: false },
              { shell: 'rounded-[2.5rem] bg-[#192a25] text-ivory border-gold/25 shadow-xl', image: 'aspect-[4/5]', dark: true },
              { shell: 'rounded-[1rem_3rem_1rem_3rem] bg-[#eee6da] text-charcoal border-gold/30 shadow-subtle', image: 'aspect-[16/10]', dark: false },
            ];
            const look = cardLooks[idx];
            return (
            <div
              key={item.id}
              className={`group border overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl reveal-init reveal-delay-${(idx % 3) * 100} ${look.shell}`}
            >
              <div className={`relative ${look.image} overflow-hidden bg-beige`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-forest/90 px-2.5 py-1 border border-gold/30 text-[9px] uppercase tracking-widest text-ivory font-sans">
                  {item.tag}
                </div>
                <div className="absolute top-3 right-3 bg-ivory/90 px-2 py-0.5 font-mono text-xs text-charcoal font-medium border border-gold/30">
                  {item.number}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-sans font-medium block mb-1 ${look.dark ? 'text-gold-light' : 'text-gold'}`}>
                    {item.eyebrow}
                  </span>
                  <h3 className={`font-serif text-xl transition-colors ${look.dark ? 'text-ivory group-hover:text-gold-light' : 'text-charcoal group-hover:text-forest'}`}>
                    {item.title}
                  </h3>
                  <p className={`font-sans text-xs leading-relaxed mt-2.5 ${look.dark ? 'text-ivory/75' : 'text-charcoal/70'}`}>
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gold/15">
                    <ul className={`space-y-1.5 text-xs font-sans ${look.dark ? 'text-ivory/80' : 'text-charcoal/75'}`}>
                      {item.highlights.slice(0, 3).map((h, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5">
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${look.dark ? 'bg-gold-light' : 'bg-gold'}`} />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-gold/20">
                  <Link
                    to="/gallery-contact"
                    className={`inline-flex items-center text-xs uppercase tracking-[0.16em] font-sans font-medium transition-colors group/btn ${look.dark ? 'text-gold-light hover:text-white' : 'text-forest hover:text-crimson'}`}
                  >
                    <span>Plan This Event</span>
                    <ArrowUpRight className="ml-1 w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
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

