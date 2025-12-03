import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      const makeAllVisible = () => {
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          el.classList.add('is-visible');
        });
      };
      makeAllVisible();
      return;
    }

    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Function to observe all animate-on-scroll elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll:not([data-scroll-observed])');
      elements.forEach((el) => {
        el.setAttribute('data-scroll-observed', 'true');
        observerRef.current?.observe(el);
      });
    };

    // Initial observation
    observeElements();

    // MutationObserver to catch lazy-loaded components
    mutationObserverRef.current = new MutationObserver((mutations) => {
      let hasNewElements = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              if (node.classList?.contains('animate-on-scroll') || 
                  node.querySelector?.('.animate-on-scroll')) {
                hasNewElements = true;
              }
            }
          });
        }
      });
      if (hasNewElements) {
        observeElements();
      }
    });

    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
    };
  }, []);

  return null;
}
