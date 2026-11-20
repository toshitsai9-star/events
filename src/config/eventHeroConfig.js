/**
 * Event Hero Configuration
 * All copy, branding, dates, asset paths, colors, and captions are configured here.
 */
export const eventHeroConfig = {
  // Optional Entry Gate Configuration (disabled so visitors land directly on the landing page)
  entryGate: {
    enabled: false,
  },

  // Event Branding
  event: {
    name: 'ADI REDDY',
    fullName: 'ADI REDDY EVENTS & SUMMIT',
    taglineLine1: 'Where Ideas',
    taglineLine2: 'Become Reality.',
    accentDot: true,
    year: '2026',
    city: 'Hyderabad',
    logoInitials: 'AR',
  },

  // Giant Ghost Text behind avatar (6-8% opacity, cropped by viewport edges)
  ghostText: 'ADI REDDY',

  // Event Date (ISO string for the live countdown timer)
  // Set to an upcoming date (e.g. 45 days from today)
  eventDate: '2026-12-18T09:00:00+05:30',

  // Top Translucent Navbar
  nav: {
    links: [
      { label: 'About', href: '#intro-section' },
      { label: 'Schedule', href: '#schedule-section' },
      { label: 'Speakers', href: '#speakers-section' },
      { label: 'Tickets', href: '/gallery-contact' },
    ],
  },

  // Right-Side Info Rows
  infoRows: [
    { label: 'DATE', value: 'DECEMBER 18–20, 2026' },
    { label: 'VENUE', value: 'HICC GRAND ARENA, HYDERABAD' },
    { label: 'SEATS LEFT', value: '42 / 500 PASSES REMAINING' },
  ],

  // Call-To-Action Pill Button
  cta: {
    label: 'Register Now',
    href: '/gallery-contact',
  },

  // Talking Avatar (Event Host) Assets
  avatar: {
    videoWebm: '/avatar/host-talk.webm',
    videoMov: '/avatar/host-talk.mov',
    poster: '/avatar/host-poster.png',
    ariaLabel: 'Event host welcoming visitors to the Adi Reddy Event and Summit',
  },

  // Speech Welcome Captions (Timestamped Subtitles)
  captions: [
    { start: 0.0, end: 2.2, text: 'Welcome to the Adi Reddy Event & Summit 2026.' },
    { start: 2.2, end: 4.8, text: 'Three days of visionary keynote summits and experiential celebrations.' },
    { start: 4.8, end: 7.5, text: 'Claim your personalized event pass below and join us in Hyderabad.' },
  ],

  // Hanging Lanyard Event Pass Details
  pass: {
    title: 'EVENT PASS',
    subline: 'ADI REDDY SUMMIT · 2026',
    defaultAttendeeName: 'GUEST DELEGATE',
    ticketType: 'VIP ALL-ACCESS',
    passNumber: '#AR-2026-084',
    photo: '/me.jpg', // Placeholder attendee photo
    lanyardText: 'ADI REDDY • 2026 • HYDERABAD • SUMMIT • ',
    qrTarget: '/gallery-contact',
  },

  // Theme Colors (Fully customizable)
  colors: {
    bgCream: '#F2F0E6',
    nearBlack: '#111111',
    indigoAccent: '#3B2F8F',
    champagneGold: '#B49A70',
    white: '#FFFFFF',
  },
};

