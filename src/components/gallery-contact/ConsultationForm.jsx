import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SectionHeading from '../SectionHeading';
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

/**
 * ConsultationForm
 * Contact Section and Complete Event Enquiry Form for Adi Reddy Events.
 * Section 5 & 6 of Phase 5 & 6:
 * - Two-column layout with authentic atelier contact placeholders and social channels.
 * - Form with 9 validated fields, exact 12 category options, and INR budget brackets.
 * - Explicit frontend demo simulation mode disclosure ensuring compliance with QA guidelines.
 */
export default function ConsultationForm() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Wedding',
    date: '',
    location: '',
    guestCount: '150 – 300 Guests',
    budget: '₹2,50,000 – ₹5,00,000',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map category param from URL query if present (e.g. ?category=corporate)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      const mapping = {
        weddings: 'Wedding',
        birthdays: 'Birthday',
        corporate: 'Corporate Event',
        college: 'College Event',
        cultural: 'Cultural Event',
        concerts: 'Concert',
        private: 'Private Party',
        exhibitions: 'Exhibition',
        custom: 'Other',
      };
      if (mapping[cat.toLowerCase()]) {
        setFormData((prev) => ({ ...prev, category: mapping[cat.toLowerCase()] }));
      }
    }
  }, [location.search]);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide a valid contact number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errors.phone = 'Contact number must contain at least 8 digits.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!formData.date.trim()) errors.date = 'Please specify an expected date or season.';
    if (!formData.location.trim()) errors.location = 'Please indicate preferred city or venue.';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    // Simulate instantaneous client-side processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormErrors({});
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: 'Wedding',
      date: '',
      location: '',
      guestCount: '150 – 300 Guests',
      budget: '₹2,50,000 – ₹5,00,000',
      message: '',
    });
  };

  const categoryOptions = [
    'Wedding',
    'Reception',
    'Engagement',
    'Birthday',
    'Corporate Event',
    'College Event',
    'Cultural Event',
    'Concert',
    'Private Party',
    'Anniversary',
    'Exhibition',
    'Other',
  ];

  const budgetOptions = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000 – ₹10,00,000',
    'Above ₹10,00,000 / Custom Quote',
  ];

  const guestCountOptions = [
    'Under 50 Guests (Intimate)',
    '50 – 150 Guests',
    '150 – 300 Guests',
    '300 – 600 Guests',
    '600 – 1,500 Guests (Grand)',
    '1,500+ Guests (Arena / Festival)',
  ];

  const socialChannels = [
      { name: 'Instagram', icon: Instagram, label: '@adhireddyevents', note: 'Event Highlights' },
    { name: 'Facebook', icon: Facebook, label: 'Adi Reddy Events', note: 'Public Updates' },
    { name: 'LinkedIn', icon: Linkedin, label: 'Adi Reddy Events Atelier', note: 'Corporate Network' },
    { name: 'YouTube', icon: Youtube, label: 'Adi Reddy Productions', note: 'Stage Recaps' },
    { name: 'WhatsApp', icon: MessageCircle, label: '+91 98765 43210', note: 'Direct Messaging' },
  ];

  return (
    <section id="contact-enquiry" className="py-20 md:py-32 bg-ivory border-b border-gold/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Initiate A Consultation"
          title="Let's Create Something Extraordinary Together."
          description="Tell us a little about your event. We'd love to understand your vision and help you plan the experience."
          align="center"
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Introduction, Business Contact Info, Social Media */}
          <div className="lg:col-span-5 space-y-8 bg-beige/40 p-8 sm:p-10 border border-gold/30 shadow-subtle reveal-init">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-2">
                Atelier & Concierge
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
                Direct Contact Channels
              </h3>
              <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-2 font-light">
                Whether you are drafting an early concept or finalizing an upcoming date, our directors provide responsive, attentive guidance.
              </p>
            </div>

            {/* Business Contact Information */}
            <div className="space-y-6 pt-2 text-sm font-sans text-charcoal/85">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ivory border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <strong className="block text-charcoal font-medium text-xs uppercase tracking-wider">
                    Atelier Location (Demo Placeholder)
                  </strong>
                  <span className="text-charcoal/75 text-xs sm:text-sm">
                    Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ivory border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <strong className="block text-charcoal font-medium text-xs uppercase tracking-wider">
                    Inquiry Phone
                  </strong>
                  <a
                    href="tel:+919876543210"
                    className="text-charcoal/75 hover:text-crimson text-xs sm:text-sm font-mono transition-colors block"
                  >
                    +91 98765 43210 (Demo Contact Line)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ivory border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <strong className="block text-charcoal font-medium text-xs uppercase tracking-wider">
                    Direct Email
                  </strong>
                  <a
                    href="mailto:concierge@adhireddyevents.com"
                    className="text-charcoal/75 hover:text-crimson text-xs sm:text-sm font-mono transition-colors block"
                  >
                    concierge@adhireddyevents.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-ivory border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <strong className="block text-charcoal font-medium text-xs uppercase tracking-wider">
                    Consultation Hours
                  </strong>
                  <span className="text-charcoal/75 text-xs sm:text-sm">
                    Monday – Saturday: 10:00 AM – 7:00 PM <br />
                    <span className="text-gold text-xs italic">(Private In-Person Visits by Appointment)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-6 border-t border-gold/20">
              <span className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold block mb-3">
                Official Brand Social Presences
              </span>
              <div className="space-y-2">
                {socialChannels.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-ivory border border-gold/25 text-xs font-sans text-charcoal/80"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                        <span className="font-medium text-charcoal">{s.name}</span>
                      </div>
                      <span className="text-[11px] text-charcoal/60 font-mono truncate max-w-[160px]">
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] font-sans text-charcoal/50 mt-2 italic">
                * Social media channels represent configurable brand presence placeholders for client delivery.
              </p>
            </div>

            {/* Client Reassurance */}
            <div className="p-4 bg-ivory border-l-2 border-forest">
              <p className="font-serif italic text-xs text-charcoal/80 leading-relaxed">
                "From our first discussion to the final cue, every celebration is treated with creative precision, financial transparency, and genuine care."
              </p>
            </div>
          </div>

          {/* Right Column: Professional Event Enquiry Form */}
          <div className="lg:col-span-7 bg-ivory p-8 sm:p-10 border border-gold/30 shadow-card reveal-init reveal-delay-200">
            {submitted ? (
              <div className="text-center py-12 px-4 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-forest text-gold border border-gold/40 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium block mb-2">
                    Enquiry Brief Received
                  </span>
                  <h3 className="font-serif text-3xl text-charcoal">
                    Thank You, {formData.name || 'Valued Client'}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/70 max-w-md mx-auto mt-2 leading-relaxed font-light">
                    This demo confirmation is shown for <strong className="text-charcoal font-medium">{formData.category}</strong>. No enquiry has been sent or stored.
                  </p>
                </div>

                <div className="p-5 bg-beige/40 border border-gold/30 text-left max-w-md mx-auto text-xs font-sans space-y-2.5 text-charcoal/80">
                  <div className="flex justify-between border-b border-gold/15 pb-1.5">
                    <span className="text-charcoal/60">Category:</span>
                    <strong className="text-charcoal">{formData.category}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gold/15 pb-1.5">
                    <span className="text-charcoal/60">Estimated Budget:</span>
                    <strong className="text-charcoal">{formData.budget}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gold/15 pb-1.5">
                    <span className="text-charcoal/60">Guest Scope:</span>
                    <strong className="text-charcoal">{formData.guestCount}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gold/15 pb-1.5">
                    <span className="text-charcoal/60">Target Date:</span>
                    <strong className="text-charcoal">{formData.date}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Location / Venue:</span>
                    <strong className="text-charcoal">{formData.location}</strong>
                  </div>
                </div>

                <div className="p-3.5 bg-forest/5 border border-forest/20 text-center max-w-md mx-auto">
                  <span className="text-[11px] font-sans text-charcoal/70 block">
                    <strong>Demo only:</strong> Submitting this form does not send or store your details. Connect a real enquiry service before accepting customer inquiries.
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center text-xs uppercase tracking-widest font-sans px-6 py-3 bg-forest text-ivory hover:bg-forest-light transition-colors"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans font-medium block">
                      Event Planning Questionnaire
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 bg-beige/80 border border-gold/30 text-charcoal/70">
                      Frontend Demo
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
                    Event Details & Requirements
                  </h3>
                  <p className="text-xs text-charcoal/65 font-sans mt-1">
                    Please provide the preliminary parameters for your celebration so we can tailor our initial proposal.
                  </p>
                </div>

                {/* 1. Full Name & 2. Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Aditi Reddy"
                      className={`w-full px-4 py-3 bg-beige/30 border text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors placeholder:text-charcoal/40 ${
                        formErrors.name ? 'border-crimson' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.name && (
                      <div className="flex items-center space-x-1 text-crimson text-[11px] mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{formErrors.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 bg-beige/30 border text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors placeholder:text-charcoal/40 ${
                        formErrors.phone ? 'border-crimson' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.phone && (
                      <div className="flex items-center space-x-1 text-crimson text-[11px] mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{formErrors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Email Address & 4. Event Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 bg-beige/30 border text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors placeholder:text-charcoal/40 ${
                        formErrors.email ? 'border-crimson' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.email && (
                      <div className="flex items-center space-x-1 text-crimson text-[11px] mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{formErrors.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Event Category *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-beige/30 border border-gold/30 text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors cursor-pointer"
                    >
                      {categoryOptions.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 5. Event Date & 6. Event Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Event Date *
                    </label>
                    <input
                      type="text"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="e.g. 15 December 2026 / Winter 2026"
                      className={`w-full px-4 py-3 bg-beige/30 border text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors placeholder:text-charcoal/40 ${
                        formErrors.date ? 'border-crimson' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.date && (
                      <div className="flex items-center space-x-1 text-crimson text-[11px] mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{formErrors.date}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Event Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Hyderabad / Jubilee Hills / Destination"
                      className={`w-full px-4 py-3 bg-beige/30 border text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors placeholder:text-charcoal/40 ${
                        formErrors.location ? 'border-crimson' : 'border-gold/30'
                      }`}
                    />
                    {formErrors.location && (
                      <div className="flex items-center space-x-1 text-crimson text-[11px] mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{formErrors.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 7. Expected Number of Guests & 8. Estimated Budget (INR) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Expected Number of Guests *
                    </label>
                    <select
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-beige/30 border border-gold/30 text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors cursor-pointer"
                    >
                      {guestCountOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                      Estimated Budget (INR) *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-beige/30 border border-gold/30 text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors cursor-pointer"
                    >
                      {budgetOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 9. Additional Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal/80 font-sans font-medium mb-1.5">
                    Additional Message & Special Requirements
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the desired mood, stage requirements, venue preferences, or any specific ideas you have in mind..."
                    className="w-full px-4 py-3 bg-beige/30 border border-gold/30 text-charcoal text-sm font-sans focus:outline-none focus:border-gold focus:bg-ivory transition-colors placeholder:text-charcoal/40 resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.18em] py-4 bg-crimson text-white hover:bg-crimson-hover transition-colors shadow-subtle border border-crimson disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="mr-2 w-4 h-4" />
                    <span>{isSubmitting ? 'Validating Brief...' : 'Submit Event Enquiry'}</span>
                  </button>
                  <p className="text-[11px] font-sans text-charcoal/50 text-center mt-2.5">
                    Demo only: validation and confirmation run in this browser; no enquiry is delivered.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
