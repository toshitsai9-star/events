import React from 'react';
import './styles/pageTypography.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './utilities/ScrollToTop';
import useScrollReveal from './utilities/useScrollReveal';

// Route Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import GalleryContact from './pages/GalleryContact';

/**
 * AppContent
 * Executes global scroll reveal observations and renders persistent navigation,
 * dynamic route pages, persistent footer, and floating action suite.
 */
function AppContent() {
  const location = useLocation();
  // Global scroll reveal observer across all four pages
  useScrollReveal();
  const pageKey = {
    '/': 'home',
    '/about': 'about',
    '/services': 'services',
    '/our-work': 'portfolio',
    '/gallery-contact': 'contact',
  }[location.pathname] || 'home';

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal overflow-x-clip selection:bg-crimson selection:text-white">
      {/* Global sticky navigation stays available throughout every route and scroll position. */}
      <Navbar />

      {/* Dynamic Route Content */}
      <main key={location.pathname} className={`flex-grow page-route-enter page-route--${pageKey}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-work" element={<Portfolio />} />
          <Route path="/portfolio" element={<Navigate to="/our-work" replace />} />
          <Route path="/gallery-contact" element={<GalleryContact />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Brand Footer at the bottom of the page */}
      <Footer />

    </div>
  );
}

/**
 * ADI REDDY EVENTS - Main Application Root
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
