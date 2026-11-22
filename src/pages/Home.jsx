import React from 'react';
import EventHeroSection from '../components/avatar-hero/EventHeroSection';
import IntroSection from '../components/home/IntroSection';
import SpecialtiesSection from '../components/home/SpecialtiesSection';
import HomeCTASection from '../components/home/HomeCTASection';

/**
 * Home Page Component
 * 
 * 1. Top Hero Screen (100vh): Pure editorial visual with "ADI REDDY" elevated in the background
 *    and the realistic Telugu AI Talking Avatar founder portrait in the foreground.
 *    (All talking avatar, speech, audio, and video capabilities integrated directly into the portrait - no separate sections).
 * 2. IntroSection: "More Than Events. We Create Experiences."
 * 3. SpecialtiesSection: 8 Comprehensive Event Categories.
 * 4. HomeCTASection: Consultation Inquiries & Contact Suite.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* 1. Cinematic Hero with Telugu Talking Avatar directly on the Founder Portrait */}
      <EventHeroSection />

      {/* 2. Introduction & Holistic Philosophy */}
      <IntroSection />

      {/* 3. Event Specialties */}
      <SpecialtiesSection />

      {/* 4. Closing Booking Call to Action */}
      <HomeCTASection />
    </div>
  );
}
