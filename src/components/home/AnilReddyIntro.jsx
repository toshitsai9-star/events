import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

/**
 * AnilReddyIntro Component
 * - Placed directly in the center of the landing page in the empty aisle space.
 * - Full original video background preserved (NO background removal or masking).
 * - Smooth entrance animation gliding into the center.
 * - Native sound control so visitors hear Anil Reddy speak his introduction.
 */
export default function AnilReddyIntro({ progress = 0 }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Ensure autoplay on load (muted by default per browser autoplay policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay:', err);
      });
    }
  }, []);

  // Sound unmute
  const toggleSound = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0; // Restart from 0 so user hears full speech
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

  // Fade out smoothly on scroll towards section 2
  const scrollOpacity = Math.max(0, 1 - progress * 2.5);
  const isInteractive = progress < 0.35;

  return (
    <div 
      className="absolute inset-x-0 top-1/2 -translate-y-[45%] sm:-translate-y-[48%] z-20 flex flex-col items-center justify-center pointer-events-none px-4 select-none"
      style={{
        opacity: scrollOpacity,
      }}
    >
      {/* Centered Walking / Glide Wrapper */}
      <div 
        className={`relative flex flex-col items-center pointer-events-auto transition-all duration-700 ${
          hasEntered ? 'animate-founder-breathe' : 'animate-walk-intro'
        }`}
        style={{
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
      >
        
        {/* Main Video Container: Full Original Background, Centered, Crisp */}
        <div 
          onClick={toggleSound}
          className="relative cursor-pointer group flex flex-col items-center bg-forest/80 backdrop-blur-md p-2.5 sm:p-3 border-2 border-gold/70 shadow-floating"
        >
          {/* Subtle Royal Corner Accents */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-gold pointer-events-none" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-gold pointer-events-none" />

          {/* Video Player: Original Background Fully Visible */}
          <div className="relative w-64 sm:w-72 md:w-80 aspect-[482/454] overflow-hidden bg-charcoal border border-gold/30">
            <video
              ref={videoRef}
              src="/anil-reddy-intro.mp4"
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Click to Unmute Overlay when Muted */}
            {isMuted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest/20 backdrop-blur-[1px] group-hover:bg-forest/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-crimson/95 border-2 border-gold flex items-center justify-center text-white shadow-floating transition-transform duration-300 group-hover:scale-110 mb-2">
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </div>
                <span className="px-2.5 py-1 bg-forest/90 border border-gold/50 text-[10px] font-sans text-ivory tracking-wide shadow-md">
                  Tap to Hear Anil Reddy's Voice
                </span>
              </div>
            )}
          </div>

          {/* Sound Toggle Bar & Quick Controls */}
          <div className="mt-2.5 w-full flex items-center justify-between px-1">
            <button
              type="button"
              onClick={toggleSound}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 text-[10px] uppercase font-sans tracking-[0.16em] transition-all duration-300 shadow-subtle ${
                isMuted
                  ? 'bg-forest text-gold-light border border-gold/50 hover:border-gold hover:bg-forest-light'
                  : 'bg-crimson text-white border border-crimson'
              }`}
              aria-label={isMuted ? 'Turn on sound' : 'Mute sound'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-gold" />
                  <span>Tap to Listen</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span className="font-medium">Anil Reddy Voice Playing</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 text-ivory/80 hover:text-gold transition-colors bg-forest-light border border-gold/30"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              </button>
              <button
                type="button"
                onClick={handleReplay}
                className="p-1.5 text-ivory/80 hover:text-gold transition-colors bg-forest-light border border-gold/30"
                aria-label="Replay introduction"
                title="Replay from start"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Name & Spoken Greeting Caption */}
          <div className="mt-2 text-center w-full pt-1.5 border-t border-gold/20">
            <span className="font-serif text-sm text-ivory font-normal block">
              Anil Reddy
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold-light font-sans block mb-1">
              Founder • Adi Reddy Events & Facilitators
            </span>
            <p className="font-sans text-[10.5px] text-beige/90 leading-snug italic">
              "హాయ్ అండి, నా పేరు అనిల్ — ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
