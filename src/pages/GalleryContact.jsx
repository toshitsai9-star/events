import React from 'react';
import GalleryContactHero from '../components/gallery-contact/GalleryContactHero';
import InteractiveGallery from '../components/gallery-contact/InteractiveGallery';
import GalleryCTA from '../components/gallery-contact/GalleryCTA';
import ConsultationForm from '../components/gallery-contact/ConsultationForm';
import ConsultationProcess from '../components/gallery-contact/ConsultationProcess';

/**
 * Phase 5: Complete Gallery & Contact Page for ADI REDDY EVENTS.
 * Combines an editorial event gallery with lightbox navigation
 * and a full-spectrum event enquiry experience with business contact channels.
 */
export default function GalleryContact() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Gallery Hero Section */}
      <GalleryContactHero />

      {/* 2. Multi-Category Event Gallery with Lightbox Navigation */}
      <InteractiveGallery />

      {/* 3. Gallery Call to Action */}
      <GalleryCTA />

      {/* 4. Contact Hero & Event Enquiry Form */}
      <ConsultationForm />

      {/* 5. Consultation Process & Post-Submission Assurance */}
      <ConsultationProcess />
    </div>
  );
}
