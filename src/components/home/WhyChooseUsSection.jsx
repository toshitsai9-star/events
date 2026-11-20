import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Lightbulb,
  CalendarCheck2,
  Users2,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
} from 'lucide-react';

const chapters = [
  {
    icon: Lightbulb,
    title: 'Creative Concepts',
    description:
      'Transforming original ideas into captivating visual and sensory atmospheres tailored uniquely to the personality and purpose of your occasion.',
    stock: 'folio-stock--ivory',
  },
  {
    icon: CalendarCheck2,
    title: 'Complete Event Planning',
    description:
      'Turnkey end-to-end management spanning spatial conception, schedule engineering, venue technical alignment, and guest concierge.',
    stock: 'folio-stock--emerald',
  },
  {
    icon: Users2,
    title: 'Professional Coordination',
    description:
      'A disciplined production team and seasoned on-ground crew ensuring every vendor, artist, technician, and timeline moves in perfect synchrony.',
    stock: 'folio-stock--sand',
  },
  {
    icon: Sparkles,
    title: 'Attention to Detail',
    description:
      'From the exact color temperature of lighting cues to the placement of acoustic monitors and curated tablescapes, every detail receives meticulous scrutiny.',
    stock: 'folio-stock--ivory',
  },
  {
    icon: SlidersHorizontal,
    title: 'Customized Experiences',
    description:
      'We reject generic formulas. Every event itinerary, decor schematic, and sensory element is individually designed around your specific vision.',
    stock: 'folio-stock--obsidian',
  },
  {
    icon: ShieldCheck,
    title: 'Smooth Event Execution',
    description:
      'Unflappable, proactive live supervision behind the scenes, resolving friction before it surfaces so you remain fully present in your celebration.',
    stock: 'folio-stock--sand',
  },
];

const pad = (number) => String(number).padStart(2, '0');

export default function WhyChooseUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState(null);
  const [outgoingIndex, setOutgoingIndex] = useState(null);
  const [turnDirection, setTurnDirection] = useState('next');
  const [isTurning, setIsTurning] = useState(false);
  const touchStartX = useRef(null);
  const turnFallbackRef = useRef(null);
  const activeChapter = chapters[activeIndex];
  const incomingChapter = pendingIndex === null ? null : chapters[pendingIndex];
  const pageChapter = isTurning && outgoingIndex !== null ? chapters[outgoingIndex] : activeChapter;
  const Icon = activeChapter.icon;

  const goTo = useCallback((index, direction) => {
    if (isTurning || index === activeIndex || index < 0 || index >= chapters.length) return;
    setTurnDirection(direction);
    setOutgoingIndex(activeIndex);
    setPendingIndex(index);
    setActiveIndex(index);
    setIsTurning(true);
    window.clearTimeout(turnFallbackRef.current);
    turnFallbackRef.current = window.setTimeout(() => {
      setPendingIndex(null);
      setOutgoingIndex(null);
      setIsTurning(false);
    }, 560);
  }, [activeIndex, isTurning]);

  const completePageTurn = (event) => {
    if (event.target !== event.currentTarget || pendingIndex === null) return;
    window.clearTimeout(turnFallbackRef.current);
    setPendingIndex(null);
    setOutgoingIndex(null);
    setIsTurning(false);
  };

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % chapters.length, 'next');
  }, [activeIndex, goTo]);

  const goPrevious = useCallback(() => {
    goTo((activeIndex - 1 + chapters.length) % chapters.length, 'previous');
  }, [activeIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName) || event.target?.isContentEditable) return;
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrevious();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrevious]);

  useEffect(() => {
    if (isTurning) return undefined;
    const timer = window.setTimeout(goNext, 5000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, isTurning, goNext]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 55) deltaX < 0 ? goNext() : goPrevious();
    touchStartX.current = null;
  };

  return (
    <section id="adi-standard" className="standard-section folio-section">
      <div className="folio-section__content">
        <header className="folio-intro">
          <span className="folio-intro__eyebrow">The Adi Reddy Standard</span>
          <h2>Every Detail Matters.<br />Every Moment Counts.</h2>
          <p>Six principles behind celebrations that feel entirely your own.</p>
        </header>

        <div className="folio-stage">
          <div
            className={`editorial-folio${isTurning ? ` is-turning is-turning--${turnDirection}` : ''}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
          >
            <div className={`folio-plate ${activeChapter.stock}`} key={`plate-${activeIndex}`}>
              <div className="folio-plate__inner-frame" aria-hidden="true" />
              <div className="folio-plate__watermark" aria-hidden="true">
                <svg viewBox="0 0 300 300" fill="none">
                  <circle cx="150" cy="150" r="112" />
                  <circle cx="150" cy="150" r="84" />
                  <path d="M150 25 275 150 150 275 25 150 150 25Z" />
                  <path d="M150 67 233 150 150 233 67 150 150 67Z" />
                  <path d="M150 25v250M25 150h250M62 62l176 176m0-176L62 238" />
                </svg>
              </div>
              <div className="folio-plate__topline">
                <span className="folio-plate__number">{pad(activeIndex + 1)}<i>/</i></span>
                <span className="folio-plate__icon"><Icon strokeWidth={1.45} /></span>
              </div>
              <div className="folio-plate__chapter">
                <span>THE ADI REDDY STANDARD</span>
                <h3>{activeChapter.title}</h3>
              </div>
              <div className="folio-plate__footer">
                <span>CHAPTER {pad(activeIndex + 1)} OF 06</span>
                <span className="folio-plate__rule" />
              </div>
            </div>

            {incomingChapter && (
              <article className="folio-page folio-page--under" aria-hidden="true">
                <div className="folio-page__topline">
                  <span>THE ADI REDDY STANDARD</span>
                  <span className="folio-page__ornament">✳</span>
                </div>
                <div className="folio-page__copy">
                  <span className="folio-page__kicker">A considered approach to every occasion</span>
                  <h3>{incomingChapter.title}</h3>
                  <p>{incomingChapter.description}</p>
                </div>
                <div className="folio-page__footer">
                  <span className="folio-page__signature">THE ADI REDDY STANDARD</span>
                  <span className="folio-page__footer-rule" />
                  <span className="folio-page__page-number">p. {pad(pendingIndex + 1)}</span>
                </div>
              </article>
            )}

            <article
              className="folio-page"
              key={`page-${activeIndex}`}
              onAnimationEnd={completePageTurn}
            >
              <div className="folio-page__topline">
                <span>THE ADI REDDY STANDARD</span>
                <span className="folio-page__ornament" aria-hidden="true">✳</span>
              </div>
              <div className="folio-page__copy">
                <span className="folio-page__kicker">A considered approach to every occasion</span>
                <h3>{pageChapter.title}</h3>
                <p>{pageChapter.description}</p>
              </div>
              <div className="folio-page__footer">
                <span className="folio-page__signature">THE ADI REDDY STANDARD</span>
                <span className="folio-page__footer-rule" aria-hidden="true" />
                <span className="folio-page__page-number">p. {pad(isTurning && outgoingIndex !== null ? outgoingIndex + 1 : activeIndex + 1)}</span>
              </div>
            </article>
          </div>

        </div>

      </div>
    </section>
  );
}
