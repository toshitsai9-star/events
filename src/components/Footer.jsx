import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { NAV_LINKS, BRAND } from '../utilities/constants';
import { ArrowUp } from 'lucide-react';

/**
 * Footer
 * Forest Green background (#06110C) with muted gold accents (#B49A70)
 * and refined typographic hierarchy.
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest text-ivory border-t border-gold/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gold/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo theme="light" />
            <p className="text-sm font-sans font-light text-beige/70 max-w-sm leading-relaxed pt-2">
              Bespoke event planning, luxury celebrations, and curated experiences designed with architectural precision and timeless sophistication.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-gold font-sans">
                Excellence in Event Production
              </span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-base tracking-wider text-gold-light uppercase">
              Navigation
            </h3>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-[0.16em]">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory/70 hover:text-gold transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Inquiries */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-serif text-base tracking-wider text-gold-light uppercase">
              Inquiries
            </h3>
            <p className="text-xs font-sans text-beige/70 leading-relaxed">
              Available for bespoke weddings, private galas, corporate summits, and cultural celebrations.
            </p>
            <div className="pt-2">
              <Link
                to="/gallery-contact"
                className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans text-gold hover:text-ivory transition-colors border-b border-gold/40 pb-0.5"
              >
                Start a Conversation &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-beige/50 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-[11px] tracking-widest text-gold/60 uppercase">
              Curated Event Design
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-ivory/70 hover:text-gold transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

