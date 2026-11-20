import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesShowcase from '../components/services/ServicesShowcase';
import CompleteManagementSection from '../components/services/CompleteManagementSection';
import ServicesProcess from '../components/services/ServicesProcess';
import EventTypesMosaic from '../components/services/EventTypesMosaic';
import ServicesFAQ from '../components/services/ServicesFAQ';
import ServicesCTA from '../components/services/ServicesCTA';

/**
 * Phase 4: Complete Services Page for ADI REDDY EVENTS.
 * Positions the company as a full-spectrum, turnkey event management firm
 * covering all 9 specialized event categories, holistic 10-layer execution capabilities,
 * 4-step disciplined workflow, and diverse photographic event mosaic.
 */
export default function Services() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Services Page Hero */}
      <ServicesHero />

      {/* 2. Complete Event Management Services (All 9 Categories in Editorial Showcase) */}
      <ServicesShowcase />

      {/* 3. Complete Event Management Section (10 Holistic Capabilities) */}
      <CompleteManagementSection />

      {/* 4. How We Work (4-Step Timeline Workflow) */}
      <ServicesProcess />

      {/* 5. Featured Event Types (Photographic Mosaic Layout) */}
      <EventTypesMosaic />

      {/* 6. Client FAQ Accordion */}
      <ServicesFAQ />

      {/* 7. Final Call to Action Section */}
      <ServicesCTA />
    </div>
  );
}
