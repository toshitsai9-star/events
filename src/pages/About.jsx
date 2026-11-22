import React from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import PlanningApproach from '../components/about/PlanningApproach';
import AboutCTA from '../components/about/AboutCTA';

/**
 * About page focused on the company story, planning approach, and client benefits.
 */
export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. About Hero Section with Breadcrumb */}
      <AboutHero />

      {/* 2. Our Story: "More Than Just Event Planning." */}
      <AboutStory />

      {/* 5. Our Event Planning Approach: "From First Conversation to Final Celebration." */}
      <PlanningApproach />

      {/* 8. Final Call to Action (Forest Green Background) */}
      <AboutCTA />
    </div>
  );
}
