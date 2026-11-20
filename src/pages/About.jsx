import React from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import WhatWeDo from '../components/about/WhatWeDo';
import AboutPhilosophy from '../components/about/AboutPhilosophy';
import PlanningApproach from '../components/about/PlanningApproach';
import WhyChooseAdhiReddy from '../components/about/WhyChooseAdhiReddy';
import AboutVisualShowcase from '../components/about/AboutVisualShowcase';
import AboutCTA from '../components/about/AboutCTA';

/**
 * About Page Component
 * Phase 3 Complete About Us Page for ADI REDDY EVENTS.
 * A comprehensive brand narrative presenting the vision, multi-category event scope,
 * philosophy, planning workflow, and visual showcase.
 */
export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. About Hero Section with Breadcrumb */}
      <AboutHero />

      {/* 2. Our Story: "More Than Just Event Planning." */}
      <AboutStory />

      {/* 3. What We Do: "Celebrating Every Occasion, Big or Small." */}
      <WhatWeDo />

      {/* 4. Our Philosophy: "Every Event Is Unique. So Is Our Approach." */}
      <AboutPhilosophy />

      {/* 5. Our Event Planning Approach: "From First Conversation to Final Celebration." */}
      <PlanningApproach />

      {/* 6. Why Choose Adi Reddy Events: "Why Choose Us for Your Next Event?" */}
      <WhyChooseAdhiReddy />

      {/* 7. Visual Showcase: "Different Occasions. Endless Memories." */}
      <AboutVisualShowcase />

      {/* 8. Final Call to Action (Forest Green Background) */}
      <AboutCTA />
    </div>
  );
}
