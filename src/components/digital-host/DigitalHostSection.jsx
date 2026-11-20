import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Settings, 
  Sparkles, 
  Loader2 
} from 'lucide-react';
import defaultHostConfig from '../../config/digitalHostConfig.json';
import DigitalHostAdminModal from './DigitalHostAdminModal';

/**
 * DigitalHostSection Component
 * 
 * Premium Realistic Telugu AI Talking Avatar Section:
 * - Section Heading: "Meet Your Digital Host"
 * - Subheading: "మీకు స్వాగతం చెప్పడానికి నేను ఇక్కడ ఉన్నాను."
 * - Prominent transparent cutout portrait of Founder Anil Reddy.
 * - Circular play button with subtle glowing aura and sound-wave animation.
 * - Seamless video switch on click: starts the HeyGen-rendered Telugu talking avatar video.
 * - Audio-synced lip movement and natural eye contact.
 * - Replay, mute/unmute, and loading states.
 * - Discrete administrator modal trigger for HeyGen API video generation & script updates.
 */
export default function DigitalHostSection() {
  const [config, setConfig] = useState(defaultHostConfig);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const videoRef = useRef(null);

  // Load latest configuration from backend
  useEffect(() => {
    fetch('/api/avatar/config')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.heading) {
          setConfig(data);
        }
      })
      .catch(() => {});
  }, []);

  // Handle Play Click
  const handlePlay = () => {
    setVideoEnded(false);
    setHasVideoError(false);
    setIsPlaying(true);
    setIsLoadingVideo(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => {
          setIsLoadingVideo(false);
        })
        .catch((err) => {
          console.warn('Video play interrupted or unsupported:', err);
          setIsLoadingVideo(false);
          setHasVideoError(true);
        });
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleReplay = () => {
    setVideoEnded(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const onVideoEnded = () => {
    setIsPlaying(false);
    setVideoEnded(true);
  };

  const activeVideoSource = config.videoUrl || config.fallbackVideoUrl || '/anil-reddy-intro.mp4';

  return (
    <section 
      id="digital-host-section"
      className="relative w-full py-20 md:py-28 bg-[#F8F6F1] text-[#111111] overflow-hidden border-b border-gold/20"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(248, 246, 241, 0.95) 70%, #ECE7DD 100%)',
      }}
    >
      {/* Background Watermark Branding */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035] overflow-hidden"
      >
        <span className="text-[20vw] font-black uppercase tracking-tighter text-[#111111] whitespace-nowrap leading-none">
          ADI REDDY
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-dark text-[11px] font-mono uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>AI Digital Experience</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] tracking-tight mb-3">
            {config.heading || 'Meet Your Digital Host'}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#111111]/75 font-medium">
            {config.subheading || 'మీకు స్వాగతం చెప్పడానికి నేను ఇక్కడ ఉన్నాను.'}
          </p>
        </div>

        {/* 
          Main Avatar Interactive Stage
        */}
        <div className="relative mx-auto max-w-3xl flex flex-col items-center">
          
          {/* Avatar Container with Glowing Aura */}
          <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] max-h-[640px] flex items-end justify-center rounded-3xl overflow-hidden bg-gradient-to-b from-white/60 via-[#F8F6F1]/80 to-[#ECE7DD] border border-gold/30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)]">
            
            {/* Subtle Glowing Aura Animation */}
            <div 
              className={`absolute inset-0 rounded-3xl -z-10 transition-opacity duration-700 pointer-events-none ${
                isPlaying
                  ? 'opacity-100 bg-radial from-gold/25 via-gold/5 to-transparent blur-2xl animate-pulse'
                  : 'opacity-40 bg-radial from-white via-transparent to-transparent'
              }`}
            />

            {/* 1. Static Transparent Cutout Portrait (Resting State) */}
            <div 
              className={`absolute inset-0 flex items-end justify-center transition-opacity duration-500 pointer-events-none ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <img
                src={config.portraitImage || '/founder-cutout.png'}
                alt={`${config.founderName} - Digital Host`}
                className="h-[92%] w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] select-none"
              />
            </div>

            {/* 2. Video Player for Speaking AI Avatar */}
            <video
              ref={videoRef}
              src={activeVideoSource}
              playsInline
              preload="auto"
              onEnded={onVideoEnded}
              onError={() => setHasVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                isPlaying && !hasVideoError ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            />

            {/* Contact Ground Shadow */}
            <div className="absolute -bottom-2 w-64 h-6 bg-black/20 blur-md rounded-[100%] pointer-events-none -z-10" />

            {/* 
              3. Interactive Center Circular Play / Replay Trigger
            */}
            {!isPlaying && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
                <button
                  type="button"
                  onClick={videoEnded ? handleReplay : handlePlay}
                  className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#06110C] text-white shadow-2xl border-2 border-gold/60 hover:bg-gold hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                  aria-label={videoEnded ? "Replay Telugu Introduction" : "Play Telugu Introduction"}
                >
                  {/* Outer pulse ring */}
                  <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-60 pointer-events-none" />

                  {videoEnded ? (
                    <RotateCcw className="w-8 h-8 text-white transition-transform group-hover:-rotate-90 duration-300" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white translate-x-0.5 transition-transform group-hover:scale-110" />
                  )}
                </button>

                <span className="mt-4 px-4 py-1.5 rounded-full bg-[#06110C]/85 backdrop-blur-md text-white font-sans text-xs font-semibold tracking-wider uppercase shadow-md border border-white/10">
                  {videoEnded ? 'Replay Introduction' : 'Click to Hear Telugu Welcome'}
                </span>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoadingVideo && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-xs">
                <div className="flex flex-col items-center p-4 rounded-xl bg-[#06110C]/90 text-white space-y-2">
                  <Loader2 className="w-7 h-7 text-gold animate-spin" />
                  <span className="text-xs font-medium tracking-wide">Starting speech...</span>
                </div>
              </div>
            )}

            {/* In-Video Active Controls (Visible While Speaking) */}
            {isPlaying && (
              <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-md">
                <button
                  type="button"
                  onClick={handlePause}
                  className="p-1 text-white hover:text-gold transition-colors"
                  title="Pause video"
                >
                  <Pause className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-3.5 bg-white/20" />
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="p-1 text-white hover:text-gold transition-colors"
                  title={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            )}

            {/* Bottom Floating Subtitle Pill */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex justify-center pointer-events-none">
              <div className="max-w-md px-4 py-2 bg-[#06110C]/90 backdrop-blur-md rounded-2xl border border-gold/30 shadow-lg text-center">
                <p className="font-sans text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
                  "హాయ్ అండి, నా పేరు అనిల్ — ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్"
                </p>
              </div>
            </div>

          </div>

          {/* 
            Sound-Wave Animation Bar (Active while avatar speaks)
          */}
          <div className="mt-6 flex items-center space-x-1.5 h-6">
            <span className="text-[11px] font-mono tracking-widest text-black/50 uppercase font-semibold mr-2">
              {isPlaying ? 'AUDIO TRANSMISSION ACTIVE' : 'PRESENTER READY'}
            </span>
            {[40, 70, 100, 60, 85, 45, 95, 65, 30].map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying ? 'bg-gold' : 'bg-black/20'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(6, (height * Math.random()).toFixed(0))}px` : '4px',
                }}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Discrete Administrator Studio Trigger (Gear Icon in bottom right) */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setIsAdminModalOpen(true)}
          className="group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 hover:bg-[#06110C] text-black/60 hover:text-white border border-black/10 hover:border-gold shadow-sm hover:shadow-md transition-all duration-300 text-xs font-semibold"
          title="Open HeyGen AI Avatar Configuration Studio"
        >
          <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-[10px] uppercase font-mono tracking-wider">AI Studio</span>
        </button>
      </div>

      {/* Admin Studio Modal */}
      <DigitalHostAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onConfigUpdated={(updated) => setConfig(updated)}
      />
    </section>
  );
}

