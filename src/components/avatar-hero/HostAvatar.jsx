import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, MessageSquare, Play, Pause } from 'lucide-react';

/**
 * HostAvatar Component
 * Full-body, front-facing female presenter (white shirt, dark grey wide-leg trousers),
 * standing on the left third, 85-95vh tall, feet near the bottom of the viewport.
 * 
 * Features:
 * - Transparent background support: WebM VP9 alpha + HEVC alpha (.mov) + transparent PNG poster fallback.
 * - "Hear welcome message" sound toggle (unmutes & restarts speech on click; never autoplays with sound).
 * - Soft ground shadow ellipse beneath feet with subtle breathing scale (1 -> 1.01).
 * - Tiny cursor parallax.
 * - Synced subtitles/captions with toggle control.
 * - Zero CLS with reserved aspect ratio container.
 */
export default function HostAvatar({
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
  const [hasVideoError, setHasVideoError] = useState(false);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync play/pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Subtle cursor parallax
  const parallaxX = mousePos.x * 12;
  const parallaxY = mousePos.y * 8;

  return (
    <div
      className="relative flex flex-col items-center justify-end h-[85vh] sm:h-[90vh] lg:h-[94vh] max-h-[960px] w-auto aspect-[9/16] pointer-events-auto select-none"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
      }}
    >
      {/* 
        Video Presenter Stage (CLS is 0 because aspect ratio and height are reserved)
      */}
      <div className="relative w-full h-full flex flex-col items-center justify-end">
        
        {/* Main Video with Alpha WebM + HEVC QuickTime Sources */}
        {!hasVideoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            poster={config.avatar.poster}
            aria-label={config.avatar.ariaLabel}
            onError={() => setHasVideoError(true)}
            className="h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] will-change-transform animate-avatar-breathe"
          >
            {/* Transparent WebM VP9 (Chrome, Edge, Firefox, Android) */}
            <source src={config.avatar.videoWebm} type='video/webm; codecs="vp9, opus"' />
            
            {/* Safari iOS / macOS HEVC with Alpha */}
            <source src={config.avatar.videoMov} type='video/quicktime' />

            {/* Poster fallback inside video element */}
            <img
              src={config.avatar.poster}
              alt={config.avatar.ariaLabel}
              className="h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]"
            />
          </video>
        ) : (
          /* Transparent Poster Image Fallback when video alpha files are loading or unsupplied */
          <img
            src={config.avatar.poster}
            alt={config.avatar.ariaLabel}
            className="h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] will-change-transform animate-avatar-breathe"
          />
        )}

        {/* Ground Shadow Ellipse */}
        <div 
          className="absolute -bottom-2 w-48 sm:w-60 h-5 bg-black/20 blur-md rounded-[100%] pointer-events-none -z-10 transform scale-x-110"
        />

        {/* Synchronized Subtitles / Captions Pill */}
        {showCaptions && activeCaption && (
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-[#111111]/90 backdrop-blur-md rounded-full border border-white/10 shadow-lg whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis">
            <span className="font-sans text-xs text-white/95 tracking-wide">
              {activeCaption}
            </span>
          </div>
        )}

        {/* Presenter Floating Controls: "Hear welcome message" Sound Toggle & Captions */}
        <div className="absolute top-4 left-0 z-20 flex items-center space-x-2">
          {/* "Hear welcome message" sound toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium tracking-wide transition-all duration-300 shadow-subtle ${
              isMuted
                ? 'bg-[#111111] text-[#F2F0E6] hover:bg-[#3B2F8F] hover:scale-105'
                : 'bg-[#3B2F8F] text-white animate-pulse'
            }`}
            aria-label={isMuted ? "Hear welcome message" : "Mute welcome message"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/80" />
                <span>Hear welcome message</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span>Audio on</span>
              </>
            )}
          </button>

          {/* Toggleable Captions */}
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

