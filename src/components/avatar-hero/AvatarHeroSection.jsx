import React, { useState, useEffect, useRef } from 'react';
import { avatarHeroConfig } from '../../config/avatarHeroConfig';
import { useLanyardScrollTimeline } from '../../animations/useLanyardScrollTimeline';
import HeroAvatar from './HeroAvatar';
import LanyardBadge from './LanyardBadge';
import { ArrowUpRight } from 'lucide-react';

/**
 * AvatarHeroSection Component
 * 
 * Orchestrates the full-screen editorial founder hero experience:
 * - 100vh container pinned for 200% scroll distance via GSAP ScrollTrigger.
 * - Minimal, editorial cream background (#F2F0E6) with subtle radial light and fine noise grain.
 * - Translucent top navigation bar with backdrop blur and underline hover effect.
 * - Giant ghost text behind avatar with subtle mouse parallax.
 * - Bold editorial headline at bottom-left with indigo period accent.
 * - Right-side info list (BASED IN, OPERATIONS, AVAILABLE) and "Let's talk" pill button with dark dot.
 * - Talking avatar on the left third with transparent video support, sound toggle, and synced captions.
 * - Hanging lanyard strap and 3D swaying ID badge sliding in on scroll.
 * - Custom smooth lag indigo cursor.
 */
export default function AvatarHeroSection({ config = avatarHeroConfig }) {
  // DOM References for GSAP ScrollTrigger Timeline
  const containerRef = useRef(null);
  const heroScreenRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const headlineRef = useRef(null);
  const ghostTextRef = useRef(null);
  const lanyardRef = useRef(null);
  const badgeRef = useRef(null);
  const rightInfoRef = useRef(null);

  // Mouse Parallax & Custom Cursor State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Media Controls State
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [activeCaption, setActiveCaption] = useState(
    config.captions?.[0]?.text || ''
  );

  // Initialize GSAP ScrollTrigger Pinning Timeline
  useLanyardScrollTimeline({
    containerRef,
    avatarRef: avatarWrapperRef,
    headlineRef,
    ghostTextRef,
    lanyardRef,
    badgeRef,
    rightInfoRef,
  });

  // Mouse Move Listener for Parallax & Custom Cursor
  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let cursorAnimId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Normalized coordinates (-1 to 1) for subtle parallax
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: normX, y: normY });
    };

    // Smooth cursor interpolation (lerp)
    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setCursorPos({ x: currentX, y: currentY });
      cursorAnimId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    cursorAnimId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(cursorAnimId);
    };
  }, []);

  // Synchronized caption cycling (timer fallback when video audio plays or loops)
  useEffect(() => {
    if (!config.captions || config.captions.length === 0) return;
    
    let captionIndex = 0;
    const interval = setInterval(() => {
      captionIndex = (captionIndex + 1) % config.captions.length;
      setActiveCaption(config.captions[captionIndex].text);
    }, 3200);

    return () => clearInterval(interval);
  }, [config.captions]);

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleToggleCaptions = () => {
    setShowCaptions((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#F2F0E6] text-[#111111] overflow-hidden select-none font-sans"
      style={{
        // Subtle radial gradient light centered slightly high
        backgroundImage: `
          radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.9) 0%, rgba(242, 240, 230, 0.95) 60%, #EAE6D8 100%)
        `,
      }}
    >
      {/* 
        Custom Indigo Cursor (follows mouse smoothly with slight lag on desktop)
      */}
      {!isTouchDevice && (
        <div
          className="fixed pointer-events-none z-50 w-6 h-6 rounded-full bg-[#3B2F8F]/25 border border-[#3B2F8F]/60 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 will-change-transform mix-blend-multiply backdrop-blur-[0.5px]"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          }}
        >
          {/* Central pinpoint */}
          <div className="w-1.5 h-1.5 bg-[#3B2F8F] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}

      {/* Subtle Noise Texture Veil */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* 
        ============================================================
        HERO PINNED SCREEN (100vh)
        ============================================================
      */}
      <div
        ref={heroScreenRef}
        className="relative w-full h-screen min-h-[640px] max-h-[1200px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden"
      >
        {/* 
          1. TRANSLUCENT TOP NAVBAR
          Translucent with backdrop blur and animated underline hover
        */}
        <header className="relative z-30 w-full flex items-center justify-between pb-4 border-b border-black/5">
          {/* Brand Logo / Monogram */}
          <a
            href="/"
            className="group flex items-center space-x-3 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#111111] text-[#F2F0E6] flex items-center justify-center font-bold text-xs tracking-wider shadow-sm group-hover:bg-[#3B2F8F] transition-colors duration-300">
              {config.brand.initials}
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#111111] leading-none">
                {config.brand.name}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-black/50 font-semibold mt-1">
                {config.brand.tagline}
              </span>
            </div>
          </a>

          {/* Nav Links with Underline Hover */}
          <nav className="hidden md:flex items-center space-x-8 px-6 py-2 rounded-full bg-white/40 backdrop-blur-md border border-black/5 shadow-subtle">
            {config.navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="relative text-xs font-semibold tracking-wider text-black/70 hover:text-[#111111] uppercase transition-colors group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#3B2F8F] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Quick Direct CTA on Navbar */}
          <a
            href={config.cta.href}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#111111] text-[#F2F0E6] text-xs font-semibold tracking-wide hover:bg-[#3B2F8F] hover:shadow-md transition-all duration-300 group"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </header>

        {/* 
          2. GIANT GHOST TEXT (Behind Avatar, 6–8% Opacity)
          Huge geometric typography cropped by viewport edges with subtle mouse parallax
        */}
        <div
          ref={ghostTextRef}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          style={{
            transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -8}px, 0)`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          <span className="text-[18vw] font-black tracking-tighter uppercase text-[#111111] opacity-[0.06] whitespace-nowrap leading-none">
            {config.ghostText}
          </span>
        </div>

        {/* 
          3. MAIN HERO STAGE
          Grid layout hosting:
          - Left Third: Full-body Talking Avatar
          - Bottom-Left: Bold Editorial Headline
          - Right Side: Info rows + "Let's talk" pill button
          - Center/Foreground: Lanyard Strap + ID Badge
        */}
        <div className="relative z-10 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 items-end pt-4 pb-2">
          
          {/* LEFT COLUMN: Talking Avatar & Bottom Headline */}
          <div className="lg:col-span-8 relative flex flex-col justify-end h-full">
            
            {/* Talking Avatar Component (Left Third, 85-95vh tall) */}
            <div
              ref={avatarWrapperRef}
              className="absolute left-0 bottom-0 z-10 will-change-transform"
            >
              <HeroAvatar
                config={config}
                mousePos={mousePos}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                showCaptions={showCaptions}
                onToggleCaptions={handleToggleCaptions}
                activeCaption={activeCaption}
              />
            </div>

            {/* 
              Bottom-Left Bold Headline (partly overlapped by avatar)
              Inter Tight / Manrope bold styling with indigo accent period
            */}
            <div
              ref={headlineRef}
              className="relative z-0 pl-4 sm:pl-8 lg:pl-48 xl:pl-64 pb-4 sm:pb-8 will-change-transform max-w-2xl"
            >
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#3B2F8F] uppercase font-bold block mb-2">
                Executive Leadership
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111] leading-[0.95]">
                {config.headline.line1}
                <br />
                <span className="italic font-serif font-normal text-black/85 mr-1">
                  {config.headline.line2.replace('.', '')}
                </span>
                {config.headline.accentDot && (
                  <span className="text-[#3B2F8F] not-italic font-sans text-5xl sm:text-7xl">.</span>
                )}
              </h1>
            </div>

          </div>

          {/* RIGHT COLUMN: Info Rows & "Let's talk" Pill Button */}
          <div
            ref={rightInfoRef}
            className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-6 sm:space-y-8 pb-4 sm:pb-8 relative z-20 will-change-transform"
          >
            {/* Info List with Tiny Uppercase Labels */}
            <div className="space-y-3.5 text-left lg:text-right">
              {config.infoRows.map((info, idx) => (
                <div key={idx} className="group">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-black/50 block font-bold">
                    {info.label}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#111111] tracking-wide mt-0.5">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>

            {/* "Let's talk" Pill Button with Dark Dot */}
            <div className="pt-2">
              <a
                href={config.cta.href}
                className="group relative inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white text-[#111111] border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-[#111111] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {/* Dark active dot that turns white on hover */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#111111] group-hover:bg-[#3B2F8F] group-hover:scale-125 transition-all duration-300 animate-pulse" />
                
                <span className="font-sans font-bold text-xs uppercase tracking-wider">
                  {config.cta.label}
                </span>

                <ArrowUpRight className="w-4 h-4 text-black/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

          </div>

        </div>

        {/* 
          4. LANYARD STRAP & 3D SWAYING ID BADGE
          Positioned centrally; animated into frame via GSAP ScrollTrigger
        */}
        <div className="absolute inset-x-0 top-1/4 sm:top-1/5 z-40 flex items-center justify-center pointer-events-none">
          <LanyardBadge
            config={config}
            lanyardRef={lanyardRef}
            badgeRef={badgeRef}
            mousePos={mousePos}
          />
        </div>

        {/* Scroll Progress Indicator Hint at bottom edge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-40">
          <span className="text-[9px] font-mono tracking-widest uppercase text-black/60 mb-1">
            Scroll to inspect credential
          </span>
          <div className="w-4 h-6 rounded-full border border-black/30 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-black/60 rounded-full animate-bounce" />
          </div>
        </div>

      </div>

    </div>
  );
}

