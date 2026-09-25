import { useEffect } from 'react';

/**
 * useScrollReveal: Ultra-performant IntersectionObserver hook that adds '.is-revealed'
 * to elements tagged with '.reveal-init' or '[data-reveal]' when they scroll into viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-init, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed for zero continuous overhead
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    // Initial query
    const attachObserver = () => {
      const elements = document.querySelectorAll('.reveal-init:not(.is-revealed), [data-reveal]:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    };

    attachObserver();

    // Re-check on dynamic updates or route changes
    const timeout = setTimeout(attachObserver, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);
}
