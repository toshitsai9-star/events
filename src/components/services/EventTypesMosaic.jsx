import React from 'react';
import SectionHeading from '../SectionHeading';
import { Camera } from 'lucide-react';

/**
 * EventTypesMosaic
 * Photographic mosaic layout with varying image sizes highlighting the diversity of events:
 * Weddings, Birthdays, Corporate, College Fests, Cultural Events, Concerts, Private Celebrations, Exhibitions.
 */
export default function EventTypesMosaic() {
  const mosaicItems = [
    {
      title: 'Wedding Celebrations',
      category: 'Regal Receptions & Mandaps',
      image: 'https://images.unsplash.com/photo-1757598113081-1b4703e7918d?auto=format&fit=crop&w=1000&q=80',
      span: 'col-span-1 md:col-span-2 lg:col-span-2 aspect-[16/10]',
    },
    {
      title: 'Corporate Functions',
      category: 'Executive Summits & Launches',
      image: 'https://images.unsplash.com/photo-1778877031917-82a1b4bae3bc?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Concerts & Shows',
      category: 'Live Music & Kinetic Truss',
      image: 'https://images.unsplash.com/photo-1784123476634-25b5e2d9b53c?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Birthday Parties',
      category: 'Milestones & Themed Worlds',
      image: 'https://images.unsplash.com/photo-1770804351780-071225cd3889?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'College Festivals',
      category: 'Campus Carnivals & Pro-Nights',
      image: 'https://images.unsplash.com/photo-1763429338698-439aa108e7fb?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Cultural Events',
      category: 'Heritage Festivities & Diya Decor',
      image: 'https://images.unsplash.com/photo-1774437891624-eda26d677dff?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Private Celebrations',
      category: 'Intimate Soirées & Anniversaries',
      image: 'https://images.unsplash.com/photo-1788156417100-7b82cc248d3c?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1 aspect-[4/3]',
    },
    {
      title: 'Exhibitions & Brand Activations',
      category: 'Trade Pavilions & Promotional Stalls',
      image: 'https://images.unsplash.com/photo-1768508948508-507b3ff10cd3?auto=format&fit=crop&w=1000&q=80',
      span: 'col-span-1 md:col-span-2 lg:col-span-2 aspect-[16/10]',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-beige/40 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Diverse Event Formats"
          title="One Team. Countless Ways to Celebrate."
          description="From monumental celebrations to bespoke gatherings, explore our photographic mosaic representing the rich versatility of our event production team."
          align="center"
          className="mb-16 md:mb-20"
        />

        {/* Photographic Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mosaicItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden bg-ivory border border-gold/30 shadow-subtle transition-all duration-500 hover:border-gold hover:shadow-card hover:-translate-y-1 reveal-init reveal-delay-${(idx % 3) * 100} ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
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

      </div>
    </section>
  );
}
