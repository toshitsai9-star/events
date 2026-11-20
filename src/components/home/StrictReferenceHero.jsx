import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, ArrowUpRight, MessageCircle, Phone, Play, Pause, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Rebuilt Founder Hero & Introduction Component
 * Strict Recreation of Reference Experience (Lohitha Damisetti portfolio):
 * - Full viewport height (100vh) editorial composition.
 * - Oversized background typography ("ADI REDDY" & "EVENTS AND FACILITATORS").
 * - Prominent central founder (occupying ~50-55% of viewport height).
 * - ZERO arch-shaped cards, ZERO borders, ZERO boxes, ZERO play buttons on face/body.
 * - Small elegant sound toggle in the corner.
 * - Bottom-left introduction text with exact spoken Telugu dialogue.
 * - Right-side actions: "Explore work ->", "Let's talk", and WhatsApp.
 * - Smooth scroll transition into "01 ABOUT • FOUNDER PROFILE" with floating 3D Founder ID card.
 */
export default function StrictReferenceHero({ progress = 0 }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay video on mount (muted initially per browser policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay error:', err);
      });
    }
  }, []);

  // Timeupdate handler: Skips the 1.15s-2.75s plaque cutaway so video continuously shows Anil Reddy speaking!
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      if (cur >= 1.15 && cur < 2.75) {
        videoRef.current.currentTime = 2.75;
      }
    }
  };

  // Toggle sound with user gesture
  const toggleSound = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0; // Restart from 0 to hear Telugu greeting clearly
      videoRef.current.play();
      setIsMuted(false);
      setIsPlaying(true);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    const el = document.getElementById('founder-about-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-charcoal">
      
      {/* =========================================================================
          HERO SECTION: FULL-VIEWPORT EDITORIAL PORTFOLIO HERO
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[720px] max-h-[1080px] overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-8 px-6 sm:px-10 lg:px-16 bg-[#FAF8F5]">
        
        {/* 
          1. OVERSIZED BACKGROUND TYPOGRAPHY (Sitting Behind the Founder)
          Two-line luxury branding: "ADI REDDY" + "EVENTS AND FACILITATORS"
        */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          style={{
            transform: `translate3d(0, ${progress * 50}px, 0)`,
          }}
        >
          <span className="font-serif font-black text-[15vw] lg:text-[17vw] text-gold/15 tracking-[0.16em] uppercase whitespace-nowrap leading-none">
            ADI REDDY
          </span>
          <span className="font-sans font-medium text-[2.6vw] lg:text-[2.2vw] text-charcoal/15 tracking-[0.45em] uppercase whitespace-nowrap -mt-2 sm:-mt-4">
            EVENTS AND FACILITATORS
          </span>
        </div>

        {/* Ambient Brand Lighting (Warm Ivory, Champagne Gold, Burgundy Glow) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF8F5]/40 to-[#FAF8F5] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-radial from-gold/15 via-gold/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

        {/* 
          2. TOP-RIGHT CORNER SOUND TOGGLE (Rule 7: Clean Sound Toggle in Corner)
          Zero buttons covering the founder's face!
        */}
        <div className="absolute top-6 right-6 sm:right-12 z-30">
          <button
            type="button"
            onClick={toggleSound}
            className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-sans font-medium tracking-wider uppercase transition-all duration-300 shadow-card ${
              isMuted
                ? 'bg-forest text-gold-light border border-gold/40 hover:border-gold hover:scale-105'
                : 'bg-crimson text-white border border-crimson animate-pulse'
            }`}
            aria-label={isMuted ? "Unmute Anil Reddy's voice" : "Mute voice"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gold" />
                <span className="hidden sm:inline">Tap to Hear Voice</span>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-0.5">
                  <span className="w-1 h-2.5 bg-white animate-pulse" />
                  <span className="w-1 h-3.5 bg-white animate-pulse delay-100" />
                  <span className="w-1 h-2 bg-white animate-pulse delay-200" />
                </div>
                <span>Anil Reddy Speaking</span>
              </>
            )}
          </button>
        </div>

        {/* 
          3. MAIN HERO COMPOSITION (Three-Column Balanced Staging)
          - Left-Bottom: Introduction Text & Spoken Quote
          - Center: Founder Standing Prominently (48-55% Viewport Height)
          - Right: Actions ("Explore work ->", "Let's talk", WhatsApp)
        */}
        <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* LEFT-BOTTOM: Introduction Text (Matching Reference Composition) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 order-2 lg:order-1">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-ivory border border-gold/40 shadow-subtle">
              <Sparkles className="w-3 h-3 text-gold flex-shrink-0" />
              <span className="text-[10px] uppercase tracking-[0.24em] text-charcoal font-sans font-semibold">
                ADI REDDY EVENTS
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-semibold block mb-0.5">
                Founder & Managing Director
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal leading-[1.08] tracking-tight">
                Anil Reddy.
              </h1>
            </div>

            {/* Exact Spoken Introduction from Source Video */}
            <div className="pt-1 pb-1">
              <p className="font-sans text-sm sm:text-base text-charcoal font-medium italic leading-relaxed">
                "హాయ్ అండి, నా పేరు అనిల్ — ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్"
              </p>
              <p className="font-sans text-xs text-charcoal/65 mt-0.5 font-light">
                (Hi, I am Anil — Founder of Adi Reddy Events & Facilitators)
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light max-w-sm">
              Architecting luxury weddings, royal receptions, keynote corporate summits, and sovereign celebrations across Andhra Pradesh & Telangana.
            </p>

          </div>

          {/* 
            CENTER: FOUNDER STANDING PROMINENTLY (48-55% Viewport Height)
            NO ARCH! NO BORDER! NO CONTAINER BOX! NO BUTTON OVER FACE!
            Clean, proportional figure standing freely on the page.
          */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            
            <div 
              onClick={toggleSound}
              className="relative cursor-pointer flex flex-col items-center w-full max-w-sm sm:max-w-md group"
            >
              {/* Founder Video Presentation: 48-55vh Proportion, Seamless Depth */}
              <div 
                className="relative w-full h-[46vh] sm:h-[52vh] max-h-[520px] overflow-hidden flex items-end justify-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                }}
              >
                <video
                  ref={videoRef}
                  src="/videos/adi-reddy-founder-intro.mp4"
                  playsInline
                  loop
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04]"
                />
              </div>

              {/* Discreet Sound Invitation Label Beneath (NOT on face) */}
              {isMuted && (
                <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium mt-2 transition-colors group-hover:text-crimson">
                  Click Founder to Unmute Voice
                </span>
              )}
            </div>

          </div>

          {/* RIGHT: Actions (Matching Reference "Explore work ->" & "Let's talk") */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-4 order-3">
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.24em] text-gold font-sans font-medium block">
                Direct Commission
              </span>
              <p className="font-serif text-lg sm:text-xl text-charcoal">
                Start Your Celebration
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full max-w-xs">
              {/* Primary Action Button (Matching Pill Shape from Reference) */}
              <Link
                to="/gallery-contact"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-forest hover:bg-black text-ivory text-xs uppercase font-sans tracking-[0.18em] shadow-card transition-all duration-300 hover:scale-105 group"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Action: "Let's talk" (Matching Reference Style) */}
              <Link
                to="/gallery-contact"
                className="text-xs uppercase font-sans tracking-[0.18em] font-medium text-charcoal hover:text-crimson transition-colors py-1"
              >
                Let's Talk &rarr;
              </Link>

              {/* Direct WhatsApp Callout */}
              <a
                href="https://wa.me/919704917990?text=Hello%20Anil%20Reddy%20sir,%20I%20saw%20your%20introduction%20on%20the%20website%20and%20would%20like%20to%20discuss%20an%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-ivory hover:bg-beige text-charcoal border border-gold/40 text-[11px] font-sans uppercase tracking-wider transition-colors shadow-subtle"
              >
                <MessageCircle className="w-3.5 h-3.5 text-crimson" />
                <span>WhatsApp: 970 4917 990</span>
              </a>
            </div>

          </div>

        </div>

        {/* 
          4. BOTTOM SCROLL CONNECTOR (Smooth Transition to 01 ABOUT)
        */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2">
          <a
            href="#founder-about-section"
            onClick={scrollToAbout}
            className="group flex flex-col items-center focus:outline-none cursor-pointer"
            aria-label="Scroll to Section 01 About"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-charcoal/70 font-sans font-medium mb-1.5 transition-colors group-hover:text-gold">
              01 ABOUT • FOUNDER PROFILE
            </span>
            <div className="w-6 h-10 rounded-full border border-gold/50 bg-ivory/80 flex flex-col items-center justify-between p-1 shadow-subtle group-hover:border-gold transition-colors">
              <div className="w-1.5 h-2.5 rounded-full bg-gold animate-connector" />
              <ChevronDown className="w-3 h-3 text-gold/80" />
            </div>
          </a>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: 01 ABOUT • FOUNDER PROFILE (Matching Reference Experience)
          ========================================================================= */}
      <section id="founder-about-section" className="py-24 md:py-32 bg-[#F5F1E9] border-t border-b border-gold/25 relative scroll-mt-12">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: 01 ABOUT Label + Heading + Narrative */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                  01 //
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-charcoal/70 font-sans font-semibold">
                  ABOUT • FOUNDER PROFILE
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] tracking-tight">
                Hi, I'm Anil Reddy.
              </h2>

              <div className="space-y-4 font-sans text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
                <p>
                  At <strong>Adi Reddy Events & Facilitators</strong>, our devotion is creating extraordinary occasions that leave an everlasting impression. Whether it is an opulent wedding mandap, a high-octane live concert, an executive corporate summit, or an intimate milestone jubilee, we bring creative direction, architectural precision, and disciplined logistics together.
                </p>
                <p>
                  From first concept sketches to the final guest farewell, our atelier oversees every detail so you can celebrate with absolute peace of mind.
                </p>
              </div>

              {/* Action Buttons (Matching Resume / Social Links in Reference) */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/gallery-contact"
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-forest text-ivory text-xs uppercase font-sans tracking-wider hover:bg-black transition-colors shadow-subtle"
                >
                  <span>Plan Event</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
                </Link>

                <a
                  href="https://wa.me/919704917990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-ivory border border-gold/40 text-charcoal text-xs uppercase font-sans tracking-wider hover:border-gold hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-crimson" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="tel:+919704917990"
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-ivory border border-gold/40 text-charcoal text-xs uppercase font-sans tracking-wider hover:border-gold hover:text-gold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Call 970 4917 990</span>
                </a>
              </div>

            </div>

            {/* Right Column: 3D FLOATING "FOUNDER ID" CARD + BASIC FACTS */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
              
              {/* THE FLOATING FOUNDER ID CARD (Exact Match of Developer ID from Reference) */}
              <div className="sm:col-span-7 relative group">
                
                <div className="bg-ivory border-2 border-gold/50 shadow-card p-6 rounded-2xl relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-floating">
                  
                  {/* Top Header with Lanyard Slot & Pill Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-gold/20">
                    <div className="w-8 h-2 rounded-full bg-charcoal/15 mx-auto absolute top-2.5 left-1/2 -translate-x-1/2" />
                    
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-forest text-[9px] uppercase tracking-wider text-gold-light font-sans font-semibold mt-1">
                      <Sparkles className="w-2.5 h-2.5 text-gold" />
                      <span>FOUNDER ID</span>
                    </div>

                    <span className="font-mono text-[10px] text-gold font-bold">
                      ARE-2026
                    </span>
                  </div>

                  {/* Founder Photo */}
                  <div className="mt-4 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-gold/40 shadow-inner bg-beige/30 p-1">
                      <img
                        src="/anil-reddy-founder.jpg"
                        alt="Anil Reddy - Founder of Adi Reddy Events and Facilitators"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <h3 className="font-serif text-lg text-charcoal font-semibold mt-3 tracking-tight">
                      ANIL REDDY
                    </h3>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">
                      Founder & Managing Director
                    </p>
                    <p className="font-sans text-[9px] text-charcoal/60 uppercase tracking-wider mt-0.5">
                      Adi Reddy Events & Facilitators
                    </p>
                  </div>

                  {/* ID Metadata Grid */}
                  <div className="mt-4 pt-3 border-t border-gold/15 grid grid-cols-2 gap-2 text-[10px] font-sans">
                    <div>
                      <span className="text-charcoal/50 uppercase block tracking-wider text-[8px]">ID Pass</span>
                      <span className="font-mono font-semibold text-charcoal">ARE-0001</span>
                    </div>
                    <div>
                      <span className="text-charcoal/50 uppercase block tracking-wider text-[8px]">Valid Period</span>
                      <span className="font-mono font-semibold text-charcoal">PERPETUAL</span>
                    </div>
                  </div>

                  {/* Golden Barcode & Hologram Seal */}
                  <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between">
                    <div className="flex items-center space-x-0.5 h-6">
                      <div className="w-0.5 h-full bg-charcoal/70" />
                      <div className="w-1 h-full bg-charcoal/70" />
                      <div className="w-0.5 h-full bg-charcoal/70" />
                      <div className="w-1.5 h-full bg-charcoal/70" />
                      <div className="w-0.5 h-full bg-charcoal/70" />
                      <div className="w-1 h-full bg-charcoal/70" />
                      <div className="w-2 h-full bg-charcoal/70" />
                      <div className="w-0.5 h-full bg-charcoal/70" />
                      <div className="w-1 h-full bg-charcoal/70" />
                    </div>

                    <div className="text-[9px] font-mono text-gold font-bold tracking-widest uppercase">
                      VERIFIED DIRECTOR
                    </div>
                  </div>

                </div>

              </div>

              {/* BASIC FACTS COLUMN (Matching Reference Video) */}
              <div className="sm:col-span-5 space-y-4 pt-2">
                
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold block mb-2">
                    BASIC FACTS
                  </span>
                  
                  <div className="space-y-3 font-sans text-xs">
                    <div>
                      <span className="text-charcoal/50 block text-[10px] uppercase">Headquarters</span>
                      <span className="font-medium text-charcoal">Hyderabad, India</span>
                    </div>

                    <div>
                      <span className="text-charcoal/50 block text-[10px] uppercase">Operational Scope</span>
                      <span className="font-medium text-charcoal">AP & Telangana • Pan-India</span>
                    </div>

                    <div>
                      <span className="text-charcoal/50 block text-[10px] uppercase">Specialization</span>
                      <span className="font-medium text-charcoal">Turnkey Event Production</span>
                    </div>

                    <div>
                      <span className="text-charcoal/50 block text-[10px] uppercase">Direct Helpline</span>
                      <span className="font-mono font-medium text-crimson">+91 970 4917 990</span>
                    </div>
                  </div>
                </div>

                {/* Italic Quote (Matching Reference Quote) */}
                <div className="pt-3 border-t border-gold/20">
                  <p className="font-serif italic text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    "From first conversation to final celebration."
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
