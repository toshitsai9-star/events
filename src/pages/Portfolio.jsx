import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  X, 
  Film, 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ChevronRight, 
  Maximize2,
  Volume2,
  VolumeX,
  Camera,
  Smartphone,
  Layers3,
  LayoutGrid
} from 'lucide-react';
import { PORTFOLIO_VIDEOS } from '../data/portfolioVideos';
import AutoPlayReel from '../components/portfolio/AutoPlayReel';
import { pauseAllReels, requestReelPlayback } from '../utilities/reelPlayback';

/**
 * Event Films page
 * 
 * Cinematic event films highlighting weddings, traditional dining,
 * corporate summits, live concerts, college festivals, and bespoke celebrations.
 * Supports both vertical 9:16 reels and 16:9 landscape cinema films.
 */
export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [galleryLayout, setGalleryLayout] = useState('fan');
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [pinnedVideoId, setPinnedVideoId] = useState(null);
  const modalVideoRef = useRef(null);

  // Featured video (first featured or first in list)
  const featuredVideo = PORTFOLIO_VIDEOS.find((v) => v.featured) || PORTFOLIO_VIDEOS[0];

  // Show the featured film once in the spotlight, then list the other films.
  const filteredVideos = PORTFOLIO_VIDEOS.filter((v) => v.id !== featuredVideo?.id);

  // Handle modal escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVideo]);

  const handleOpenVideo = (video) => {
    pauseAllReels();
    setSelectedVideo(video);
    setIsPlaying(false);
    setIsMuted(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleToggleModalMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (modalVideoRef.current) modalVideoRef.current.muted = nextMuted;
  };

  const handleToggleModalPlayback = () => {
    const video = modalVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF7F2] text-charcoal min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section className="relative bg-ivory pt-12 pb-16 md:pt-16 md:pb-24 border-b border-gold/20 overflow-hidden">
        {/* Subtle architectural background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8">
            <div className="border-r border-gold/20 h-full"></div>
            <div className="hidden sm:block border-r border-gold/20 h-full col-span-2"></div>
            <div className="hidden lg:block border-r border-gold/20 h-full col-span-4"></div>
            <div className="border-r border-gold/20 h-full"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans text-charcoal/60 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-crimson transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gold" />
            <Link to="/gallery-contact" className="hover:text-crimson transition-colors">
              Gallery & Contact
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold font-medium">Event Films</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-gold/40 bg-beige/50 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-sans">
                <Film className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>Event Films • Adi Reddy Events</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-charcoal leading-[1.08] tracking-tight">
                Moments Captured <br className="hidden sm:inline" />
                <span className="italic font-light text-forest">in Motion.</span>
              </h1>
              <div className="w-16 h-[1px] bg-gold" />
              <p className="font-sans text-base sm:text-lg text-charcoal/80 max-w-xl leading-relaxed font-light">
                See how founder Anil Reddy and the team bring weddings, cultural celebrations, and live productions to life.
              </p>
            </div>
            {featuredVideo && (
              <button type="button" onClick={() => handleOpenVideo(featuredVideo)}
                className="group relative lg:col-span-5 w-full aspect-[16/10] lg:aspect-[4/5] overflow-hidden border border-gold/40 bg-forest shadow-card text-left"
                aria-label={`Play featured film: ${featuredVideo.title}`}>
                <img src={featuredVideo.posterUrl} alt={`${featuredVideo.categoryLabel} event film`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-forest/10" />
                <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 px-3 py-2 bg-forest/90 text-ivory text-[10px] uppercase tracking-[0.16em]">
                  <Play className="w-3.5 h-3.5 fill-current text-gold" />Watch featured film
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-ivory/95 font-mono text-xs text-charcoal">{featuredVideo.duration}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS & MAIN VIDEO GALLERY */}
      <section className="film-gallery" id="film-gallery">
        <div className="film-gallery__content">
        <div className="film-gallery__header">
          <div className="film-gallery__heading">
            <span className="text-xs uppercase tracking-[0.22em] text-gold font-sans font-medium block mb-1">
              Curated Event Films
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
              Production Walkthroughs & Films
            </h2>
          </div>
          <div className="film-gallery__layout-toggle" role="group" aria-label="Choose reel layout">
            <button type="button" className={galleryLayout === 'fan' ? 'is-active' : ''} onClick={() => setGalleryLayout('fan')} aria-pressed={galleryLayout === 'fan'}>
              <Layers3 aria-hidden="true" /> Fan Arc
            </button>
            <button type="button" className={galleryLayout === 'grid' ? 'is-active' : ''} onClick={() => setGalleryLayout('grid')} aria-pressed={galleryLayout === 'grid'}>
              <LayoutGrid aria-hidden="true" /> Grid Spread
            </button>
          </div>
        </div>

        <div className={`film-gallery__deck film-gallery__deck--${galleryLayout}`}>
          {filteredVideos.map((video, index) => {
            const isVertical = video.aspect === 'vertical';
            const isDarkCard = video.category === 'production' || video.category === 'founder';
            const centerIndex = (filteredVideos.length - 1) / 2;
            const focusedId = filteredVideos.some((item) => item.id === hoveredVideoId) ? hoveredVideoId : pinnedVideoId;
            const activeIndex = filteredVideos.findIndex((item) => item.id === focusedId);
            const cardOffset = (index - centerIndex) * 178;
            const cardSpread = activeIndex >= 0 && index !== activeIndex
              ? Math.sign(index - activeIndex) * 28
              : 0;
            return (
              <div
                key={video.id}
                className={`film-card film-card--${video.category}${focusedId === video.id ? ' is-focused' : ''}${pinnedVideoId === video.id ? ' is-pinned' : ''}`}
                style={{
                  '--fan-shift': `${cardOffset + cardSpread}px`,
                  '--fan-tilt': `${(index - centerIndex) * 4}deg`,
                  '--fan-rise': `${Math.abs(index - centerIndex) * 12}px`,
                  '--card-order': index,
                }}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                onFocus={() => setHoveredVideoId(video.id)}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHoveredVideoId(null); }}
                onClick={(event) => {
                  if (event.target.closest('button, a, .film-card__media')) return;
                  setPinnedVideoId((current) => current === video.id ? null : video.id);
                }}
              >
                {/* Video Thumbnail Viewport */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${video.title} film`}
                  onClick={() => handleOpenVideo(video)}
                  onKeyDown={(event) => {
                    if (event.target.closest('button')) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleOpenVideo(video);
                    }
                  }}
                  onMouseEnter={(event) => requestReelPlayback(event.currentTarget.querySelector('video'))}
                  className="film-card__media"
                >
                  <AutoPlayReel
                    src={video.videoUrl}
                    poster={video.posterUrl}
                    title={video.title}
                    className="film-card__autoplay"
                  />
                  <div className="film-card__scrim" />

                  {/* Duration Badge */}
                  <div className="film-card__duration">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="film-card__badges">
                    <span className="film-card__badge">
                      {video.categoryLabel}
                    </span>
                    {isVertical && (
                      <span className="film-card__badge film-card__badge--live">
                        Live Video
                      </span>
                    )}
                  </div>
                  <span className="film-card__index">{video.num}</span>
                </div>

                {/* Card Meta Body */}
                <div className={`film-card__body${isDarkCard ? ' is-dark' : ''}`}>
                  <div className="film-card__copy">
                    <div className="film-card__location">
                      <MapPin aria-hidden="true" />
                      <span>{video.location}</span>
                    </div>

                    <h3 
                      onClick={() => handleOpenVideo(video)}
                      className="film-card__title"
                    >
                      {video.title}
                    </h3>

                    <p className="film-card__description">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Action Footer */}
                  <div className="film-card__footer">
                    <span className={`film-card__watch-hint ${isDarkCard ? 'text-gold-light/70' : 'text-charcoal/55'}`}>
                      Tap reel to watch
                    </span>

                    <Link
                      to="/gallery-contact"
                      className="film-card__inquire"
                    >
                      <span>Inquire</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* 4. CINEMA MODAL LIGHTBOX */}
      {selectedVideo && createPortal((
        <div 
          className="cinema-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-lg animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={handleCloseVideo} />

          <div className={`cinema-modal relative w-full ${
            selectedVideo.aspect === 'vertical' ? 'max-w-xl' : 'max-w-5xl'
          } bg-[#121212] border border-gold/30 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[95vh]`}>
            
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-forest border-b border-gold/20 text-ivory">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-light">
                <Film className="w-4 h-4 text-gold" />
                <span>{selectedVideo.categoryLabel}</span>
                <span className="text-ivory/40">•</span>
                <span className="text-ivory/80">{selectedVideo.location}</span>
              </div>

              <button
                onClick={handleCloseVideo}
                className="p-1.5 text-ivory/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className={`relative w-full bg-black flex items-center justify-center ${
              selectedVideo.aspect === 'vertical' ? 'max-h-[68vh] aspect-[9/16]' : 'aspect-video max-h-[70vh]'
            }`}>
              <video
                ref={modalVideoRef}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.posterUrl}
                muted={isMuted}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onClick={handleToggleModalPlayback}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleModalPlayback}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/75 text-white shadow-lg transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  title={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={handleToggleModalMute}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/75 text-white shadow-lg transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  aria-pressed={!isMuted}
                  title={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Modal Video Info Footer */}
            <div className="p-4 sm:p-5 bg-[#161616] text-ivory flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gold/15 overflow-y-auto">
              <div className="space-y-1.5 text-left max-w-xl">
                <div className="flex items-center space-x-3 text-xs text-gold font-sans">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedVideo.location}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{selectedVideo.duration}</span>
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-ivory font-normal">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs text-ivory/70 font-sans font-light line-clamp-2">
                  {selectedVideo.description}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center space-x-3">
                <Link
                  to="/gallery-contact"
                  onClick={handleCloseVideo}
                  className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-[0.16em] px-5 py-2.5 bg-crimson text-white hover:bg-crimson-hover border border-crimson transition-colors"
                >
                  <span>Plan Similar Event</span>
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      ), document.body)}

      {/* 5. CLOSING CALL TO ACTION BANNER */}
      <section className="py-16 md:py-24 bg-forest text-ivory border-t border-gold/20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-light font-sans block">
            Begin Your Celebration Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
            Ready to Create an Unforgettable Event of Your Own?
          </h2>
          <div className="w-12 h-[1px] bg-gold/50 mx-auto" />
          <p className="font-sans text-base text-beige/80 max-w-2xl mx-auto leading-relaxed font-light">
            From royal traditional weddings to corporate symposiums and arena concerts, 
            Anil Reddy and the team at Adi Reddy Events & Facilitators manage every detail from concept to execution.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/gallery-contact"
              className="inline-flex items-center justify-center font-sans text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-4 bg-crimson text-white hover:bg-crimson-hover transition-all duration-300 shadow-lg border border-crimson"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center font-sans text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-4 border border-gold text-ivory hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
