/* No blur, fade, or mask effects on the founder. Edge quality comes from the video matte. */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, X } from 'lucide-react';
import EntryGate from './EntryGate';
import WebGLAvatarMatte from './WebGLAvatarMatte';

/**
 * LipSyncAvatar Component
 * 
 * Implements the Layered Autoplay Strategy:
 * 1. Immediate attempt with sound: On mount, set muted=false, volume=1, call play().
 *    If it resolves, voice is playing; hide pill, skip entry gate, show small sound toggle.
 *    If it rejects (NotAllowedError), proceed to Step 2.
 * 2. If browser autoplay policy blocks sound, keep the video playing muted.
 * 3. Keep one explicit sound control in the top-right; never unmute on unrelated page clicks.
 * 4. Some browsers require the visitor to tap the sound control before audio can start.
 * 5. Optional Entry Gate (ENTRY_GATE, default true): Luxury welcome overlay in warm cream/serif style
 *    with "Enter Experience" and "Enter without sound". Skipped if Step 1 succeeds or if previously entered.
 */
const AUDIO_PROMPT_KEY = 'adi-reddy-founder-audio-choice';

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
  const [showAudioPrompt, setShowAudioPrompt] = useState(() => {
    try {
      return typeof window === 'undefined' || window.sessionStorage.getItem(AUDIO_PROMPT_KEY) !== 'chosen';
    } catch {
      return true;
    }
  });
  const [hasFirstFramePlayed, setHasFirstFramePlayed] = useState(false);

  const mediaRef = useRef(null);
  const hasAttemptedAutoplayRef = useRef(false);

  const dismissAudioPrompt = useCallback(() => {
    setShowAudioPrompt(false);
    try {
      window.sessionStorage.setItem(AUDIO_PROMPT_KEY, 'chosen');
    } catch {
      // The prompt still dismisses for the current page if session storage is unavailable.
    }
  }, []);

  // Start or unmute from the current point; a sound-control click must not restart the video.
  const unlockWithSound = useCallback((fromBeginning = false) => {
    dismissAudioPrompt();
    const video = mediaRef.current;
    if (!video) return;

    // Starting playback after the clip has ended should replay from frame one.
    if (fromBeginning || video.ended || (Number.isFinite(video.duration) && video.currentTime >= video.duration)) {
      video.currentTime = 0;
      setIsEnded(false);
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

    Promise.resolve(video.play()).then(() => {
      setIsPlaying(true);
    }).catch(() => {
      video.muted = true;
      setIsMuted(true);
      setSoundState('sound-blocked');
    });
  }, [dismissAudioPrompt]);

  // STEP 1 & 2: STATE MACHINE RUN ON EVERY PAGE LOAD INCLUDING RELOADS
  useEffect(() => {
    if (hasAttemptedAutoplayRef.current) return;
    hasAttemptedAutoplayRef.current = true;

    const video = mediaRef.current;
    if (!video) return;

    const startFromBeginning = () => {
      video.currentTime = 0;
      video.volume = 1.0;
      video.muted = false;

      Promise.resolve(video.play())
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setSoundState('playing-with-sound');
          setShowEntryGate(false);
          dismissAudioPrompt();
        })
        .catch(async () => {
          // Browsers may block audible autoplay. Keep the original clip playing
          // silently and let the top-right control request sound on a tap.
          video.currentTime = 0;
          video.muted = true;
          setIsMuted(true);
          setSoundState('sound-blocked');
          try {
            await video.play();
            setIsPlaying(true);
          } catch {
            setIsPlaying(false);
          }
          if (entryGateEnabled) setShowEntryGate(true);
        });
    };

    startFromBeginning();

    // A page restored from the browser's back/forward cache may not remount React.
    // Restart it from frame one just like a fresh page load.
    const handlePageShow = (event) => {
      if (event.persisted) startFromBeginning();
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [entryGateEnabled, dismissAudioPrompt]);



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
      if (video.paused) {
        if (video.ended || (Number.isFinite(video.duration) && video.currentTime >= video.duration)) {
          video.currentTime = 0;
          setIsEnded(false);
        }
        Promise.resolve(video.play()).then(() => setIsPlaying(true)).catch(() => {
          video.muted = true;
          setIsMuted(true);
          setSoundState('sound-blocked');
        });
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
    dismissAudioPrompt();
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
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          setSoundState('sound-blocked');
        });
    }
  };

  // 5. "ENTER WITHOUT SOUND" keeps the video muted and shows the mute/unmute toggle in the "muted" state
  const handleGateEnterWithoutSound = () => {
    dismissAudioPrompt();
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

      {showAudioPrompt && !showEntryGate && soundState !== 'playing-with-sound' && (
        <aside
          className="founder-audio-prompt absolute left-4 right-4 z-40 mx-auto sm:left-auto sm:right-8 sm:mx-0"
          role="dialog"
          aria-label="Listen to the founder's welcome"
        >
          <div className="rounded-xl border border-[#B49A70]/70 bg-[#F8F6F1]/96 p-4 text-[#171717] shadow-[0_18px_48px_rgba(6,17,12,.22)]">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#06110C] text-[#D4B982]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-[9px] font-semibold uppercase tracking-[.2em] text-[#9A8059]">A greeting from Anil</span>
                <p className="mt-1 font-serif text-lg leading-tight">Hear our founder’s words</p>
                <p className="mt-1 text-xs leading-relaxed text-[#171717]/65">Tap to listen to Anil’s welcome.</p>
              </div>
              <button type="button" onClick={dismissAudioPrompt} className="rounded-full p-1 text-[#171717]/50 transition hover:bg-black/5 hover:text-[#171717]" aria-label="Close audio prompt">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => unlockWithSound(true)}
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#9B1B1B] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.13em] text-white transition hover:bg-[#7f1717] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A70]"
              >
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                Listen to Anil
              </button>
              <button type="button" onClick={dismissAudioPrompt} className="px-2 py-2 text-[9px] font-semibold uppercase tracking-[.1em] text-[#171717]/55 transition hover:text-[#171717]">
                Keep muted
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 
        ============================================================
        HERO PRESENTER VIEWPORT & AVATAR
        ============================================================
      */}
      <div className="absolute inset-0 select-none overflow-hidden z-20 pointer-events-none">

        {/* 
          ============================================================
          ELEGANT SOUND TOGGLE BUTTON (MUTE / UNMUTE)
          Discreet luxury sound controller in the top right corner.
          Displays active sound waves when unmuted.
          Always visible so blocked autoplay can be enabled with one intentional tap.
          ============================================================
        */}
        {!showEntryGate && (
          <div className="founder-sound-toggle absolute z-30 pointer-events-auto">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (isMuted) unlockWithSound(false);
                else handleToggleSound(event);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300 border ${
                !isMuted
                  ? 'bg-[#171717] text-[#D6B879] border-[#D6B879]/40 hover:bg-[#222222] shadow-md'
                  : 'bg-white text-[#171717]/80 border-[#171717]/10 hover:bg-[#171717] hover:text-white'
              }`}
              title={isMuted ? 'Turn on founder audio' : 'Mute founder audio'}
              aria-label={isMuted ? 'Turn on founder audio' : 'Mute founder audio'}
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
                    {soundState === 'sound-blocked' || soundState === 'pending' ? 'Tap for sound' : 'Muted'}
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
              onPlaying={() => {
                setHasFirstFramePlayed(true);
                setIsEnded(false);
              }}
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

