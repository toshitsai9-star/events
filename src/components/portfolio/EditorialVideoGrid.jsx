import React, { useState, useRef, useEffect } from 'react';
import { 
  Play,
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Film, 
  Clock, 
  MapPin, 
  CalendarCheck2,
  House,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { REEL_PAUSE_EVENT, REEL_PLAY_EVENT, pauseAllReels, requestReelPlayback } from '../../utilities/reelPlayback';
import { PORTFOLIO_VIDEOS } from '../../data/portfolioVideos';

const REEL_ICONS = {
  weddings: Film,
  dining: CalendarCheck2,
  home: House,
  production: Sparkles,
  founder: UserRound,
};

const REEL_CARD_STYLES = {
  weddings: 'rounded-[2rem_2rem_0.5rem_2rem] bg-[#fbf8f2] border-gold/30 shadow-lg',
  dining: 'rounded-lg bg-[#efe6d8] border-transparent shadow-sm',
  home: 'rounded-t-[4rem] rounded-b-md bg-white border-gold/35 shadow-md',
  production: 'rounded-3xl bg-[#10251e] border-gold/35 text-white shadow-xl',
  founder: 'rounded-[2.25rem] bg-[#2a211e] border-crimson/50 text-white shadow-xl',
};

/**
 * EditorialVideoGrid Component
 * 
 * Recreates the exact 6-card editorial design layout:
 * - Cream/beige card aesthetic with subtle gold border
 * - Top square icon box (turns solid charcoal with gold icon when playing)
 * - Monospace index: '01 //', '02 //', etc.
 * - Elegant Serif titles
 * - Editorial description paragraphs
 * - Muted reel previews that play as they enter view
 * - Optional full cinema modal player
 * - Video-specific event focus on each card
 */
export default function EditorialVideoGrid({ title, subtitle, eyebrow }) {
  const [playingId, setPlayingId] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);
  const [modalMuted, setModalMuted] = useState(true);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [mutedById, setMutedById] = useState({});
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);
  const playCardRef = useRef(null);

  const videoCards = PORTFOLIO_VIDEOS;

  const startCardPlayback = (id) => {
    const targetVideo = videoRefs.current[id];
    if (!targetVideo) return;

    Object.keys(videoRefs.current).forEach((k) => {
      const vid = videoRefs.current[k];
      if (vid && Number(k) !== id) {
        vid.pause();
      }
    });

    targetVideo.muted = mutedById[id] ?? true;
    requestReelPlayback(targetVideo);
  };

  playCardRef.current = startCardPlayback;

  const handlePlayCard = (id) => {
    const targetVideo = videoRefs.current[id];
    if (!targetVideo) return;
    if (!targetVideo.paused) {
      targetVideo.pause();
      return;
    }
    startCardPlayback(id);
  };

  const handleMuteToggle = (id, event) => {
    event.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;
    const nextMuted = !(mutedById[id] ?? true);
    video.muted = nextMuted;
    setMutedById((current) => ({ ...current, [id]: nextMuted }));
  };

  useEffect(() => {
    const videos = Object.values(videoRefs.current).filter(Boolean);
    if (!videos.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = Number(entry.target.dataset.reelId);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          playCardRef.current?.(id);
        } else if (entry.intersectionRatio < 0.15) {
          entry.target.pause();
        }
      });
    }, { threshold: [0, 0.15, 0.55] });

    videos.forEach((video) => observer.observe(video));
    const pauseOtherReels = (event) => videos.forEach((video) => {
      if (video !== event.detail) video.pause();
    });
    const pauseAll = () => videos.forEach((video) => video.pause());
    window.addEventListener(REEL_PLAY_EVENT, pauseOtherReels);
    window.addEventListener(REEL_PAUSE_EVENT, pauseAll);

    return () => {
      observer.disconnect();
      window.removeEventListener(REEL_PLAY_EVENT, pauseOtherReels);
      window.removeEventListener(REEL_PAUSE_EVENT, pauseAll);
    };
  }, []);

  const toggleMute = (id, event) => handleMuteToggle(id, event);

  const handleOpenModal = (card, e) => {
    if (e) e.stopPropagation();
    pauseAllReels();
    // Pause any inline playing video
    if (playingId && videoRefs.current[playingId]) {
      videoRefs.current[playingId].pause();
      setPlayingId(null);
    }
    setModalVideo(card);
    setModalMuted(true);
    setModalPlaying(false);
  };

  const handleCloseModal = () => {
    setModalVideo(null);
  };

  const handleToggleModalPlayback = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setModalPlaying(false));
    } else {
      video.pause();
    }
  };

  const handleToggleModalMute = () => {
    const nextMuted = !modalMuted;
    setModalMuted(nextMuted);
    if (modalVideoRef.current) modalVideoRef.current.muted = nextMuted;
  };

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setModalVideo(null);
    };
    if (modalVideo) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalVideo]);

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20 scroll-mt-20" id="video-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching the editorial standard */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-3">
            {eyebrow || 'Cinematic Production Archive'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal leading-[1.15] tracking-tight mb-4">
            {title || 'Every Detail Captured. Every Moment Preserved.'}
          </h2>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto mb-4" />
          <p className="font-sans text-base sm:text-lg text-charcoal/75 leading-relaxed font-light">
            {subtitle || 'Watch wedding celebrations, traditional dining, and housewarming décor come to life in these event films.'}
          </p>
        </div>

        {/* 6-Card Editorial Grid matching the user's reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoCards.map((card) => {
            const Icon = REEL_ICONS[card.category] || Film;
            const isPlaying = playingId === card.id;
            const isDarkCard = card.category === 'production' || card.category === 'founder';

            return (
              <div
                key={card.id}
                className={`p-6 sm:p-7 border transition-all duration-500 ease-out flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl ${REEL_CARD_STYLES[card.category] || 'bg-beige/35 border-gold/25'} ${
                  isPlaying 
                    ? 'ring-2 ring-gold/60 shadow-xl' 
                    : 'hover:border-gold'
                }`}
              >
                <div>
                  {/* Top Row: Square Icon Box (matches reference image) */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      onClick={() => handlePlayCard(card.id)}
                      className={`w-12 h-12 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isPlaying 
                          ? 'bg-[#171717] border border-[#171717] text-gold shadow-md' 
                          : 'bg-ivory border border-gold/40 text-gold group-hover:border-gold group-hover:bg-forest group-hover:text-gold-light'
                      }`}
                      title={isPlaying ? 'Pause Video' : 'Play Video'}
                      role="button"
                      tabIndex={0}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 bg-ivory/80 border border-gold/30 text-gold">
                        {card.duration}
                      </span>
                    </div>
                  </div>

                  {/* Monospace Index: '01 //', '02 //', etc. */}
                  <span className={`font-mono text-[11px] block mb-2 ${isDarkCard ? 'text-gold-light' : 'text-gold'}`}>
                    {card.num}
                  </span>

                  {/* Elegant Serif Title */}
                  <h3 
                    onClick={() => handlePlayCard(card.id)}
                    className={`font-serif text-xl sm:text-2xl mb-3 transition-colors cursor-pointer leading-snug ${isDarkCard ? 'text-ivory group-hover:text-gold-light' : 'text-charcoal group-hover:text-forest'}`}
                  >
                    {card.title}
                  </h3>

                  {/* Editorial Description */}
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed font-light mb-5 ${isDarkCard ? 'text-ivory/75' : 'text-charcoal/75'}`}>
                    {card.description}
                  </p>

                  {/* Integrated Video Player Viewport */}
                  <div 
                    className={`relative w-full ${card.aspect === 'square' ? 'aspect-square max-h-[360px]' : card.category === 'production' ? 'aspect-[4/5]' : 'aspect-[9/16]'} bg-black rounded-[1.25rem] overflow-hidden border border-gold/30 mb-6 cursor-pointer group/video shadow-inner`}
                    onClick={() => handlePlayCard(card.id)}
                    onMouseEnter={() => startCardPlayback(card.id)}
                  >
                    <video
                      ref={(el) => (videoRefs.current[card.id] = el)}
                      data-reel-id={card.id}
                      src={card.videoUrl}
                      poster={card.posterUrl}
                      muted={mutedById[card.id] ?? true}
                      loop
                      playsInline
                      preload="metadata"
                      // Keep native controls hidden so no timeline appears on reels.
                      className="w-full h-full object-cover object-center transition-all duration-300"
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                      }}
                      onClick={(e) => {
                        if (isPlaying) e.stopPropagation();
                      }}
                      onPlay={() => setPlayingId(card.id)}
                      onPause={() => setPlayingId((current) => current === card.id ? null : current)}
                      onEnded={() => setPlayingId(null)}
                    >
                      <source src={card.videoUrl} type="video/mp4" />
                      {card.fallbackUrl && <source src={card.fallbackUrl} type="video/mp4" />}
                      Your browser does not support the video tag.
                    </video>

                    {/* Category Overlay Tag */}
                    <div className="absolute top-2 left-2 pointer-events-none">
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-black/75 backdrop-blur-xs text-gold border border-gold/30">
                        {card.tag}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => toggleMute(card.id, event)}
                      className="absolute top-2 right-11 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/75 text-white shadow transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      aria-label={mutedById[card.id] ?? true ? `Unmute ${card.title}` : `Mute ${card.title}`}
                      aria-pressed={!(mutedById[card.id] ?? true)}
                      title={mutedById[card.id] ?? true ? 'Unmute video' : 'Mute video'}
                    >
                      {mutedById[card.id] ?? true
                        ? <VolumeX className="w-4 h-4" />
                        : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Cinema expand button */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenModal(card, e)}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-ivory rounded-xs backdrop-blur-xs transition-colors z-10"
                      title="Open in Cinema Mode"
                      aria-label="Open Cinema Mode"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </div>

                </div>

                {/* Video-specific production focus */}
                <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                      {card.productionFocus}
                    </span>
                    <span className="text-[10px] text-charcoal/40 font-sans">•</span>
                    <span className={`text-[10px] font-sans ${isDarkCard ? 'text-ivory/65' : 'text-charcoal/60'}`}>{card.categoryLabel}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => handlePlayCard(card.id)}
                      className="inline-flex items-center space-x-1.5 text-xs text-forest hover:text-crimson font-sans transition-colors cursor-pointer"
                    >
                      <span className="text-[10px] uppercase tracking-wider font-medium">
                        {isPlaying ? 'Pause Video' : 'Play Video'}
                      </span>
                      <div className="w-3 h-[1px] bg-gold/60" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleOpenModal(card, e)}
                      className="text-[10px] uppercase tracking-wider text-charcoal/60 hover:text-gold font-sans transition-colors"
                      title="Expand Cinema Player"
                    >
                      [Cinema]
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* FULLSCREEN CINEMA MODAL */}
      {modalVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={handleCloseModal} />

          <div className="relative w-full max-w-xl bg-[#121212] border border-gold/40 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[95vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#06110C] border-b border-gold/25 text-ivory">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-light">
                <Film className="w-4 h-4 text-gold" />
                <span>{modalVideo.title}</span>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-1.5 text-ivory/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video player with custom controls; native timeline is intentionally hidden. */}
            <div className="relative w-full aspect-[9/16] max-h-[75vh] bg-black flex items-center justify-center">
              <video
                ref={modalVideoRef}
                src={modalVideo.videoUrl}
                poster={modalVideo.posterUrl}
                muted={modalMuted}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onClick={handleToggleModalPlayback}
                onPlay={() => setModalPlaying(true)}
                onPause={() => setModalPlaying(false)}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {modalVideo.fallbackUrl && <source src={modalVideo.fallbackUrl} type="video/mp4" />}
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleModalPlayback}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/75 text-white shadow-lg transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={modalPlaying ? 'Pause video' : 'Play video'}
                  title={modalPlaying ? 'Pause video' : 'Play video'}
                >
                  {modalPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={handleToggleModalMute}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/75 text-white shadow-lg transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={modalMuted ? 'Unmute video' : 'Mute video'}
                  aria-pressed={!modalMuted}
                  title={modalMuted ? 'Unmute video' : 'Mute video'}
                >
                  {modalMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#161616] text-ivory flex items-center justify-between border-t border-gold/15">
              <div className="text-left space-y-0.5">
                <div className="text-xs text-gold flex items-center space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{modalVideo.location}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{modalVideo.duration}</span>
                </div>
                <p className="text-xs text-ivory/70 font-sans font-light line-clamp-1">
                  {modalVideo.description}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 bg-crimson text-white text-xs uppercase tracking-wider font-sans hover:bg-crimson-hover transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
