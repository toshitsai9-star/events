import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './utilities/ScrollToTop';
import useScrollReveal from './utilities/useScrollReveal';
import FloatingButtons from './components/floating/FloatingButtons';

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
  // Global scroll reveal observer across all four pages
  useScrollReveal();

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal overflow-x-hidden selection:bg-crimson selection:text-white">
      {/* Persistent Brand Header (Automatically hidden on first top screen of home, reveals on scroll) */}
      <Navbar />

      {/* Dynamic Route Content */}
      <main className="flex-grow">
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

      {/* Phase 7: Floating Action Buttons (WhatsApp, Back-to-Top, Plan Your Event) */}
      <FloatingButtons />
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
