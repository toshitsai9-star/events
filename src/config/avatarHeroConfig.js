/**
 * Avatar Hero Configuration
 * All text, branding, assets, colors, and audio captions are configured here.
 */
export const avatarHeroConfig = {
  // Brand Identity
  brand: {
    name: 'ADI REDDY',
    tagline: 'EVENTS AND FACILITATORS',
    initials: 'AR',
  },

  // Main Headline (bottom-left)
  headline: {
    line1: 'Event Architect',
    line2: 'Director.',
    accentDot: true,
  },

  // Ghost Text behind Avatar (giant background parallax text)
  ghostText: 'ADI REDDY',

  // Right-Side Info Rows
  infoRows: [
    { label: 'BASED IN', value: 'Hyderabad, India' },
    { label: 'OPERATIONS', value: 'AP & Telangana • Pan-India' },
    { label: 'AVAILABLE', value: 'Weddings & Sovereign Summits' },
  ],

  // Call-To-Action
  cta: {
    label: "Let's talk",
    href: '/gallery-contact',
  },

  // Navigation Links
  navLinks: [
    { label: 'About', href: '#founder-about-section' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '#work-preview' },
    { label: 'Contact', href: '/gallery-contact' },
  ],

  // Presenter / Talking Avatar Asset Paths
  avatar: {
    // Transparent video sources (User can supply real files into /public/avatar/)
    videoWebm: '/avatar/avatar-talk.webm',
    videoMov: '/avatar/avatar-talk.mov',
    // Fallback video & poster
    fallbackVideo: '/anil-reddy-intro.mp4',
    poster: '/avatar/avatar-poster.png',
    ariaLabel: 'Founder Anil Reddy introducing Adi Reddy Events and Facilitators',
  },

  // ID Badge (Lanyard) Details
  badge: {
    title: 'FOUNDER ID',
    subline: 'Events 2026',
    initials: 'AR',
    photo: '/me.jpg',
    name: 'ANIL REDDY',
    role: 'Founder & Managing Director',
    idNumber: 'ARE-0001',
    lanyardText: 'ADI REDDY EVENTS 2026 ',
  },

  // Captions synced with speech
  captions: [
    { start: 0.0, end: 1.6, text: 'హాయ్ అండి, నా పేరు అనిల్.' },
    { start: 1.6, end: 4.5, text: 'ఫౌండర్ ఆఫ్ ఆది రెడ్డి ఈవెంట్స్ & ఫెసిలిటేటర్స్.' },
    { start: 4.5, end: 7.5, text: 'Welcome to our bespoke event atelier.' },
  ],

  // Design Tokens
  theme: {
    bgCream: '#F2F0E6',
    nearBlack: '#111111',
    indigoAccent: '#3B2F8F',
    burgundy: '#A31C18',
    champagneGold: '#B49A70',
  },
};


