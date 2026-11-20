import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { REEL_PAUSE_EVENT, REEL_PLAY_EVENT, requestReelPlayback } from '../../utilities/reelPlayback';

export default function AutoPlayReel({ src, poster, title, className = '' }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
        requestReelPlayback(video);
      } else if (entry.intersectionRatio < 0.15) {
        video.pause();
      }
    }, { threshold: [0, 0.15, 0.55] });

    const pauseWhenAnotherReelStarts = (event) => {
      if (event.detail !== video) video.pause();
    };
    const pauseOnRequest = () => video.pause();

    observer.observe(video);
    window.addEventListener(REEL_PLAY_EVENT, pauseWhenAnotherReelStarts);
    window.addEventListener(REEL_PAUSE_EVENT, pauseOnRequest);

    return () => {
      observer.disconnect();
      window.removeEventListener(REEL_PLAY_EVENT, pauseWhenAnotherReelStarts);
      window.removeEventListener(REEL_PAUSE_EVENT, pauseOnRequest);
      video.pause();
    };
  }, []);

  const startPlayback = () => requestReelPlayback(videoRef.current);
  const toggleMute = (event) => {
    event.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
  };

  return (
    <div className={`relative ${className}`} onMouseEnter={startPlayback}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggleMute}
        className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/70 text-white shadow-lg transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={isMuted ? `Unmute ${title}` : `Mute ${title}`}
        aria-pressed={!isMuted}
        title={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
