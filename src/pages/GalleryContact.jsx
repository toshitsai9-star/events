import React from 'react';
import GalleryContactHero from '../components/gallery-contact/GalleryContactHero';
import ConsultationForm from '../components/gallery-contact/ConsultationForm';
import '../styles/galleryContact.css';

/**
 * Contact-only consultation page for ADI REDDY EVENTS.
 */
export default function GalleryContact() {
  return (
    <div className="gallery-contact-page flex flex-col w-full">
      <GalleryContactHero />
      <ConsultationForm />
    </div>
  );
}

