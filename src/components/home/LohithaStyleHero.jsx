import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, ArrowRight, MessageCircle, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * LohithaStyleHero Component
 * Faithfully designed after the Lohitha Damisetti reference layout:
 * - Giant editorial background typography ("ADI REDDY" spanning behind the presenter).
 * - Center Stage: Anil Reddy standing tall and proud, introducing himself.
 * - Left Column: Name, title ("Founder & Event Director"), credentials & audio toggle pill.
 * - Right Column: "Explore Our Work ->", "Plan Your Event", and direct founder WhatsApp.
 * - Seamless video playback: automatically skips the plaque cut to show ONLY Anil Reddy speaking!
 * - Smooth scroll bridge into Section 01 (About / Our Story).
 */
export default function LohithaStyleHero({ progress = 0 }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay on mount (muted per browser policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay error:', err);
      });
    }
  }, []);

  // Timeupdate handler: Skips the 1.1s-2.7s cut so the video ONLY shows Anil Reddy speaking!
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      // Skip the board cut so it only shows Anil Reddy's face talking
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
      videoRef.current.currentTime = 0; // Restart from 0 to hear full Telugu greeting
      videoRef.current.play();
      setIsMuted(false);
      setIsPlaying(true);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Play / Pause
  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Replay
  const handleReplay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const scrollToNext = (e) => {
    e.preventDefault();
    const el = document.getElementById('intro-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen h-screen bg-[#F7F4EE] text-charcoal overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-6 px-4 sm:px-8 lg:px-14">
      
      {/* 
        1. GIANT BACKGROUND TYPOGRAPHY (Matching "LOHITHA" in Reference Video)
        Spans massively across the entire hero width behind the center presenter.
      */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        style={{
          transform: `translate3d(0, ${progress * 50}px, 0)`,
        }}
      >
        <span className="font-serif font-black text-[15vw] lg:text-[16vw] text-charcoal/[0.045] tracking-[0.16em] uppercase whitespace-nowrap leading-none">
          ADI REDDY
        </span>
      </div>

      {/* Subtle Royal Atmospheric Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F4EE]/60 to-[#F7F4EE] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* 
        2. THREE-COLUMN HERO LAYOUT (Matching Reference Video)
        - Left: Presenter Credentials & Audio Toggle
        - Center: Anil Reddy Standing Tall
        - Right: Explore Work & Contact CTAs
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
        
        {/* LEFT COLUMN: Credentials & Sound Trigger */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 order-2 lg:order-1">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-ivory border border-gold/40 shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-charcoal font-sans font-medium">
              Founder & Managing Director
            </span>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal leading-[1.1] tracking-tight">
              Anil Reddy
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gold-dark font-medium tracking-wider uppercase mt-1">
              Adi Reddy Events & Facilitators
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light max-w-sm">
            Curating sovereign weddings, high-impact summits, and cultural celebrations across Andhra Pradesh & Telangana.
          </p>

          {/* Floating Sound Toggle Pill (Directly Inspired by Reference Audio Pill) */}
          <div className="pt-1 flex flex-col items-center lg:items-start space-y-2">
            <button
              type="button"
              onClick={toggleSound}
              className={`inline-flex items-center space-x-2 px-4 py-2 text-xs uppercase font-sans tracking-[0.16em] transition-all duration-300 shadow-card hover:scale-105 ${
                isMuted
                  ? 'bg-forest text-gold-light border border-gold hover:border-gold hover:bg-forest-light'
                  : 'bg-crimson text-white border border-crimson'
              }`}
              aria-label={isMuted ? 'Turn on Anil Reddy voice' : 'Mute voice'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-gold" />
                  <span>Tap to Hear Anil Reddy's Voice</span>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-0.5">
                    <span className="w-1 h-3 bg-white animate-pulse" />
                    <span className="w-1 h-4 bg-white animate-pulse delay-100" />
                    <span className="w-1 h-2.5 bg-white animate-pulse delay-200" />
                  </div>
                  <span className="font-medium">Voice Active • Speaking</span>
                </>
              )}
            </button>

            <span className="text-[10px] font-sans text-charcoal/50 italic">
              Telugu Greeting • "హాయ్ అండి, నా పేరు అనిల్..."
            </span>
          </div>

        </div>

        {/* CENTER COLUMN: Anil Reddy Standing Tall (Matching Lohitha's Presenter Stage) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
          
          <div 
            onClick={toggleSound}
            className="relative cursor-pointer group flex flex-col items-center"
          >
            {/* Elegant Arched Presentation Frame */}
            <div className="relative w-64 sm:w-72 md:w-80 h-[320px] sm:h-[380px] md:h-[420px] rounded-t-full rounded-b-2xl overflow-hidden border-2 border-gold/60 shadow-floating bg-forest/90">
              
              <video
                ref={videoRef}
                src="/anil-reddy-intro.mp4"
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Feathered Bottom Veil */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-forest via-forest/60 to-transparent pointer-events-none" />

              {/* Click to Listen Pulsing Badge */}
              {isMuted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest/30 backdrop-blur-[1px] group-hover:bg-forest/15 transition-all">
                  <div className="w-14 h-14 rounded-full bg-crimson/95 border-2 border-gold flex items-center justify-center text-white shadow-floating transition-transform duration-300 group-hover:scale-110 mb-2">
                    <Volume2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="px-3 py-1 bg-forest/90 border border-gold/50 text-[10px] font-sans text-ivory tracking-wide shadow-md">
                    Click to Listen
                  </span>
                </div>
              )}

              {/* Discreet Controls on Video */}
              <div className="absolute bottom-2 right-2 flex items-center space-x-1 z-10">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 bg-forest/80 text-ivory/80 hover:text-gold border border-gold/30 text-xs"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={handleReplay}
                  className="p-1 bg-forest/80 text-ivory/80 hover:text-gold border border-gold/30 text-xs"
                  aria-label="Replay"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

            </div>

            {/* Subtitle Caption Banner */}
            <div className="mt-2.5 px-4 py-2 bg-ivory border border-gold/40 shadow-subtle text-center max-w-xs">
              <p className="font-sans text-xs text-charcoal font-medium leading-snug italic">
                "హాయ్ అండి, నా పేరు అనిల్ — ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్"
              </p>
              <p className="font-sans text-[10px] text-charcoal/60 mt-0.5">
                (Hi, I am Anil — Founder of Adi Reddy Events & Facilitators)
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Action CTAs (Matching Reference "Explore Work" & "Let's Talk") */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-4 order-3">
          
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold font-sans font-medium block">
              Direct Contact
            </span>
            <p className="font-serif text-lg sm:text-xl text-charcoal">
              Start Your Celebration
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full max-w-xs">
            {/* Primary Action Button */}
            <Link
              to="/gallery-contact"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-crimson hover:bg-crimson-hover text-white text-xs uppercase font-sans tracking-[0.18em] shadow-card transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Action Button */}
            <Link
              to="/services"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-ivory hover:bg-beige text-charcoal border border-gold/50 text-xs uppercase font-sans tracking-[0.18em] shadow-subtle transition-all duration-300 hover:border-gold hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Explore Services</span>
            </Link>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/919704917990?text=Hello%20Anil%20Reddy%20sir,%20I%20saw%20your%20introduction%20video%20on%20the%20website%20and%20would%20like%20to%20discuss%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#06110C] hover:bg-forest-light text-gold-light border border-gold/40 text-[11px] font-sans uppercase tracking-wider transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold" />
              <span>WhatsApp: 970 4917 990</span>
            </a>
          </div>

        </div>

      </div>

      {/* 
        3. BOTTOM SCROLL CONNECTOR (Matching "01 ABOUT" Transition in Reference Video)
      */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-2">
        <a
          href="#intro-section"
          onClick={scrollToNext}
          className="group flex flex-col items-center focus:outline-none cursor-pointer"
          aria-label="Scroll to explore our story"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-charcoal/70 font-sans font-medium mb-1.5 transition-colors group-hover:text-gold">
            01 About • Explore Atelier
          </span>
          <div className="w-6 h-10 rounded-full border border-gold/50 bg-ivory/80 flex flex-col items-center justify-between p-1 shadow-subtle group-hover:border-gold transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-gold animate-connector" />
            <ChevronDown className="w-3 h-3 text-gold/80" />
          </div>
        </a>
      </div>

    </section>
  );
}

