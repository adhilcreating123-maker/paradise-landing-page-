'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Thin gold line pinned to the very top, scaled by total page progress. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      invalidateOnRefresh: true,
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    });
    gsap.set(bar, { scaleX: trigger.progress });

    return () => {
      trigger.kill();
      gsap.set(bar, { clearProps: 'transform' });
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[#C9A34E] shadow-[0_0_10px_rgba(201,163,78,0.55)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
