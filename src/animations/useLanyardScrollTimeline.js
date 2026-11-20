import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useLanyardScrollTimeline Hook
 * 
 * Drives the 4-phase scroll animation specified:
 * 1. 0–35%: Avatar scales (1 -> 1.08) and moves up (0 -> -90vh). Headline & ghost text fade and drift left.
 * 2. 25–60%: Lanyard strap slides up from below feet with silver metal clip.
 * 3. 40–100%: ID Badge attaches to clip and settles with a damped pendulum sway (±3°).
 * 4. Releases pin and flows into About section while right-side info fades smoothly.
 * 
 * Supports prefers-reduced-motion and responsive matchMedia (desktop vs mobile).
 */
export function useLanyardScrollTimeline({
  containerRef,
  avatarRef,
  headlineRef,
  ghostTextRef,
  lanyardRef,
  badgeRef,
  rightInfoRef,
}) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // In reduced motion, keep elements in static, accessible state
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP TIMELINE (min-width: 1024px)
      // ==========================================
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timelineRef.current = tl;

        // Phase 1 (0–35%): Avatar moves up (-90vh) & scales (1 -> 1.08). Headline & Ghost text fade & drift left.
        tl.to(
          headlineRef.current,
          {
            x: -80,
            opacity: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0
        )
        .to(
          ghostTextRef.current,
          {
            x: -120,
            opacity: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0
        )
        .to(
          avatarRef.current,
          {
            y: '-90vh',
            scale: 1.08,
            ease: 'power2.inOut',
            duration: 0.45,
          },
          0
        );

        // Phase 2 (25–60%): Lanyard strap enters from below feet with silver clip
        tl.fromTo(
          lanyardRef.current,
          {
            y: '100vh',
            opacity: 0,
          },
          {
            y: '0vh',
            opacity: 1,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.25
        );

        // Phase 3 (40–100%): ID Badge slides up to clip and settles with damped pendulum sway (±3°)
        tl.fromTo(
          badgeRef.current,
          {
            y: '120vh',
            opacity: 0,
            rotation: 6,
          },
          {
            y: '0vh',
            opacity: 1,
            rotation: 0,
            ease: 'power3.out',
            duration: 0.45,
          },
          0.40
        )
        // Subtle pendulum damped sway settling into natural hanging position
        .to(
          badgeRef.current,
          {
            rotation: -3,
            ease: 'sine.inOut',
            duration: 0.15,
          },
          0.70
        )
        .to(
          badgeRef.current,
          {
            rotation: 2,
            ease: 'sine.inOut',
            duration: 0.15,
          },
          0.85
        )
        .to(
          badgeRef.current,
          {
            rotation: 0,
            ease: 'sine.inOut',
            duration: 0.15,
          },
          0.95
        );

        // Right-side info smooth fade towards end of pin
        if (rightInfoRef.current) {
          tl.to(
            rightInfoRef.current,
            {
              opacity: 0.3,
              ease: 'power1.out',
              duration: 0.3,
            },
            0.7
          );
        }
      });

      // ==========================================
      // MOBILE / TABLET TIMELINE (max-width: 1023px)
      // Shorter scroll distance, responsive scaling
      // ==========================================
      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timelineRef.current = tl;

        tl.to(
          headlineRef.current,
          {
            y: -30,
            opacity: 0,
            duration: 0.3,
          },
          0
        )
        .to(
          ghostTextRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          0
        )
        .to(
          avatarRef.current,
          {
            y: '-70vh',
            scale: 1.04,
            duration: 0.4,
          },
          0
        )
        .fromTo(
          lanyardRef.current,
          { y: '80vh', opacity: 0 },
          { y: '0vh', opacity: 1, duration: 0.35 },
          0.25
        )
        .fromTo(
          badgeRef.current,
          { y: '90vh', opacity: 0 },
          { y: '0vh', opacity: 1, duration: 0.4 },
          0.4
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, avatarRef, headlineRef, ghostTextRef, lanyardRef, badgeRef, rightInfoRef]);

  return timelineRef;
}

