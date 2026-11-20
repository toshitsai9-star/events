import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteWatcher
 * - Automatically scrolls the viewport to top (0,0) on navigation
 * - Dynamically updates document.title and meta descriptions for SEO and browser history consistency
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll restoration
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Dynamic document title & meta management
    const pageMetadata = {
      '/': {
        title: 'ADI REDDY EVENTS | Luxury Event Management Atelier',
        desc: 'Curators of extraordinary celebrations, bespoke weddings, corporate summits, concerts, and cultural festivals.',
      },
      '/about': {
        title: 'About Us | ADI REDDY EVENTS - Our Vision & Philosophy',
        desc: 'Learn about Adi Reddy Events: our creative vision, collaborative approach, multi-category event scope, and quality standards.',
      },
      '/services': {
        title: 'Event Management Services | ADI REDDY EVENTS - All Occasions',
        desc: 'Explore our 9 specialized event management disciplines, turnkey production capabilities, and structured 4-step event planning workflow.',
      },
      '/our-work': {
        title: 'Event Films | ADI REDDY EVENTS - Weddings, Dining & Celebrations',
        desc: 'Watch event films featuring wedding celebrations, traditional dining, and housewarming décor by Adi Reddy Events.',
      },
      '/gallery-contact': {
        title: 'Gallery & Contact | ADI REDDY EVENTS - Event Gallery & Consultations',
        desc: 'Browse event imagery and contact Adi Reddy Events to discuss an upcoming celebration.',
      },
    };

    const current = pageMetadata[pathname] || pageMetadata['/'];
    document.title = current.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', current.desc);
    }
  }, [pathname]);

  return null;
}
