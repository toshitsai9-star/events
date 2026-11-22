import React, { useState, useEffect, useCallback } from 'react';
import SectionHeading from '../SectionHeading';
import { Camera, X, ChevronLeft, ChevronRight, ArrowUpRight, MapPin } from 'lucide-react';

/**
 * InteractiveGallery
 * Comprehensive photo gallery representing all 9 event disciplines.
 * Features:
 * - Editorial masonry-style layout with varying image proportions
 * - Responsive design with subtle hover zoom and metadata overlays
 * - Interactive lightbox with previous/next navigation, keyboard controls, and category enquiry handoff
 * - Clear illustrative-image disclosure
 */
export default function InteractiveGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Royal Heritage Glasshouse Mandap',
      category: 'weddings',
      categoryLabel: 'Weddings',
      location: 'Hyderabad Heritage Palace',
      image: 'https://images.unsplash.com/photo-1745573674471-e057af420757?auto=format&fit=crop&w=1200&q=80',
      description: 'Handcrafted floral arches, cascading crystal chandeliers, and multi-tier guest banquet staging.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1 md:col-span-2 lg:col-span-2',
    },
    {
      id: 2,
      title: 'Global Tech Leadership Summit',
      category: 'corporate',
      categoryLabel: 'Corporate Events',
      location: 'HITEC City Convention Center',
      image: 'https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?auto=format&fit=crop&w=1200&q=80',
      description: 'Keynote theater staging, seamless LED multi-camera projection, and executive VIP hospitality lounges.',
      aspect: 'aspect-[3/4]',
      span: 'col-span-1',
    },
    {
      id: 3,
      title: 'Acoustic Symphony Live Showcase',
      category: 'concerts',
      categoryLabel: 'Concerts',
      location: 'Open-Air Amphitheater',
      image: 'https://images.unsplash.com/photo-1778011390422-a4d4bd8936a7?auto=format&fit=crop&w=1200&q=80',
      description: 'Intelligent beam truss lighting, arena-grade surround acoustics, and full artist security coordination.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1',
    },
    {
      id: 4,
      title: 'Campus Pulse Cultural Festival',
      category: 'college',
      categoryLabel: 'College Events',
      location: 'University Arena Grounds',
      image: 'https://images.unsplash.com/photo-1781038507123-cbebc8ec508c?auto=format&fit=crop&w=1200&q=80',
      description: 'Annual college cultural fest featuring student band battles, celebrity DJ pro-night, and crowd management.',
      aspect: 'aspect-[16/10]',
      span: 'col-span-1 md:col-span-2',
    },
    {
      id: 5,
      title: 'Heritage Courtyard Deepavali Festival',
      category: 'cultural',
      categoryLabel: 'Cultural Events',
      location: 'Historic Haveli Courtyard',
      image: 'https://images.unsplash.com/photo-1792773200649-c150be1ba67c?auto=format&fit=crop&w=1200&q=80',
      description: 'Thousands of handcrafted brass diyas, marigold floral curtains, and live traditional classical music.',
      aspect: 'aspect-[3/4]',
      span: 'col-span-1',
    },
    {
      id: 6,
      title: 'Golden Jubilee 50th Milestone Soirée',
      category: 'birthdays',
      categoryLabel: 'Birthdays',
      location: 'Lakefront Private Estate',
      image: 'https://images.unsplash.com/photo-1774290687229-a725965554c6?auto=format&fit=crop&w=1200&q=80',
      description: 'Intimate bespoke milestone birthday dinner with custom acoustic jazz, tiered dessert pavilion, and personalized gifting.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1',
    },
    {
      id: 7,
      title: 'Trade Expo & Industrial Showcase',
      category: 'exhibitions',
      categoryLabel: 'Exhibitions',
      location: 'International Trade Center',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      description: 'Modular exhibition pavilion booths, brand display pods, and attendee registration infrastructure.',
      aspect: 'aspect-[16/10]',
      span: 'col-span-1 md:col-span-2',
    },
    {
      id: 8,
      title: 'Twilight Garden Anniversary Dinner',
      category: 'private',
      categoryLabel: 'Private Parties',
      location: 'Private Villa Grounds',
      image: 'https://images.unsplash.com/photo-1774927062109-ec5dc79c7aa8?auto=format&fit=crop&w=1200&q=80',
      description: 'Intimate candlelit dining for close family, personalized culinary choreography, and ambient string illumination.',
      aspect: 'aspect-[3/4]',
      span: 'col-span-1',
    },
    {
      id: 9,
      title: 'The Luminary Grand Ballroom Reception',
      category: 'weddings',
      categoryLabel: 'Weddings',
      location: 'Luxury Palace Ballroom',
      image: 'https://images.unsplash.com/photo-1768508663341-ed48fd1e69d8?auto=format&fit=crop&w=1200&q=80',
      description: 'Monumental crystal chandeliers, mirrored aisle pathways, and bespoke architectural stage facade.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1',
    },
    {
      id: 10,
      title: 'Sonic Waves Arena Music Night',
      category: 'concerts',
      categoryLabel: 'Concerts',
      location: 'City Stadium Arena',
      image: 'https://images.unsplash.com/photo-1773828746476-7ca780cdcb82?auto=format&fit=crop&w=1200&q=80',
      description: 'Stadium festival staging with synchronized pyrotechnics, laser choreography, and perimeter safety barriers.',
      aspect: 'aspect-[16/10]',
      span: 'col-span-1 md:col-span-2',
    },
    {
      id: 11,
      title: 'Whimsical Enchanted Birthday Party',
      category: 'birthdays',
      categoryLabel: 'Birthdays',
      location: 'Botanical Conservatory',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      description: 'Theme-based wonderland decor, customized interactive game stations, and tailored confectionery artistry.',
      aspect: 'aspect-[3/4]',
      span: 'col-span-1',
    },
    {
      id: 12,
      title: 'Enterprise Product Launch & Keynote',
      category: 'corporate',
      categoryLabel: 'Corporate Events',
      location: 'Exhibition Tech Auditorium',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      description: 'Curved high-resolution LED backdrop, synchronized reveal lighting, and VIP press conference staging.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1',
    },
    {
      id: 13,
      title: 'Campus Convocation & Annual Honors',
      category: 'college',
      categoryLabel: 'College Events',
      location: 'University Main Hall',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      description: 'Formal academic stage architecture, ceremonial lighting, and multi-tier auditorium seating management.',
      aspect: 'aspect-[3/4]',
      span: 'col-span-1',
    },
    {
      id: 14,
      title: 'Traditional Temple Mandap & Classical Fest',
      category: 'cultural',
      categoryLabel: 'Cultural Events',
      location: 'Historic Cultural Mandir',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      description: 'Auspicious floral rangoli carpets, carved pillar accents, and ceremonial seating for community leaders.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1',
    },
    {
      id: 15,
      title: 'Intimate Terrace Champagne Soirée',
      category: 'private',
      categoryLabel: 'Private Parties',
      location: 'Skyline Penthouse Terrace',
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      description: 'Bespoke cocktail bar installations, ambient warm filament illumination, and curated fine dining tablescapes.',
      aspect: 'aspect-[16/10]',
      span: 'col-span-1 md:col-span-2',
    },
    {
      id: 16,
      title: 'Brand Activation & Product Pods',
      category: 'exhibitions',
      categoryLabel: 'Exhibitions',
      location: 'Design Pavilion Atrium',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      description: 'Interactive consumer experiential zones, custom-built product displays, and illuminated corporate branding.',
      aspect: 'aspect-[4/3]',
      span: 'col-span-1',
    },
  ];



  // If a remote gallery photograph is unavailable, use an included local event
  // still so the card and lightbox never display an empty white image area.
  const localFallbacks = {
    weddings: '/videos/optimized/wedding-poster-720.jpg',
    corporate: '/videos/portfolio/film1_poster.jpg',
    concerts: '/videos/portfolio/film1_frame_1.jpg',
    college: '/videos/portfolio/film1_frame_2.jpg',
    cultural: '/videos/optimized/feast-poster-720.jpg',
    birthdays: '/videos/optimized/housewarming-poster-720.jpg',
    exhibitions: '/videos/portfolio/film1_frame_3.jpg',
    private: '/videos/optimized/housewarming-poster-720.jpg',
  };
  const useLocalFallback = (event, item) => {
    const image = event.currentTarget;
    if (image.dataset.localFallback) return;
    image.dataset.localFallback = 'true';
    image.src = localFallbacks[item.category] || '/videos/portfolio/film1_poster.jpg';
  };

  const filteredItems = galleryItems;

  // Lightbox Navigation Functions
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  }, [lightboxIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // Current photo in lightbox
  const currentPhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="event-gallery" className="py-20 md:py-32 bg-beige/40 border-b border-gold/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Event Gallery"
          title="Curated Event Photography"
          description="Explore our multi-category archives illustrating our aesthetic staging, lighting design, and spatial architecture across all event formats. Click any image to examine full-resolution details."
          align="center"
          className="mb-12 md:mb-14"
        />

        {/* Editorial Masonry-Style Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group cursor-pointer bg-ivory border border-gold/25 shadow-subtle overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-gold hover:shadow-card hover:-translate-y-1 reveal-init reveal-delay-${(idx % 3 + 1) * 100} ${item.span}`}
            >
              {/* Image Container with Hover Zoom */}
              <div className={`relative ${item.aspect} overflow-hidden bg-beige`}>
                <img
                  src={localFallbacks[item.category] || item.image}
                  alt={item.title}
                  onError={(event) => useLocalFallback(event, item)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-forest/90 backdrop-blur-xs px-2.5 py-1 border border-gold/30 text-[9px] uppercase tracking-widest text-ivory font-sans">
                  {item.categoryLabel}
                </div>

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <span className="px-4 py-2 bg-ivory/95 border border-gold text-charcoal font-sans text-xs uppercase tracking-widest flex items-center space-x-2 shadow-subtle">
                    <Camera className="w-3.5 h-3.5 text-gold" />
                    <span>View Detail & Inspect</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3 bg-ivory">
                <div>
                  <div className="flex items-center space-x-1.5 text-[10px] font-sans text-gold uppercase tracking-wider mb-1">
                    <MapPin className="w-3 h-3 text-gold" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-forest transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-charcoal/70 leading-relaxed mt-2 line-clamp-2 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold/15 flex items-center justify-between text-xs font-sans text-forest group-hover:text-crimson transition-colors">
                  <span className="uppercase tracking-widest text-[10px]">Inspect Setup</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Illustrative Gallery Demo Disclosure */}
        <div className="mt-14 p-5 bg-ivory border border-gold/30 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
            <strong className="text-charcoal font-medium">Gallery Reference Notice:</strong> The photographs in this gallery are illustrative event production benchmarks and design references that reflect staging standards, themes, and the creative capabilities of Adi Reddy Events.
          </p>
        </div>

      </div>

      {/* Lightbox Modal with Next / Prev Navigation */}
      {currentPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-fade-in"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview Lightbox"
        >
          <div 
            className="relative max-w-4xl w-full bg-ivory border border-gold/40 shadow-floating overflow-hidden animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 bg-forest text-ivory border-b border-gold/20">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-sans block">
                    {currentPhoto.categoryLabel}
                  </span>
                  <span className="text-[10px] text-ivory/50 font-mono">
                    ({lightboxIndex + 1} of {filteredItems.length})
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory mt-0.5">
                  {currentPhoto.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="p-2 text-ivory/80 hover:text-gold hover:bg-forest-light transition-colors focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Area with Left / Right Arrows */}
            <div className="relative aspect-[16/10] bg-charcoal overflow-hidden group/modal">
              <img
                src={localFallbacks[currentPhoto.category] || currentPhoto.image}
                alt={currentPhoto.title}
                onError={(event) => useLocalFallback(event, currentPhoto)}
                className="w-full h-full object-cover"
              />

              {/* Previous Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-forest/80 text-ivory hover:bg-forest hover:text-gold border border-gold/30 shadow-subtle transition-all duration-200 focus:outline-none"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-forest/80 text-ivory hover:bg-forest hover:text-gold border border-gold/30 shadow-subtle transition-all duration-200 focus:outline-none"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-ivory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gold/20">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-gold uppercase tracking-wider font-sans font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentPhoto.location}</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-charcoal/80 max-w-xl font-light">
                  {currentPhoto.description}
                </p>
              </div>

              {/* Inquire CTA Hand-off to Form */}
              <a
                href={`#contact-enquiry?category=${currentPhoto.category}`}
                onClick={() => {
                  handleClose();
                  const el = document.getElementById('contact-enquiry');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-sans px-5 py-3 bg-crimson text-white hover:bg-crimson-hover transition-colors flex-shrink-0 border border-crimson"
              >
                <span>Inquire For This Style</span>
                <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
