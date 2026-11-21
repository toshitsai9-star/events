import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ChevronRight, Sparkles } from 'lucide-react';

export default function GalleryContactHero() {
  const scrollToForm = (event) => {
    event.preventDefault();
    document.getElementById('contact-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="gc-hero relative overflow-hidden border-b border-gold/20 bg-ivory">
      <div className="gc-hero__grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <nav className="gc-hero__breadcrumb mb-10 flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/">Home</Link><ChevronRight aria-hidden="true" /><span>Contact</span>
        </nav>
        <div className="gc-hero__content max-w-5xl">
          <span className="gc-hero__eyebrow"><Sparkles aria-hidden="true" /> Private event inquiries</span>
          <h1>Let's plan a day <em>worth remembering.</em></h1>
          <p>Tell us what you're celebrating, and our team will help shape the details into an experience that feels entirely yours.</p>
          <a className="gc-hero__action" href="#contact-enquiry" onClick={scrollToForm}>
            Start your inquiry <ArrowDownRight aria-hidden="true" />
          </a>
          <div className="gc-hero__notes">
            <span><b>01</b> Thoughtful planning</span>
            <i aria-hidden="true" />
            <span><b>02</b> Personal response</span>
          </div>
        </div>
      </div>
    </section>
  );
}

