import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * Lightweight IntersectionObserver hook for triggering scroll animations across all pages.
 * - Detects elements with '.reveal-init' or '[data-reveal]'
 * - Triggers '.revealed' class with hardware-accelerated transitions
 * - Replays section/card reveals as they re-enter the viewport while scrolling
 * - Auto-initializes on route change
 * - Automatically falls back to fully visible if IntersectionObserver or reduced-motion is active
 */
export default function useScrollReveal() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Apply scroll reveals to each section and its feature cards. When an
    // element leaves the viewport it is armed for a smooth reveal on re-entry.
    const directions = ['up', 'left', 'right'];
    document.querySelectorAll('main section').forEach((section, index) => {
      if (!section.classList.contains('reveal-init')) {
        section.classList.add('motion-reveal');
        section.dataset.motionDirection = directions[index % directions.length];
      }
    });

    document.querySelectorAll('main section .grid > *, main section [data-motion="reveal"], footer').forEach((el, index) => {
      if (el.matches('.group, article, a[href], [data-motion="reveal"]')) {
        el.classList.add('site-card-motion');
      }
      if (!el.classList.contains('reveal-init')) {
        el.classList.add('motion-reveal');
        el.dataset.motionDirection = index % 3 === 0 ? 'up' : index % 2 === 0 ? 'left' : 'right';
      }
    });

    document.querySelectorAll('header a[href], header button, main a[href], main button, footer a[href], footer button').forEach((el) => {
      el.classList.add('site-action-motion');
    });

    document.querySelectorAll('main section .grid').forEach((grid) => {
      Array.from(grid.children).forEach((card, index) => {
        card.style.setProperty('--motion-delay', `${Math.min(index, 5) * 75}ms`);
      });
    });

    const revealAll = () => {
      document.querySelectorAll('.reveal-init').forEach((el) => el.classList.add('revealed'));
      document.querySelectorAll('.motion-reveal').forEach((el) => el.classList.add('motion-revealed'));
    };

    // Preserve explicit per-element reveals alongside automatic section/card reveals.
    const revealTargets = document.querySelectorAll(
      '.reveal-init:not(.revealed), .motion-reveal:not(.motion-revealed)'
    );

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.classList.contains('motion-reveal') ? 'motion-revealed' : 'revealed'
            );
          } else if (entry.target.classList.contains('motion-reveal')) {
            entry.target.classList.remove('motion-revealed');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0,
      }
    );

    revealTargets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);
}

