import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { NAV_LINKS } from '../utilities/constants';

/**
 * Navbar
 * Forest Green background (#06110C) with editorial typography,
 * smooth transparent-to-solid transition on scroll, active route indicators,
 * and responsive mobile navigation drawer.
 * 
 * Special Behavior:
 * On the landing page ('/'), it stays completely hidden during the first top screen (100vh)
 * so that only the brand image is displayed with zero other elements.
 * It smoothly reveals itself as the user scrolls into the second page and subsequent sections.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisibleOnHome, setIsVisibleOnHome] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for header elevation and landing page visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 25);

      if (isHomePage) {
        // On home page, only show navbar once scrolled past 75% of viewport height (entering second page)
        const threshold = window.innerHeight * 0.75;
        setIsVisibleOnHome(scrollY >= threshold);
      } else {
        setIsVisibleOnHome(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // On landing page, keep navbar visible at all times
  // Scrolled styling activates when scrolled past 25px

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 animate-fadeIn ${
        scrolled
          ? 'bg-forest/95 backdrop-blur-md border-b border-gold/25 py-3.5 shadow-floating'
          : 'bg-forest border-b border-gold/15 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity / Logo */}
          <div className="flex-shrink-0">
            <BrandLogo theme="light" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs lg:text-sm uppercase tracking-[0.18em] font-sans transition-all duration-300 relative py-1.5 ${
                    isActive
                      ? 'text-gold font-medium'
                      : 'text-ivory/80 hover:text-ivory'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-crimson animate-fadeIn" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/gallery-contact"
              className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-sans px-5 py-2.5 bg-crimson text-white hover:bg-crimson-hover transition-all duration-300 group shadow-subtle border border-crimson hover:-translate-y-0.5 active:scale-95"
            >
              <span>Plan Your Event</span>
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ivory hover:text-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gold/20 bg-forest px-4 pt-6 pb-8 shadow-floating animate-fade-down">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.2em] font-sans py-2.5 border-b border-white/5 transition-colors flex items-center justify-between ${
                    isActive ? 'text-gold font-semibold' : 'text-ivory/85 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-crimson"></span>}
                  </>
                )}
              </NavLink>
            ))}

            <div className="pt-4">
              <NavLink
                to="/gallery-contact"
                className="w-full inline-flex items-center justify-center text-xs uppercase tracking-[0.18em] font-sans py-3.5 bg-crimson text-white text-center hover:bg-crimson-hover transition-colors shadow-subtle"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
