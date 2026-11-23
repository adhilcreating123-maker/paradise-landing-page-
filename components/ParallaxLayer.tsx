'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import {
  initParallax,
  type ParallaxAxis,
  type ParallaxDepth,
  type ParallaxFade,
} from '../lib/parallax';

export interface ParallaxLayerProps {
  children?: ReactNode;
  /** -0.5 → 0.5. Negative values drift the opposite way. */
  speed?: number;
  depth?: ParallaxDepth;
  axis?: ParallaxAxis;
  scale?: number;
  rotate?: number;
  fade?: ParallaxFade;
  /** Starting inset percentage for a scrubbed clip reveal (e.g. 8). */
  clip?: number;
  className?: string;
}

/**
 * Declarative wrapper around the shared parallax engine. It renders plain
 * data-* attributes (so the same markup works without React) and owns its own
 * GSAP context, which is reverted whenever the layer unmounts or its props
 * change. The global ParallaxEngine skips layers marked data-parallax-managed.
 */
export default function ParallaxLayer({
  children,
  speed,
  depth,
  axis,
  scale,
  rotate,
  fade,
  clip,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return initParallax(element, {
      lenis,
      includeRoot: true,
      selector: '[data-parallax]',
    });
  }, [lenis, speed, depth, axis, scale, rotate, fade, clip]);

  return (
    <div
      ref={ref}
      data-parallax-layer=""
      data-parallax-managed=""
      data-parallax={speed ?? ''}
      data-depth={depth}
      data-axis={axis}
      data-scale={scale}
      data-rotate={rotate}
      data-fade={typeof fade === 'boolean' ? (fade ? '' : undefined) : fade}
      data-parallax-clip={clip}
      className={className}
    >
      {children}
    </div>
  );
}
