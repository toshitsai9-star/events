import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX, MessageSquare, Play, Pause } from 'lucide-react';

/**
 * HeroAvatar Component
 * Full-body talking presenter with transparent background video support:
 * - WebM VP9 alpha + HEVC-alpha .mov for Safari + poster fallback.
 * - Sized 85-95vh tall on desktop, standing on the left third with feet near bottom.
 * - Ground shadow ellipse & subtle breathing scale.
 * - Tiny cursor parallax.
 * - "Hear intro" sound toggle (never autoplays with sound).
 * - Toggleable synchronized captions.
 */
export default function HeroAvatar({
  config,
  mousePos = { x: 0, y: 0 },
  isMuted = true,
  onToggleMute,
  isPlaying = true,
  onTogglePlay,
  showCaptions = true,
  onToggleCaptions,
  activeCaption = '',
}) {
  const videoRef = useRef(null);

  // Sync mute state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Subtle cursor parallax offset (tiny damping)
  const parallaxX = mousePos.x * 12;
  const parallaxY = mousePos.y * 8;

  return (
    <div 
      className="relative flex flex-col items-center justify-end h-[85vh] sm:h-[90vh] lg:h-[92vh] max-h-[920px] pointer-events-auto select-none"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      {/* 
        Video / Presenter Stage:
        Uses transparent video sources with poster fallback
      */}
      <div className="relative w-auto h-full flex flex-col items-center justify-end">
        
        {/* Main Video Element with WebM VP9 alpha & HEVC alpha sources */}
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster={config.avatar.poster}
          aria-label={config.avatar.ariaLabel}
          className="h-full w-auto object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] will-change-transform animate-avatar-breathe"
        >
          {/* Primary: WebM VP9 with Alpha (Chrome, Firefox, Edge) */}
          <source src={config.avatar.videoWebm} type='video/webm; codecs="vp9, opus"' />
          
          {/* Safari: HEVC / ProRes with Alpha */}
          <source src={config.avatar.videoMov} type='video/quicktime' />
          
          {/* Fallback to local MP4 asset if alpha video files not yet dropped in */}
          <source src={config.avatar.fallbackVideo} type='video/mp4' />
          
          {/* Poster Image Fallback */}
          <img
            src={config.avatar.poster}
            alt={config.avatar.ariaLabel}
            className="h-full w-auto object-contain object-bottom"
          />
        </video>

        {/* Realistic Ground Shadow Ellipse */}
        <div 
          className="absolute -bottom-2 w-48 sm:w-64 h-5 bg-black/20 blur-md rounded-[100%] pointer-events-none -z-10 transform scale-x-110"
        />

        {/* Synchronized Captions Pill (Toggleable) */}
        {showCaptions && activeCaption && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 bg-[#111111]/90 backdrop-blur-md rounded-full border border-white/10 shadow-lg whitespace-nowrap">
            <span className="font-sans text-xs text-white/95 tracking-wide">
              {activeCaption}
            </span>
          </div>
        )}

        {/* Floating Avatar Micro-Controls ("Hear intro" & Captions) */}
        <div className="absolute top-4 left-0 z-20 flex items-center space-x-2">
          {/* Hear Intro Sound Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium tracking-wide transition-all duration-300 shadow-subtle ${
              isMuted
                ? 'bg-[#111111] text-[#F2F0E6] hover:bg-[#3B2F8F] hover:scale-105'
                : 'bg-[#3B2F8F] text-white animate-pulse'
            }`}
            aria-label={isMuted ? "Unmute intro speech" : "Mute intro speech"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/80" />
                <span>Hear intro</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span>Audio on</span>
              </>
            )}
          </button>

          {/* Captions Toggle */}
          <button
            type="button"
            onClick={onToggleCaptions}
            className={`p-1.5 rounded-full border text-xs transition-colors ${
              showCaptions
                ? 'bg-white text-[#111] border-gray-300'
                : 'bg-black/60 text-white/70 border-white/20 hover:text-white'
            }`}
            title={showCaptions ? "Hide captions" : "Show captions"}
            aria-label={showCaptions ? "Hide captions" : "Show captions"}
          >
            <MessageSquare className="w-3 h-3" />
          </button>

          {/* Pause / Play Control */}
          <button
            type="button"
            onClick={onTogglePlay}
            className="p-1.5 rounded-full bg-black/60 text-white/70 hover:text-white border border-white/20 text-xs transition-colors"
            title={isPlaying ? "Pause video" : "Play video"}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
          </button>
        </div>

      </div>
    </div>
  );
}

