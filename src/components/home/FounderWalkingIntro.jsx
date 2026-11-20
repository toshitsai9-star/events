import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, MessageCircle, Phone, X, Sparkles, UserCheck } from 'lucide-react';

/**
 * FounderWalkingIntro Component
 * Renders in the center of the landing page:
 * - Animated walking entrance down the central aisle towards the viewer.
 * - Displays Adi Reddy's real face and video.
 * - Plays his authentic voice from the uploaded video.
 * - Interactive audio unmute, playback controls, founder nameplate, and direct contact.
 */
export default function FounderWalkingIntro({ progress = 0 }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStartedVoice, setHasStartedVoice] = useState(false);
  const [hasCompletedEntrance, setHasCompletedEntrance] = useState(false);

  // Mark walking entrance completed after 1.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasCompletedEntrance(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Ensure autoplay on mount (muted initially per browser policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay muted attempt:', err);
      });
    }
  }, []);

  // Handle Play/Pause
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

  // Handle Mute/Unmute with user gesture
  const handleUnmuteVoice = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0; // Restart from beginning to hear his speech clearly
      videoRef.current.play();
      setIsMuted(false);
      setIsPlaying(true);
      setHasStartedVoice(true);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Replay from start
  const handleReplay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Calculate dynamic fade out as user scrolls towards page 2
  const scrollOpacity = Math.max(0, 1 - progress * 2.5);
  const isScrollActive = progress < 0.35 && !isMinimized;

  // If minimized, display a discreet golden pill to reopen
  if (isMinimized) {
    return (
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 transition-all duration-300"
        style={{
          opacity: scrollOpacity,
          pointerEvents: scrollOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="group inline-flex items-center space-x-2.5 px-5 py-2.5 bg-forest/90 hover:bg-forest text-ivory border border-gold/60 shadow-floating backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold"
          aria-label="Reopen founder introduction"
        >
          <div className="w-6 h-6 rounded-full bg-crimson flex items-center justify-center text-white text-[10px]">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </div>
          <span className="font-serif text-xs sm:text-sm tracking-wide text-ivory">
            Watch Adi Reddy's Introduction
          </span>
          <span className="text-[10px] uppercase font-sans tracking-widest text-gold-light border-l border-gold/30 pl-2">
            Founder
          </span>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 select-none"
      style={{
        opacity: scrollOpacity,
      }}
    >
      {/* 
        Walking Forward Container:
        - Animated walking stride entrance from the central aisle towards the camera
        - Interactive upon entrance
      */}
      <div 
        className={`pointer-events-auto max-w-sm sm:max-w-md w-full transition-all duration-500 ${
          hasCompletedEntrance ? 'animate-founder-breathe' : 'animate-walk-intro'
        }`}
        style={{
          pointerEvents: isScrollActive ? 'auto' : 'none',
        }}
      >
        
        {/* Main Card with Royal Gold Double Border & Glassmorphic Background */}
        <div className="relative bg-forest/90 backdrop-blur-md border-2 border-gold/60 p-4 sm:p-5 shadow-floating overflow-hidden">
          
          {/* Subtle Corner Gold Ornaments */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold pointer-events-none" />

          {/* Top Bar: Founder Eyebrow Badge & Minimize Button */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/25">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light font-sans font-medium">
                Founder Introduction
              </span>
            </div>

            <button
              onClick={() => setIsMinimized(true)}
              className="text-ivory/60 hover:text-gold transition-colors p-1"
              title="Minimize to view full background"
              aria-label="Minimize introduction"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Video Portal Container: Arched Staging */}
          <div 
            onClick={handleUnmuteVoice}
            className="relative cursor-pointer group aspect-[4/3.4] overflow-hidden bg-charcoal border border-gold/40 shadow-inner"
          >
            <video
              ref={videoRef}
              src="/adi-reddy-intro.mp4"
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent pointer-events-none" />

            {/* Walking Stride / Audio Activation Callout Overlay */}
            {isMuted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest/40 backdrop-blur-[2px] transition-all group-hover:bg-forest/20 p-4 text-center">
                <div className="w-14 h-14 rounded-full bg-crimson/95 border-2 border-gold flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 mb-2.5">
                  <Volume2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="px-3 py-1.5 bg-forest-light/95 border border-gold/50 shadow-md">
                  <span className="font-serif text-xs sm:text-sm text-ivory tracking-wide block">
                    🔊 Click to Listen to Adi Reddy's Voice
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gold-light font-sans block mt-0.5">
                    Original Speech & Greeting
                  </span>
                </div>
              </div>
            )}

            {/* Quick Playback Bar Overlay (Bottom of Video) */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 px-2 py-1 bg-forest/85 backdrop-blur-xs border border-gold/30 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="text-ivory hover:text-gold transition-colors"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={handleUnmuteVoice}
                  className="text-ivory hover:text-gold transition-colors flex items-center space-x-1"
                  aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-crimson" />
                      <span className="text-[9px] text-ivory/80">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-gold-light animate-pulse" />
                      <span className="text-[9px] text-gold-light font-medium">Voice Active</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleReplay}
                className="text-ivory/70 hover:text-gold transition-colors"
                title="Replay from beginning"
                aria-label="Replay video"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Subtitle & Introduction Plaque */}
          <div className="mt-3.5 text-center">
            <h3 className="font-serif text-xl sm:text-2xl text-ivory font-normal tracking-tight">
              Adi Reddy
            </h3>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold-light font-medium mt-0.5">
              Founder & Managing Director
            </p>
            <p className="font-sans text-[10px] text-beige/70 tracking-wider uppercase mt-0.5">
              Adi Reddy Events & Facilitators • Andhra & Telangana
            </p>

            {/* Telugu & English Speech Greeting Box */}
            <div className="mt-2.5 p-2 bg-beige/10 border-l-2 border-gold text-left">
              <p className="font-sans text-[11px] text-ivory/90 leading-relaxed italic">
                "ఈరోజు... Welcome to Adi Reddy Events. From grand weddings to sovereign gatherings, we bring your vision to life."
              </p>
            </div>

            {/* Direct Connect Buttons */}
            <div className="mt-3 pt-3 border-t border-gold/20 flex items-center justify-center gap-2.5">
              <a
                href="https://wa.me/919704917990?text=Hello%20Adi%20Reddy%20sir,%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20an%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 bg-crimson hover:bg-crimson-hover text-white text-[11px] font-sans uppercase tracking-wider transition-colors shadow-subtle"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919704917990"
                className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 bg-forest-light hover:bg-forest text-gold-light border border-gold/40 text-[11px] font-sans uppercase tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 970 4917 990</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

