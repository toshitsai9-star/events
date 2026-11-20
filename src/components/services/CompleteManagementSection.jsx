import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CalendarCheck,
  Lightbulb,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';

const pillars = [
  {
    icon: Lightbulb,
    title: 'Creative Concepts',
    description: 'Transforming original ideas into captivating visual and sensory atmospheres tailored uniquely to the personality and purpose of your occasion.',
    finish: 'ivory',
  },
  {
    icon: CalendarCheck,
    title: 'Complete Event Planning',
    description: 'Turnkey end-to-end management spanning spatial conception, schedule engineering, venue technical alignment, and guest concierge.',
    finish: 'emerald',
  },
  {
    icon: Users,
    title: 'Professional Coordination',
    description: 'A disciplined production team and seasoned on-ground crew ensuring every vendor, artist, technician, and timeline moves in perfect synchrony.',
    finish: 'sand',
  },
  {
    icon: Sparkles,
    title: 'Attention to Detail',
    description: 'From the exact color temperature of lighting cues to the placement of acoustic monitors and curated tablescapes, every detail receives meticulous scrutiny.',
    finish: 'obsidian',
  },
  {
    icon: SlidersHorizontal,
    title: 'Customized Experiences',
    description: 'We reject generic formulas. Every event itinerary, decor schematic, and sensory element is individually designed around your specific vision.',
    finish: 'ivory',
  },
  {
    icon: ShieldCheck,
    title: 'Smooth Event Execution',
    description: 'Unflappable, proactive live supervision behind the scenes, resolving friction before it surfaces so you remain fully present in your celebration.',
    finish: 'emerald',
  },
];

const number = (index) => String(index + 1).padStart(2, '0');

export default function CompleteManagementSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAll, setOpenAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const stageRef = useRef(null);

  const focusPillar = useCallback((index) => {
    setActiveIndex(index);
    setOpenAll(false);
  }, []);

  // Move through the shutters gently, while giving pointer and keyboard
  // visitors control of the panel they are currently reading.
  useEffect(() => {
    if (openAll || isPaused) return undefined;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % pillars.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused, openAll]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName) || event.target?.isContentEditable) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        focusPillar((activeIndex + 1) % pillars.length);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        focusPillar((activeIndex - 1 + pillars.length) % pillars.length);
      }
    };

    stage.addEventListener('keydown', onKeyDown);
    return () => stage.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, focusPillar]);

  return (
    <section className="standard-section louver-section" aria-labelledby="standard-title">
      <div className="louver-section__inner">
        <header className="louver-heading">
          <span className="louver-heading__eyebrow">The Adi Reddy Standard</span>
          <h2 id="standard-title">Six principles. One seamless celebration.</h2>
          <p>Creative direction and considered execution, shaped around your occasion.</p>
        </header>

        <div className="louver-controls">
          <p className="louver-active" aria-live="polite">
            ACTIVE SHUTTER: <span>{openAll ? 'ALL' : number(activeIndex)}</span>
          </p>
          <button
            type="button"
            className={`louver-mode${openAll ? ' is-open' : ''}`}
            onClick={() => setOpenAll((value) => !value)}
            aria-pressed={openAll}
          >
            <span className="louver-mode__dot" aria-hidden="true" />
            {openAll ? 'Sculptural Pleat Mode' : 'Open All Shutters'}
          </button>
        </div>

        <div
          className={`louver-stage${openAll ? ' louver-stage--all-open' : ''}`}
          ref={stageRef}
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
          aria-label="The Adi Reddy Standard. Use arrow keys to move between shutters."
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const active = activeIndex === index;
            return (
              <article
                key={pillar.title}
                className={`louver-blade louver-blade--${pillar.finish}${active ? ' is-active' : ''}${openAll ? ' is-open-all' : ''}`}
                style={{ '--blade-index': index }}
                onClick={() => { if (openAll) focusPillar(index); }}
                onMouseEnter={() => { if (!openAll) setActiveIndex(index); }}
              >
                <button
                  className="louver-blade__trigger"
                  type="button"
                  onFocus={() => { if (!openAll) setActiveIndex(index); }}
                  onClick={() => focusPillar(index)}
                  aria-expanded={openAll || active}
                  aria-label={`${number(index)} ${pillar.title}${active ? ', active shutter' : ''}`}
                >
                  <span className="louver-blade__collapsed" aria-hidden="true">
                    <span className="louver-blade__collapsed-top">
                      <span className="louver-blade__collapsed-number">{number(index)}</span>
                      <span className="louver-blade__icon"><Icon strokeWidth={1.5} /></span>
                    </span>
                    <span className="louver-blade__center-rule" />
                    <span className="louver-blade__collapsed-title">{pillar.title}</span>
                  </span>
                  <span className="louver-blade__mobile-head" aria-hidden="true">
                    <span className="louver-blade__mobile-index">{number(index)}</span>
                    <span className="louver-blade__mobile-title">{pillar.title}</span>
                    <span className="louver-blade__mobile-icon"><Icon strokeWidth={1.5} /></span>
                    <span className="louver-blade__mobile-toggle">{openAll || active ? '−' : '+'}</span>
                  </span>
                </button>

                <div className="louver-blade__content" aria-hidden={!openAll && !active}>
                  <div className="louver-blade__content-top">
                    <span className="louver-blade__number">{number(index)}<i>/</i></span>
                    <span className="louver-blade__icon louver-blade__icon--large"><Icon strokeWidth={1.5} /></span>
                  </div>
                  <div className="louver-blade__copy">
                    <h3>{pillar.title}</h3>
                    <span className="louver-blade__accent" />
                    <p>{pillar.description}</p>
                  </div>
                  <footer className="louver-blade__footer">
                    <span>THE ADI REDDY STANDARD</span>
                    <span className="louver-blade__signature-line" />
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
