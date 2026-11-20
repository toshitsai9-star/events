import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ServicesDirectory
 * Comprehensive deep-dive into the 8 core specialties of Adi Reddy Events.
 * Features an interactive category selector plus in-depth editorial breakdowns.
 */
export default function ServicesDirectory() {
  const [selectedCategory, setSelectedCategory] = useState('weddings');

  const specialties = [
    {
      id: 'weddings',
      number: '01',
      title: 'Weddings & Receptions',
      eyebrow: 'Bespoke Nuptials & Grand Galas',
      summary: 'Architectural floral scenography, regal stage decor, and end-to-end guest hospitality designed for the most cherished milestone of your life.',
      image: 'https://images.unsplash.com/photo-1769230387364-8b0c2b63e18b?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Complete wedding ceremony & reception design',
        'Custom mandap & architectural stage construction',
        'Bridal suite & VIP family concierge coordination',
        'Exquisite fresh floral styling & thematic tablescapes',
        'Acoustic sound design, ambient mood lighting & pyrotechnics',
        'Traditional rituals, pandit coordination & auspicious timeline management',
      ],
      idealFor: 'Destination weddings, palace receptions, intimate vow renewals, multi-day celebrations.',
    },
    {
      id: 'corporate',
      number: '02',
      title: 'Corporate Events & Summits',
      eyebrow: 'Professional Conventions & Brand Launches',
      summary: 'High-precision event production that elevates corporate stature, reinforces brand authority, and creates seamless environments for executive networking.',
      image: 'https://images.unsplash.com/photo-1778877035089-c80dcb877f45?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Executive conferences, keynote auditoriums & panel theaters',
        'High-impact product launches & brand unveilings',
        'Corporate annual galas & excellence award ceremonies',
        'State-of-the-art multi-camera live streaming & AV redundancy',
        'Exhibition booths, experiential product display pods & signage',
        'VIP delegate hospitality, registration kiosks & badge systems',
      ],
      idealFor: 'Tech summits, enterprise annual meets, investor conferences, global trade expos.',
    },
    {
      id: 'concerts',
      number: '03',
      title: 'Concerts & Entertainment Events',
      eyebrow: 'Live Music & Arena Shows',
      summary: 'Engineering stadium-scale acoustic precision, kinetic truss lighting, and artist liaison for high-energy music festivals and cultural performances.',
      image: 'https://images.unsplash.com/photo-1774438360748-141ab4a443d4?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Stadium & amphitheater acoustic rigging & surround engineering',
        'Intelligent beam, laser & kinetic lighting truss staging',
        'Artist rider management, green room curation & security',
        'Crowd barricading, ingress/egress safety & emergency protocols',
        'LED wall backdrop visual choreography & synchronized FX',
        'Ticketing gateway integration & on-ground scanning turnstiles',
      ],
      idealFor: 'Celebrity musical concerts, festival tours, stand-up comedy specials, public showcases.',
    },
    {
      id: 'college',
      number: '04',
      title: 'College & Educational Events',
      eyebrow: 'Campus Festivals & Cultural Days',
      summary: 'Electrifying student communities with meticulously organized annual fests, celebrity DJ nights, youth summits, and ceremonial farewells.',
      image: 'https://images.unsplash.com/photo-1768396855390-0728fa9c21e1?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Inter-college cultural fest curation & stage scheduling',
        'Campus pro-night celebrity bookings & sound engineering',
        'Freshers\' welcomes, graduating farewells & formal dinners',
        'Annual academic day stages, prize distributions & podiums',
        'Comprehensive campus security, volunteer management & safety',
        'Student talent showcase competitions & judging coordination',
      ],
      idealFor: 'Universities, engineering colleges, business schools, and academic institutions.',
    },
    {
      id: 'cultural',
      number: '05',
      title: 'Cultural & Traditional Events',
      eyebrow: 'Heritage Celebrations & Community Festivities',
      summary: 'Honoring heritage, spiritual reverence, and community harmony through authentic festive decor, traditional illumination, and classical performances.',
      image: 'https://images.unsplash.com/photo-1768508949307-044ec3c1836a?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Heritage festival celebrations (Diwali, Dussehra, Sankranti, Eid)',
        'Traditional temple & community gathering infrastructure',
        'Handcrafted floral hangings, brass lamp arrangements & rangoli',
        'Classical dance & traditional musical troop curation',
        'Community feast (Prasadam/Langar) hygienic dining setup',
        'Civic body permissions, crowd logistics & sanitation management',
      ],
      idealFor: 'Community associations, cultural foundations, residential societies, civic celebrations.',
    },
    {
      id: 'birthday',
      number: '06',
      title: 'Birthday Celebrations',
      eyebrow: 'Milestone Jubilees & Themed Parties',
      summary: 'Transforming birthdays into joyful sensory wonders—from bespoke wonderland themes for young dreamers to sophisticated jubilee galas for family patriarchs.',
      image: 'https://images.unsplash.com/photo-1765530950709-67e6af4ce3ad?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Bespoke theme conception (Whimsical, Vintage, Royal, Modern)',
        'Custom 3D stage backdrops & artistic balloon installations',
        'Interactive game stalls, magicians, caricature artists & hosts',
        'Designer tiered cake tablescapes & personalized confection bars',
        'Photography & cinematic memory reel recording',
        'Curated customized return gift packaging & favors',
      ],
      idealFor: '1st birthdays, sweet 16s, 21st milestones, silver 25ths, and golden 50th jubilees.',
    },
    {
      id: 'private',
      number: '07',
      title: 'Private Parties & Special Occasions',
      eyebrow: 'Intimate Soirées & Family Feasts',
      summary: 'Exclusive private gatherings staged with subtle elegance, personalized culinary choreography, and warm ambient lighting in private residences and estates.',
      image: 'https://images.unsplash.com/photo-1772945492456-8dd1ad977172?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Anniversary dinners & bespoke candlelit garden parties',
        'Traditional baby showers, cradle ceremonies & naming ceremonies',
        'Intimate cocktail soirées & sunset terrace gatherings',
        'Bespoke multi-course banquet menus & personal chef curation',
        'Subtle acoustic live jazz/unplugged musical accompaniment',
        'Discreet valet parking, personal concierge & private security',
      ],
      idealFor: 'Family anniversaries, private residence dinners, housewarmings, engagement parties.',
    },
    {
      id: 'custom',
      number: '08',
      title: 'Custom Events & Pop-Up Experiences',
      eyebrow: 'Experiential Concepts & Unconventional Briefs',
      summary: 'Bringing boundless imagination to life. If you have an unprecedented concept, a pop-up art installation, or a bespoke multi-day retreat, we build it.',
      image: 'https://images.unsplash.com/photo-1764592019571-ea7da62b5b6e?auto=format&fit=crop&w=1200&q=80',
      scope: [
        'Concept incubation, architectural blueprinting & 3D visualizations',
        'Unique venue transformations (warehouses, hillsides, private yachts)',
        'Immersive sensory rooms, kinetic installations & projection mapping',
        'Custom fabrication, bespoke props & theatrical set construction',
        'Curated multi-sensory culinary & cocktail storytelling',
        'White-glove executive coordination for VIP & celebrity hosts',
      ],
      idealFor: 'Brand activations, secret supper clubs, fashion runways, immersive experiential art.',
    },
  ];

  const current = specialties.find((s) => s.id === selectedCategory) || specialties[0];

  return (
    <section id="services-directory" className="py-20 md:py-32 bg-beige/40 border-b border-gold/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Interactive Discipline Selector Tabs */}
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-sans font-medium block text-center mb-4">
            Select A Category To Inspect Full Scope:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {specialties.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-sans transition-all duration-300 ${
                  selectedCategory === item.id
                    ? 'bg-forest text-ivory border border-gold/50 shadow-subtle'
                    : 'bg-ivory text-charcoal/75 border border-gold/25 hover:border-gold hover:text-charcoal'
                }`}
              >
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Specialty Spotlight Showcase */}
        <div className="bg-ivory border border-gold/30 shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-beige">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-xs px-3 py-1 border border-gold/30 text-[10px] uppercase tracking-[0.2em] text-ivory font-sans">
                Specialty {current.number}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Scope Details Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
                  {current.eyebrow}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mb-4">
                  {current.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed font-light mb-6">
                  {current.summary}
                </p>

                <div className="pt-4 border-t border-gold/20">
                  <h4 className="text-xs uppercase tracking-widest text-forest font-sans font-semibold mb-3 flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Included Scope of Execution:</span>
                  </h4>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans text-charcoal/80">
                    {current.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <div className="w-4 h-4 rounded-full bg-beige border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-gold" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-beige/35 border-l-2 border-gold text-xs font-sans text-charcoal/70">
                  <strong className="text-charcoal font-medium">Ideal For:</strong> {current.idealFor}
                </div>
              </div>

              <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                <Link
                  to="/gallery-contact"
                  className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans px-7 py-3.5 bg-crimson text-white hover:bg-crimson-hover transition-colors shadow-subtle border border-crimson"
                >
                  <span>Inquire For This Specialty</span>
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>

                <span className="text-[11px] uppercase tracking-widest text-charcoal/50 font-sans">
                  Tailored Budget Formulations
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

