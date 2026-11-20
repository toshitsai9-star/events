import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowRight, Calendar, MessageCircle, Sparkles, X } from 'lucide-react';

/**
 * FloatingButtons
 * Premium suite of floating action controls across all pages:
 * 1. Floating WhatsApp Contact Button (Bottom-Right)
 * 2. Floating Back-to-Top Button (Stacked above WhatsApp, reveals after 380px scroll)
 * 3. Floating "Plan Your Event" Enquiry CTA Pill (Bottom-Left, deep-links to enquiry form)
 *
 * Designed with safe margins, zero overlap, touch accessibility, and reduced-motion awareness.
 */
export default function FloatingButtons() {
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Configurable WhatsApp Contact
  const WHATSAPP_PHONE = '919876543210'; // Client phone configuration
  const PREFILLED_MESSAGE = encodeURIComponent(
    'Hello Adi Reddy Events! I would like to enquire about organising an event.'
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${PREFILLED_MESSAGE}`;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY(currentY);
          setShowBackToTop(currentY > 380);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showConsultationModal) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setShowConsultationModal(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [showConsultationModal]);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle "Plan Your Event" CTA
  const handleEnquiryClick = () => {
    setShowConsultationModal(false);
    if (location.pathname === '/gallery-contact') {
      const el = document.getElementById('contact-enquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/gallery-contact');
      setTimeout(() => {
        const el = document.getElementById('contact-enquiry');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // On home page, hide floating elements on the initial 100vh hero screen
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isPastHero = !isHomePage || scrollY > windowHeight * 0.7;

  return (
    <>
      {/* ==================================================
          1. FLOATING "PLAN YOUR EVENT" ENQUIRY PILL (BOTTOM-LEFT)
          ================================================== */}
      <div
        className={`fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 transition-all duration-500 ease-out ${
          isPastHero
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setShowConsultationModal(true)}
          className="group flex items-center space-x-2.5 px-4 sm:px-5 py-3 rounded-full bg-crimson text-white hover:bg-crimson-hover border border-crimson/80 shadow-floating hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Plan your event - Go to inquiry form"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Calendar className="w-3 h-3 text-ivory transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="font-sans text-xs uppercase tracking-[0.18em] font-medium text-ivory whitespace-nowrap">
            Plan Your Event
          </span>
          <Sparkles className="w-3 h-3 text-gold-light opacity-80 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>

      {showConsultationModal && (
        <div
          className="consultation-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowConsultationModal(false);
          }}
        >
          <section
            className="consultation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
          >
            <button
              type="button"
              className="consultation-modal__close"
              onClick={() => setShowConsultationModal(false)}
              aria-label="Close consultation dialog"
              autoFocus
            >
              <X className="w-5 h-5" />
            </button>
            <span className="consultation-modal__eyebrow">The Adi Reddy Standard</span>
            <h2 id="consultation-modal-title">Let’s shape your occasion.</h2>
            <p>
              Share your first ideas with our team and we’ll help you plan the details,
              atmosphere, and experience around your event.
            </p>
            <button
              type="button"
              className="consultation-modal__action"
              onClick={handleEnquiryClick}
            >
              Continue to event brief <ArrowRight className="w-4 h-4" />
            </button>
            <span className="consultation-modal__note">A considered first step, at your pace.</span>
          </section>
        </div>
      )}

      {/* ==================================================
          2 & 3. FLOATING RIGHT COLUMN (BACK-TO-TOP & WHATSAPP)
          Positioned bottom-right with non-overlapping vertical flex stack
          ================================================== */}
      <aside
        aria-label="Quick Actions"
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-3 transition-all duration-500 ease-out ${
          isPastHero
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Floating Back to Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-forest text-ivory border border-gold/40 shadow-floating flex items-center justify-center transition-all duration-300 hover:bg-forest-light hover:border-gold hover:text-gold hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            showBackToTop
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>

        {/* Floating WhatsApp Action Button */}
        <div className="relative flex items-center">
          {/* Tooltip on Hover / Focus */}
          <div
            className={`hidden sm:flex items-center px-3 py-1.5 mr-3 bg-forest text-ivory border border-gold/30 rounded-md shadow-card text-[11px] font-sans uppercase tracking-wider whitespace-nowrap transition-all duration-300 pointer-events-none ${
              showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            <span>Chat with us</span>
            <div className="w-1.5 h-1.5 bg-forest border-r border-b border-gold/30 rotate-[-45deg] -mr-1.5 ml-1" />
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-forest text-white border-2 border-gold/40 shadow-floating flex items-center justify-center transition-all duration-300 hover:scale-108 hover:border-gold hover:shadow-card active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold group"
            aria-label="Chat with Adi Reddy Events on WhatsApp"
          >
            {/* Ambient subtle glow ring */}
            <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-25 pointer-events-none" />

            {/* Official WhatsApp Monogram SVG Icon */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 fill-white transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.954.558 3.782 1.528 5.337L2 22l4.793-1.488a9.98 9.98 0 005.238 1.489h.005c5.534 0 10.03-4.496 10.03-10.031C22.066 6.496 17.565 2 12.031 2zm0 18.36a8.31 8.31 0 01-4.234-1.154l-.304-.18-3.14.975.992-3.057-.198-.316a8.307 8.307 0 01-1.275-4.597c0-4.59 3.737-8.327 8.328-8.327 4.59 0 8.327 3.737 8.327 8.327 0 4.59-3.737 8.329-8.328 8.329zm4.562-6.234c-.25-.125-1.478-.73-1.708-.813-.23-.083-.396-.125-.563.125-.166.25-.646.813-.792.98-.146.166-.292.187-.542.062s-1.056-.39-2.012-1.242c-.744-.664-1.247-1.484-1.393-1.734-.146-.25-.016-.385.11-.51.112-.112.25-.292.375-.437.125-.146.166-.25.25-.417.083-.166.042-.312-.02-.437s-.563-1.354-.771-1.854c-.203-.487-.41-.421-.563-.429l-.479-.008c-.166 0-.437.062-.667.312s-.875.854-.875 2.083c0 1.229.896 2.417 1.021 2.583.125.166 1.764 2.694 4.274 3.778.597.258 1.064.412 1.428.528.6.191 1.147.164 1.579.099.481-.072 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.166-.48-.291z" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}

