import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import entryGateBg from '../../assets/entry-gate-bg.jpg';

/**
 * EntryGate Component (Layered Strategy Step 5)
 * 
 * Minimal, luxury "welcome" overlay in the site's warm cream/serif editorial style.
 * - Skipped if sound plays automatically on load (Step 1).
 * - Skipped if previously entered in this browsing session.
 * - Clicking "Enter Experience" serves as the browser user gesture:
 *   Unlocks unmuted loud audio from frame 0.00s and fades the gate out over ~600ms.
 * - "Enter without sound" text link allows silent browsing.
 */
export default function EntryGate({
  onEnterWithSound,
  onEnterWithoutSound,
  onDismiss,
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterSound = () => {
    setIsExiting(true);
    if (onEnterWithSound) onEnterWithSound();
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 600);
  };

  const handleEnterMuted = () => {
    setIsExiting(true);
    if (onEnterWithoutSound) onEnterWithoutSound();
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 select-none overflow-hidden transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        backgroundColor: '#FAF7F2',
      }}
    >
      {/* 
        Full-Bleed Luxury Wedding Entrance Background Image
        Directly imported and bundled by Vite for 100% reliable rendering
      */}
      <img
        src={entryGateBg}
        alt="Adi Reddy Events Luxury Entrance"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
        loading="eager"
        fetchPriority="high"
      />

      {/* Subtle luxury ambient depth veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25 pointer-events-none z-1" />

      {/* Center Welcome Container - Perfectly framing the golden background artwork */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full px-4 pt-12 sm:pt-16 pb-8">
        
        {/* Accessible SEO Headings (mirrors the golden artwork embedded in the background) */}
        <h1 className="sr-only">
          ADI REDDY EVENTS AND FACILITATORS - Hyderabad
        </h1>

        {/* Top Minimal Pill */}
        <div className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/70 border border-[#D6B879]/40 mb-auto shadow-xs backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B879] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.24em] uppercase text-[#171717]">
            ADI REDDY EVENTS • HYDERABAD
          </span>
        </div>

        {/* Lower Interactive Controls Suite - Sits elegantly along the luminous event aisle */}
        <div className="mt-[28vh] sm:mt-[32vh] flex flex-col items-center max-w-md mx-auto">
          {/* Subtle Presentation Note */}
          <p className="font-serif italic text-sm sm:text-base text-[#1A1612] font-medium leading-relaxed mb-6 px-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Experience our founder’s personal introduction and vision for extraordinary celebrations.
          </p>

          {/* Primary Action: Enter Experience (Sound Gesture) */}
          <button
            type="button"
            onClick={handleEnterSound}
            className="group relative flex items-center justify-center space-x-3 px-8 sm:px-10 py-4 rounded-full bg-[#171717] hover:bg-[#222222] text-white shadow-2xl border border-[#D6B879]/70 hover:border-[#D6B879] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            {/* Animated sound wave bars icon */}
            <div className="flex items-center space-x-0.5">
              <span className="w-0.5 h-3 bg-[#D6B879] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4.5 bg-[#D6B879] rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
              <span className="w-0.5 h-2.5 bg-[#D6B879] rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
            </div>

            <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.2em] uppercase text-white">
              Enter Experience
            </span>
            <ArrowRight className="w-4 h-4 text-[#D6B879] group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Secondary Action: Unobtrusive 'Enter without sound' */}
          <button
            type="button"
            onClick={handleEnterMuted}
            className="mt-4 px-4 py-1.5 rounded-full bg-white/40 hover:bg-white/70 text-[11px] sm:text-xs font-sans font-medium tracking-wider uppercase text-[#171717]/80 hover:text-[#171717] transition-all duration-200 cursor-pointer backdrop-blur-xs border border-white/40"
          >
            Enter without sound
          </button>
        </div>

      </div>

      {/* Bottom Minimal Footer Note */}
      <div className="absolute bottom-5 inset-x-0 text-center">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#171717]/60 drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
          Curated by Anil Reddy • Founder
        </span>
      </div>
    </div>
  );
}
