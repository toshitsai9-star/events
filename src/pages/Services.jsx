import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesShowcase from '../components/services/ServicesShowcase';
import ServicesFAQ from '../components/services/ServicesFAQ';
import ServicesCTA from '../components/services/ServicesCTA';

/**
 * Services page focused on event categories, frequently asked questions, and consultation.
 */
export default function Services() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Services Page Hero */}
      <ServicesHero />

      {/* 2. Complete Event Management Services (All 9 Categories in Editorial Showcase) */}
      <ServicesShowcase />

      {/* 6. Client FAQ Accordion */}
      <ServicesFAQ />

      {/* 7. Final Call to Action Section */}
      <ServicesCTA />
    </div>
  );
}
