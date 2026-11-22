import React, { useState } from 'react';
import SectionHeading from '../SectionHeading';
import { ChevronDown } from 'lucide-react';

/**
 * ServicesFAQ
 * Answers common prospective client questions regarding event scope, booking, and logistics.
 */
export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How far ahead should I book?", a: "For large weddings and productions, 6–9 months is ideal. Smaller celebrations can often be planned in 2–4 months." },
    { q: "Do you work outside Hyderabad?", a: "Yes. We produce events across India and can discuss destination events during your consultation." },
    { q: "Can you work within my budget?", a: "Yes. We shape the event plan around your priorities and share an itemized proposal before booking." },
  ];

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Client Inquiries"
          title="Frequently Addressed Questions"
          description="A few quick answers before you get in touch."
          align="center"
          className="mb-14"
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`reveal-init delay-${idx * 80} border border-gold/30 bg-beige/30 transition-all duration-300`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-charcoal">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-none border border-gold/40 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-forest text-ivory border-forest' : 'text-gold'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base font-sans font-light text-charcoal/75 leading-relaxed border-t border-gold/15">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

