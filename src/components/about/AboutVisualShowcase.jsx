import React from 'react';
import SectionHeading from '../SectionHeading';
import { ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AboutVisualShowcase
 * Asymmetrical multi-disciplinary photographic showcase representing:
 * Weddings, Corporate, Birthdays, College Fests, Cultural Programs, and Concerts.
 */
export default function AboutVisualShowcase() {
  const showcaseImages = [
    {
      title: 'Wedding Celebrations',
      category: 'Regal Receptions & Mandaps',
      image: 'https://images.unsplash.com/photo-1744805624954-a6686543c3ff?auto=format&fit=crop&w=900&q=80',
      span: 'col-span-1 md:col-span-2 lg:col-span-2 aspect-[16/10]',
    },
    {
      title: 'Corporate Events',
      category: 'Summits & Keynote Stages',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Birthday Parties',
      category: 'Themed & Milestone Celebrations',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'College Festivals',
      category: 'Campus Carnivals & Cultural Fests',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Cultural Programs',
      category: 'Traditional & Heritage Festivities',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Concerts & Entertainment',
      category: 'Live Music & Kinetic Stage Lighting',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80',
      span: 'col-span-1 md:col-span-2 lg:col-span-2 aspect-[16/10]',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-beige/40 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Visual Archives"
          title="Different Occasions. Endless Memories."
          description="A glimpse into the diverse environments we transform—from regal wedding stages and corporate conventions to college festivals and live concerts."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* Asymmetrical Image Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseImages.map((item, idx) => (
            <div
              key={idx}
              className={`reveal-init delay-${(idx % 3) * 100} group relative overflow-hidden bg-beige border border-gold/30 shadow-subtle transition-all duration-500 hover:border-gold hover:shadow-card hover:-translate-y-1 ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="text-[10px] uppercase tracking-widest text-gold-light font-sans block mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: "Explore Our Events" linking to Gallery & Contact */}
        <div className="mt-14 text-center">
          <Link
            to="/gallery-contact"
            className="inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.18em] px-8 sm:px-10 py-4 bg-forest text-ivory hover:bg-forest-light border border-gold/40 shadow-subtle transition-all duration-300 group"
          >
            <span>Explore Our Events</span>
            <ArrowRight className="ml-2.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-gold" />
          </Link>
        </div>

      </div>
    </section>
  );
}

