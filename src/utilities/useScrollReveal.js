import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * Lightweight IntersectionObserver hook for triggering scroll animations across all pages.
 * - Detects elements with '.reveal-init' or '[data-reveal]'
 * - Triggers '.revealed' class with hardware-accelerated transitions
 * - Unobserves elements once revealed (single execution, zero overhead)
 * - Auto-initializes on route change
 * - Automatically falls back to fully visible if IntersectionObserver or reduced-motion is active
 */
export default function useScrollReveal() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Sections/cards join the reveal system automatically, but the CSS keeps
    // them visible while waiting for the observer so missed intersections can
    // never leave empty-looking areas in the page.
    const directions = ['up', 'left', 'right'];
    document.querySelectorAll('main section').forEach((section, index) => {
      if (!section.classList.contains('reveal-init')) {
        section.classList.add('motion-reveal');
        section.dataset.motionDirection = directions[index % directions.length];
      }
    });

    document.querySelectorAll('main section .grid > .group, main section [data-motion="reveal"], footer').forEach((el) => {
      if (!el.classList.contains('reveal-init')) el.classList.add('motion-reveal');
    });

    document.querySelectorAll('main section .grid').forEach((grid) => {
      Array.from(grid.children).forEach((card, index) => {
        if (card.classList.contains('motion-reveal') || card.classList.contains('reveal-init')) {
          card.style.setProperty('--motion-delay', `${Math.min(index, 4) * 55}ms`);
        }
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
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px 160px 0px',
        threshold: 0,
      }
    );

    revealTargets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);
}

