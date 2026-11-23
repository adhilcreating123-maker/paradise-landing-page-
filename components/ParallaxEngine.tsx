'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { initParallax } from '../lib/parallax';

/**
 * Scans the document for plain HTML `data-parallax` layers and drives them
 * with the single Lenis instance provided by SmoothScroll. It renders nothing;
 * ParallaxLayer components register their own scoped contexts and are skipped
 * by the document-level selector.
 */
export default function ParallaxEngine() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    return initParallax(document, { lenis });
  }, [lenis, pathname]);

  return null;
}
