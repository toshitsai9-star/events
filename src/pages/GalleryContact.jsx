import React from 'react';
import GalleryContactHero from '../components/gallery-contact/GalleryContactHero';
import ConsultationForm from '../components/gallery-contact/ConsultationForm';
import ConsultationProcess from '../components/gallery-contact/ConsultationProcess';
import '../styles/galleryContact.css';

/**
 * Contact-only consultation page for ADI REDDY EVENTS.
 */
export default function GalleryContact() {
  return (
    <div className="gallery-contact-page flex flex-col w-full">
      <GalleryContactHero />
      <ConsultationForm />
      <ConsultationProcess />
    </div>
  );
}

