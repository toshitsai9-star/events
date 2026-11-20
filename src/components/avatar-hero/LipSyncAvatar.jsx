/* No blur, fade, or mask effects on the founder. Edge quality comes from the video matte. */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import EntryGate from './EntryGate';
import WebGLAvatarMatte from './WebGLAvatarMatte';

/**
 * LipSyncAvatar Component
 * 
 * Implements the Layered Autoplay Strategy:
 * 1. Immediate attempt with sound: On mount, set muted=false, volume=1, call play().
 *    If it resolves, voice is playing; hide pill, skip entry gate, show small sound toggle.
 *    If it rejects (NotAllowedError), proceed to Step 2.
 * 2. Muted fallback that keeps visual alive: Set muted=true, play() silently, mark state="sound-blocked".
 * 3. First-gesture unlock anywhere: Listen once (capture, passive) on window for pointerdown, touchend, click, keydown.
 *    On first gesture: restart video from currentTime=0, set muted=false, volume=1, call play(),
 *    resume AudioContext, hide pill, show sound toggle.
 * 4. Softer hint pill: "Tap anywhere to hear the founder" with animated sound-wave icon.
 * 5. Optional Entry Gate (ENTRY_GATE, default true): Luxury welcome overlay in warm cream/serif style
 *    with "Enter Experience" and "Enter without sound". Skipped if Step 1 succeeds or if previously entered.
 */
export default function LipSyncAvatar({
  videoSource = '/founder-intro-video.mp4',
  founderName = 'Anil Reddy',
  entryGateEnabled = false,
  mousePos = { x: 0, y: 0 },
  scrollY = 0,
  isLoaded = true,
  progress = 0,
}) {
  // Sound states: 'pending' | 'playing-with-sound' | 'sound-blocked' | 'muted-by-user'
  const [soundState, setSoundState] = useState('pending');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showEntryGate, setShowEntryGate] = useState(false);
  const [showFallbackButton, setShowFallbackButton] = useState(false);
  const [hasFirstFramePlayed, setHasFirstFramePlayed] = useState(false);

  const mediaRef = useRef(null);
  const hasAttemptedAutoplayRef = useRef(false);

  // Core unlock function: sets muted=false, volume=1, restarts from 0, and plays
  const unlockWithSound = useCallback((fromBeginning = true) => {
    const video = mediaRef.current;
    if (!video) return;

    if (fromBeginning) {
      video.currentTime = 0;
    }
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);
    setSoundState('playing-with-sound');

    // Resume any Web Audio API AudioContext if present
    try {
      if (window.AudioContext || window.webkitAudioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (window.__globalAudioContext && window.__globalAudioContext.state === 'suspended') {
          window.__globalAudioContext.resume();
        }
      }
    } catch {
      // Ignore
    }

    video.play().then(() => {
      setIsPlaying(true);
      setShowFallbackButton(false);
    }).catch((err) => {
      console.warn('Playback error after unlock:', err);
      setShowFallbackButton(true);
    });
  }, []);

  // STEP 1 & 2: STATE MACHINE RUN ON EVERY PAGE LOAD INCLUDING RELOADS
  useEffect(() => {
    if (hasAttemptedAutoplayRef.current) return;
    hasAttemptedAutoplayRef.current = true;

    const video = mediaRef.current;
    if (!video) return;

    // 1. On load, immediately try to play the founder video with sound:
    video.currentTime = 0;
    video.volume = 1.0;
    video.muted = false;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // 2. If play() RESOLVES (browser trusts the site, user enabled sound, or high MEI):
          // Skip the welcome screen completely, play the voice from start, and show the "VOICE ON" control. No click needed.
          setIsPlaying(true);
          setIsMuted(false);
          setSoundState('playing-with-sound');
          setShowEntryGate(false);
          setShowFallbackButton(false);
        })
        .catch(() => {
          // 3. If play() REJECTS (NotAllowedError):
          // Show the welcome screen again, even if the visitor entered earlier in this session.
          // Meanwhile keep the founder video running muted and blurred behind the overlay.
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});

          setIsMuted(true);
          setSoundState('sound-blocked');
          if (entryGateEnabled) {
            setShowEntryGate(true);
          } else {
            setShowFallbackButton(true);
          }
        });
    }
  }, [entryGateEnabled]);

  // STEP 3: FIRST-GESTURE UNLOCK ANYWHERE (ACTIVE WHILE SOUND-BLOCKED)
  useEffect(() => {
    if (soundState !== 'sound-blocked' || showEntryGate) return;

    // Listen once (capture phase, passive) on window for pointerdown, touchend, click, keydown
    const handleFirstGesture = () => {
      unlockWithSound(true);
      cleanup();
    };

    const cleanup = () => {
      ['pointerdown', 'touchend', 'click', 'keydown'].forEach((type) => {
        window.removeEventListener(type, handleFirstGesture, true);
      });
    };

    ['pointerdown', 'touchend', 'click', 'keydown'].forEach((type) => {
      window.addEventListener(type, handleFirstGesture, { capture: true, passive: true });
    });

    return cleanup;
  }, [soundState, showEntryGate, unlockWithSound]);

  // SCROLL VISIBILITY MANAGEMENT
  useEffect(() => {
    const video = mediaRef.current;
    if (!video) return;

    if (progress > 0.85 && !video.paused) {
      video.pause();
      setIsPlaying(false);
    } else if (progress < 0.2 && video.paused && !isEnded && hasAttemptedAutoplayRef.current) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [progress, isEnded]);

  // Sound toggle button (Mute / Unmute)
  const handleToggleSound = (e) => {
    if (e) e.stopPropagation();
    const video = mediaRef.current;
    if (!video) return;

    if (isMuted) {
      // Unmute
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      setSoundState('playing-with-sound');
      if (video.paused && !isEnded) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      // Mute
      video.muted = true;
      setIsMuted(true);
      setSoundState('muted-by-user');
    }
  };

  // 4. Clicking "ENTER EXPERIENCE" (synchronous execution, no await before play)
  const handleGateEnterWithSound = () => {
    const video = mediaRef.current;
    if (!video) return;

    // Directly set audio properties and call play() within the click handler
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);
    setSoundState('playing-with-sound');

    // Resume any Web Audio API AudioContext
    try {
      if (window.AudioContext || window.webkitAudioContext) {
        if (window.__globalAudioContext && window.__globalAudioContext.state === 'suspended') {
          window.__globalAudioContext.resume();
        }
      }
    } catch {
      // Ignore
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowFallbackButton(false);
        })
        .catch((err) => {
          console.error('Play error after Enter:', err);
          setShowFallbackButton(true);
        });
    }
  };

  // 5. "ENTER WITHOUT SOUND" keeps the video muted and shows the mute/unmute toggle in the "muted" state
  const handleGateEnterWithoutSound = () => {
    const video = mediaRef.current;
    if (video) {
      video.muted = true;
      setIsMuted(true);
      setSoundState('muted-by-user');
      if (video.paused && !isEnded) {
        video.play().catch(() => {});
      }
    }
  };

  const handleGateDismiss = () => {
    setShowEntryGate(false);
  };

  const onSpeechEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  return (
    <>
      {/* 
        ============================================================
        STEP 5: OPTIONAL ENTRY GATE OVERLAY
        Minimal luxury welcome overlay that serves as the natural user gesture.
        Skipped if Step 1 succeeds or if previously entered in this session.
        ============================================================
      */}
      {showEntryGate && (
        <EntryGate
          onEnterWithSound={handleGateEnterWithSound}
          onEnterWithoutSound={handleGateEnterWithoutSound}
          onDismiss={handleGateDismiss}
        />
      )}

      {/* 
        ============================================================
        HERO PRESENTER VIEWPORT & AVATAR
        ============================================================
      */}
      <div className="absolute inset-0 select-none overflow-hidden z-20 pointer-events-none">

        {/* 
          ============================================================
          FALLBACK BUTTON: "TAP TO HEAR THE FOUNDER"
          Only shown if "Enter Experience" play() rejects or entry gate is disabled.
          ============================================================
        */}
        {showFallbackButton && !showEntryGate && !isEnded && (
          <div className="founder-sound-hint absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                unlockWithSound(true);
              }}
              className="group flex items-center space-x-3 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#222222] text-white shadow-xl border border-[#D6B879]/40 hover:border-[#D6B879] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
              title="Tap to hear the founder"
            >
              <Volume2 className="w-4 h-4 text-[#D6B879] animate-pulse" />
              <span className="text-xs font-sans font-semibold tracking-wider uppercase text-white/95">
                Tap to hear the founder
              </span>
            </button>
          </div>
        )}

        {/* 
          ============================================================
          ELEGANT SOUND TOGGLE BUTTON (MUTE / UNMUTE)
          Discreet luxury sound controller in the top right corner.
          Displays active sound waves when unmuted.
          Visible ONLY when sound is unlocked or user manually muted (never simultaneous with fallback pill).
          ============================================================
        */}
        {!showEntryGate && (soundState === 'playing-with-sound' || soundState === 'muted-by-user') && (
          <div className="founder-sound-toggle absolute z-30 pointer-events-auto">
            <button
              type="button"
              onClick={handleToggleSound}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300 border ${
                !isMuted
                  ? 'bg-[#171717] text-[#D6B879] border-[#D6B879]/40 hover:bg-[#222222] shadow-md'
                  : 'bg-white text-[#171717]/80 border-[#171717]/10 hover:bg-[#171717] hover:text-white'
              }`}
              title={isMuted ? 'Unmute Founder Voice' : 'Mute Founder Voice'}
              aria-label={isMuted ? 'Unmute Founder Voice' : 'Mute Founder Voice'}
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D6B879]" />
                  <div className="flex items-center space-x-0.5">
                    <span className="w-0.5 h-2 bg-[#D6B879] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3 bg-[#D6B879] rounded-full animate-[pulse_0.6s_ease-in-out_0.2s_infinite]" />
                    <span className="w-0.5 h-1.5 bg-[#D6B879] rounded-full animate-[pulse_0.6s_ease-in-out_0.4s_infinite]" />
                  </div>
                  <span className="founder-sound-label text-[10px] font-mono tracking-wider uppercase text-[#D6B879]">
                    Voice On
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="founder-sound-label text-[10px] font-mono tracking-wider uppercase">
                    Muted
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* 
          ============================================================
          SEAMLESS FOUNDER INTEGRATION (IMAGE 3 STUDIO MATCH)
          - Centered prominently waist-up
          - Soft feathered radial vignette dissolving into warm ivory background (#F5F1E8)
          - Authentic Telugu lip sync & original AAC audio
          - Blurred and dimmed while welcome overlay is visible
          ============================================================
        */}
        <div
          className={`founder-avatar-stage absolute bottom-[-24px] sm:bottom-[-20px] left-1/2 will-change-transform flex flex-col items-center justify-end h-[78vh] sm:h-[84vh] md:h-[88vh] lg:h-[90vh] max-h-[960px] w-auto pointer-events-auto transition-all duration-700 ${
            showEntryGate ? 'opacity-0 pointer-events-none scale-98' : 'opacity-100 pointer-events-auto scale-100'
          }`}
          style={{
            transform: `translate3d(calc(-50% + ${mousePos.x * 8}px), ${isLoaded ? `${mousePos.y * 5 + scrollY * 0.12}px` : '30px'}, 0)`,
            opacity: isLoaded ? Math.max(0, 1 - progress * 1.3) : 0,
            transition: isLoaded
              ? 'transform 0.2s cubic-bezier(0.1, 0, 0.2, 1), opacity 0.5s ease-out'
              : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out',
          }}
        >
          <div 
            className="relative h-full w-auto aspect-[16/9] max-w-[96vw] flex items-end justify-center will-change-transform cursor-pointer"
            onClick={() => {
              if (isMuted) {
                unlockWithSound(false);
              } else {
                handleToggleSound();
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isMuted) unlockWithSound(false);
              }
            }}
            aria-label="Founder Introduction - Anil Reddy"
          >
            {/* Founder media viewport */}

            {/* 
              Poster Image:
              - Rendered ONLY until first video frame plays, then unmounted from DOM completely
              - Matches exact first frame of video to prevent any visual shift or blink
            */}
            {!hasFirstFramePlayed && (
              <img
                src="/founder-cutout.png"
                alt={founderName}
                className="w-full h-full object-cover select-none pointer-events-none absolute inset-0 z-10"
                style={{
                  objectPosition: 'center bottom',
                }}
              />
            )}

            {/* 
              Dynamic GPU-Accelerated Video Matting:
              - Motion-aware segmentation tracking Anil's head, hair, ears, and shoulders continuously
              - Eliminates white halo, bright fringes, and static mask edge artifacts
              - Edge decontamination removes studio wall color spill from hair strands
              - Transparent background allowing "ADI REDDY" background typography behind him
            */}
            <WebGLAvatarMatte
              videoRef={mediaRef}
              hasFirstFramePlayed={hasFirstFramePlayed}
              founderName={founderName}
            />

            {/* 
              The Authentic Talking Founder Audio & Video Source:
              - Manages audio stream, time updates, and supplies decoded frames to the GPU canvas
              - Preserves original Telugu voice track & lip sync
            */}
            <video
              ref={mediaRef}
              src={videoSource}
              autoPlay
              playsInline
              preload="auto"
              onPlaying={() => setHasFirstFramePlayed(true)}
              onTimeUpdate={() => {
                if (!hasFirstFramePlayed && mediaRef.current && mediaRef.current.currentTime > 0) {
                  setHasFirstFramePlayed(true);
                }
              }}
              onEnded={onSpeechEnded}
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              style={{
                objectPosition: 'center bottom',
              }}
            />
          </div>
        </div>

      </div>
    </>
  );
}
