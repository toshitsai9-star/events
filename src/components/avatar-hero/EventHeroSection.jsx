/* No blur, fade, or mask effects on the founder. Edge quality comes from the video matte. */
import React, { useState, useEffect } from 'react';
import { Settings, Volume2, Sparkles, MapPin } from 'lucide-react';
import { eventHeroConfig } from '../../config/eventHeroConfig';
import LipSyncAvatar from './LipSyncAvatar';
import DigitalHostAdminModal from '../digital-host/DigitalHostAdminModal';

/**
 * EventHeroSection Component
 * 
 * Reference-Matched Founder Introduction Hero:
 * - 1. Warm Ivory Canvas: Matches the founder video studio backdrop (#F5F1E8 / #FAF8F5).
 * - 2. Oversized Background Typography: "ADI REDDY" & "EVENTS AND FACILITATORS" (perfectly calibrated so "A" and "Y" never clip into "DI EDD").
 * - 3. Left Introduction Editorial Column:
 *      - Kicker: "ADI REDDY EVENTS • FOUNDER"
 *      - Headline: "Meet Our Founder"
 *      - Name: "Anil Reddy"
 *      - Supporting Copy: "Creating memorable experiences through creativity, planning and exceptional event execution."
 *      - Spoken Telugu Transcript: "హాయ్ అండి, నా పేరు అనిల్ — ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్."
 * - 4. Center Stage Presenter:
 *      - Anil Reddy standing prominently in the center, speaking authentic Telugu with natural mouth sync & gestures.
 *      - Soft feathered vignette integration (sunk seamlessly into the background like Image 3, zero black borders, zero white halos, zero cutouts).
 * - 5. Automatic Playback:
 *      - Automatically plays on website load.
 *      - Attempts audible autoplay; falls back to muted autoplay and unmutes on the visitor's first interaction anywhere on the website without restarting speech.
 *      - Zero separate sound buttons or tooltips over his face.
 */
export default function EventHeroSection({ config = eventHeroConfig }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Trigger subtle entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse move listener with requestAnimationFrame for smooth 60fps parallax
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const normX = (e.clientX / window.innerWidth) * 2 - 1;
          const normY = (e.clientY / window.innerHeight) * 2 - 1;
          setMousePos({ x: normX, y: normY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll listener for smooth transition into the next section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Normalized scroll progress through 100vh
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const progress = Math.min(1, Math.max(0, scrollY / (windowHeight || 800)));

  // Check for test parameter to skip gate in automated captures
  const isGateSkipped = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('nogate') === '1';

  return (
    <section
      className="event-hero-section relative w-full h-screen min-h-[720px] max-h-[1080px] overflow-hidden flex items-center justify-center select-none"
      style={{
        backgroundColor: '#F5F1E9',
        backgroundImage: `
          radial-gradient(ellipse at 50% 38%, #FAF7F0 0%, #F5F1E9 55%, #EFE8DC 85%, #E5DCCB 100%)
        `,
      }}
    >
      <h1 className="sr-only">ADI REDDY EVENTS &amp; FACILITATORS — Event Management in Hyderabad</h1>

      {/* Subtle Luxury Film Grain Veil */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(#111 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* 
        ============================================================
        TOP MINIMAL HEADER BAR (Matching Reference Aesthetic)
        ============================================================
      */}
      <header className="absolute top-0 inset-x-0 z-30 px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-3">
          <span className="font-serif font-bold text-lg sm:text-xl tracking-[0.16em] uppercase text-[#171717]">
            ADI REDDY
          </span>
          <span className="hidden sm:inline-block w-px h-3.5 bg-[#171717]/20" />
          <span className="hidden sm:inline-block font-sans text-[11px] font-medium tracking-[0.28em] uppercase text-[#171717]/60">
            EVENTS &amp; FACILITATORS
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#171717]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6B879] animate-pulse" />
            <span>HYDERABAD • GLOBAL</span>
          </div>
          <a
            href="#contact"
            className="text-xs font-sans font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-[#171717]/15 hover:border-[#171717] bg-white/40 hover:bg-[#171717] text-[#171717] hover:text-white transition-all duration-300 backdrop-blur-xs"
          >
            Inquiries
          </a>
        </div>
      </header>

      {/* 
        ============================================================
        GIANT BACKGROUND NAME TYPOGRAPHY (z-10)
        - Main text "ADI REDDY": single line spanning ~90-92% width on desktop/tablet, 2-line stack on mobile
        - High-contrast Didone/Bodoni-style display serif with thin hairlines and thick stems
        - Soft warm grey-taupe vertical gradient fill (#B3AA9E to #DBD4CA) via background-clip: text
        - Soft warm depth shadow
        - Vertical center sits at about 37% from top of hero (cap top ~27%, baseline ~48%)
        - Sub-line "EVENTS & FACILITATORS" directly below (vertical center ~52%), 0.6em letter spacing, ~55% width
        - Stacking: z-10 (behind founder at z-20)
        - aria-hidden="true", pointer-events: none, user-select: none
        ============================================================
      */}
      <div
        className="absolute inset-x-0 top-[37%] z-10 flex flex-col items-center justify-center w-full px-2 sm:px-4 pointer-events-none select-none will-change-transform"
        aria-hidden="true"
        style={{
          transform: `translate3d(${mousePos.x * -8}px, calc(-50% + ${mousePos.y * -4 + scrollY * 0.16}px), 0)`,
          opacity: Math.max(0, 1 - progress * 1.5),
          transition: 'transform 0.2s cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        {/* Desktop and Tablet (>= 640px): Single Line spanning ~90-92% width */}
        <span
          className="hidden sm:block font-serif font-black uppercase whitespace-nowrap leading-none select-none text-center"
          style={{
            fontFamily: '"DM Serif Display", Georgia, Didot, serif',
            fontSize: 'clamp(90px, 14.1vw, 280px)',
            letterSpacing: '-0.012em',
            background: 'linear-gradient(180deg, rgba(179, 170, 158, 0.92) 0%, rgba(200, 192, 181, 0.88) 50%, rgba(219, 212, 202, 0.85) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 20px 35px rgba(110, 85, 60, 0.07))',
            width: '91vw',
            maxWidth: '1680px',
            textAlign: 'center',
          }}
        >
          ADI REDDY
        </span>

        {/* Mobile (< 640px): Stacked into two lines ("ADI" then "REDDY") */}
        <div className="flex flex-col items-center sm:hidden leading-[0.88] select-none text-center">
          <span
            className="font-serif font-black uppercase"
            style={{
              fontFamily: '"DM Serif Display", Georgia, Didot, serif',
              fontSize: 'clamp(60px, 21vw, 95px)',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(180deg, rgba(179, 170, 158, 0.92) 0%, rgba(200, 192, 181, 0.88) 50%, rgba(219, 212, 202, 0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 15px 25px rgba(110, 85, 60, 0.07))',
            }}
          >
            ADI
          </span>
          <span
            className="font-serif font-black uppercase"
            style={{
              fontFamily: '"DM Serif Display", Georgia, Didot, serif',
              fontSize: 'clamp(60px, 21vw, 95px)',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(180deg, rgba(179, 170, 158, 0.92) 0%, rgba(200, 192, 181, 0.88) 50%, rgba(219, 212, 202, 0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 15px 25px rgba(110, 85, 60, 0.07))',
            }}
          >
            REDDY
          </span>
        </div>

        {/* Sub-line "EVENTS & FACILITATORS" directly below main text */}
        <span
          className="font-serif uppercase whitespace-nowrap select-none text-center"
          style={{
            fontFamily: '"DM Serif Display", Georgia, Didot, serif',
            fontSize: 'clamp(11px, 1.4vw, 24px)',
            letterSpacing: '0.6em',
            color: 'rgba(207, 199, 188, 0.82)',
            marginTop: 'clamp(8px, 1.4vw, 22px)',
            maxWidth: '92vw',
            width: 'auto',
          }}
        >
          EVENTS &amp; FACILITATORS
        </span>
      </div>





      {/* 
        ============================================================
        3. CENTER STAGE: AUTHENTIC TALKING FOUNDER AVATAR (z-20)
        ============================================================
        - Positioned prominently in the centre (waist-up presence)
        - Seamless feathered vignette into the warm ivory background (Image 3)
        - Zero white halo, zero black borders, zero cutouts
        - Authentic Telugu lip sync & original AAC voice track
        - Automatic playback on site load (audible first, muted fallback, global unmute on first visitor tap)
      */}
      <LipSyncAvatar
        videoSource="/founder-intro-video.mp4"
        founderName="Anil Reddy"
        entryGateEnabled={isGateSkipped ? false : (config?.entryGate?.enabled ?? true)}
        mousePos={mousePos}
        scrollY={scrollY}
        isLoaded={isLoaded}
        progress={progress}
      />

      {/* Discrete Administrator Studio Trigger (Gear Icon in bottom right) */}
      <div className="absolute bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsAdminModalOpen(true)}
          className="group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/70 hover:bg-[#171717] text-[#171717]/60 hover:text-white border border-[#171717]/10 hover:border-[#D6B879] shadow-xs hover:shadow-md transition-all duration-300 text-xs font-semibold backdrop-blur-xs"
          title="Open AI Avatar Studio"
        >
          <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-[10px] uppercase font-mono tracking-wider">Studio</span>
        </button>
      </div>

      {/* Admin Studio Modal */}
      <DigitalHostAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </section>
  );
}
