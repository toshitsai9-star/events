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
    {
      q: 'How early should we initiate planning for our event?',
      a: 'For sovereign weddings, arena concerts, and large-scale corporate summits, we recommend reaching out 6 to 9 months in advance to secure preferred venues, top-tier artists, and municipal permissions. For private parties, milestone birthdays, and college festivals, 2 to 4 months allows ample time for custom concept drafting and procurement.',
    },
    {
      q: 'Do you manage events outside of Hyderabad?',
      a: 'Yes. While our primary atelier and production warehouse are based in Hyderabad, we regularly execute destination weddings, multi-city corporate tours, and sovereign retreats across India and select international destinations.',
    },
    {
      q: 'Can Adi Reddy Events work within our specific budget parameters?',
      a: 'We believe in transparent, value-driven budgeting. During our initial discovery consultation, we align on your priorities—whether that is architectural floral staging, celebrity artists, or Michelin-standard catering—and formulate an itemized proposal tailored to your investment.',
    },
    {
      q: 'Do you offer end-to-end management or can we choose specific services?',
      a: 'We specialize in turnkey end-to-end event management because comprehensive control guarantees seamless timing and unified design. However, for corporate organizations or institutional clients with in-house teams, we offer modular production management (stage design, AV/lighting rigging, or artist curation).',
    },
    {
      q: 'How do you handle unexpected weather or technical emergencies?',
      a: 'Every Adi Reddy production includes a rigorous contingency blueprint: secondary diesel generators for zero-downtime power redundancy, weatherproof rigging, on-standby technical crews, and certified fire safety compliance.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-ivory border-b border-gold/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Client Inquiries"
          title="Frequently Addressed Questions"
          description="Everything you need to know about commissioning Adi Reddy Events for your upcoming milestone."
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

