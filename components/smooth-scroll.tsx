'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, type ReactNode } from 'react';

/**
 * Lenis owns same-page hash scrolling so we can subtract the live sticky
 * header height instead of relying on a fixed CSS scroll-padding value.
 * Other anchors (different route, external links) keep their normal behaviour.
 */
function AnchorLinks() {
  const lenis = useLenis();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-lenis-anchors', '');

    if (!lenis) {
      return () => root.removeAttribute('data-lenis-anchors');
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const node = event.target;
      if (!(node instanceof Element)) return;

      const link = node.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      ) {
        return;
      }

      const id = decodeURIComponent(url.hash.slice(1));
      const destination = id ? document.getElementById(id) : null;
      if (!destination) return;

      event.preventDefault();
      const header = document.querySelector<HTMLElement>('[data-sticky-header]');
      lenis.scrollTo(destination, { offset: -(header?.offsetHeight ?? 0) });
      window.history.pushState(null, '', url.hash);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      root.removeAttribute('data-lenis-anchors');
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    // Lenis keeps its existing options; only the RAF loop moves to GSAP's
    // ticker so ScrollTrigger and scrolling stay perfectly in sync.
    <ReactLenis root options={{ autoRaf: false, anchors: false, lerp: 0.1 }}>
      <AnchorLinks />
      {children}
    </ReactLenis>
  );
}
