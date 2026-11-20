import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useEventScrollTimeline Hook
 * 
 * Drives the 4-phase scroll-driven timeline:
 * 1. 0–35%: Avatar scales slightly (1 -> 1.08) and translates upward (0 -> -90vh).
 *    Headline & ghost text fade and drift left.
 * 2. 25–60%: Lanyard strap slides up from below her feet carrying a silver metal clip.
 * 3. 40–100%: Event pass slides up, attaches to clip, and sways with damped pendulum (±3°).
 * 4. Releases pin cleanly into next section while right-side info and CTA remain accessible.
 * 
 * Full responsive support via gsap.matchMedia and prefers-reduced-motion.
 */
export function useEventScrollTimeline({
  containerRef,
  avatarRef,
  headlineRef,
  ghostTextRef,
  lanyardRef,
  passRef,
  rightInfoRef,
}) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Accessibility: Support prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // In reduced motion mode, render without scroll pinning
      if (lanyardRef.current) gsap.set(lanyardRef.current, { opacity: 1, y: 0 });
      if (passRef.current) gsap.set(passRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP BREAKPOINT (min-width: 1024px)
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

        // Phase 1 (0–35%): Headline & ghost text fade and drift left
        tl.to(
          headlineRef.current,
          {
            x: -100,
            opacity: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0
        )
        .to(
          ghostTextRef.current,
          {
            x: -140,
            opacity: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0
        )
        // Avatar continues playing, scales (1 -> 1.08) and moves up (-90vh),
        // ending with legs and feet visible at the top
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

        // Phase 2 (25–60%): Lanyard strap enters from below feet with silver metal clip
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

        // Phase 3 (40–100%): Event pass slides up, attaches to clip, and settles with damped pendulum sway (±3°)
        tl.fromTo(
          passRef.current,
          {
            y: '115vh',
            opacity: 0,
            rotation: 5,
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
        // Realistic damped pendulum sway pivoting from clip
        .to(
          passRef.current,
          {
            rotation: -3,
            ease: 'sine.inOut',
            duration: 0.15,
          },
          0.70
        )
        .to(
          passRef.current,
          {
            rotation: 2.2,
            ease: 'sine.inOut',
            duration: 0.15,
          },
          0.85
        )
        .to(
          passRef.current,
          {
            rotation: 0,
            ease: 'sine.inOut',
            duration: 0.15,
          },
          0.97
        );

        // Right-side info and Register Now button stay visible, fading smoothly near the end
        if (rightInfoRef.current) {
          tl.to(
            rightInfoRef.current,
            {
              opacity: 0.35,
              ease: 'power1.out',
              duration: 0.25,
            },
            0.75
          );
        }
      });

      // ==========================================
      // MOBILE / TABLET BREAKPOINT (max-width: 1023px)
      // Shorter scroll distance, adapted positions
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
            y: -25,
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
            y: '-65vh',
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
          passRef.current,
          { y: '95vh', opacity: 0 },
          { y: '0vh', opacity: 1, duration: 0.4 },
          0.4
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, avatarRef, headlineRef, ghostTextRef, lanyardRef, passRef, rightInfoRef]);

  return timelineRef;
}

