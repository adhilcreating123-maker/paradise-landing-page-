/**
 * Central motion tokens.
 *
 * CSS mirrors these values as custom properties in app/globals.css so that a
 * single change here stays in sync with the JS-driven effects (count-ups and
 * observer timing). Keep both sides aligned when tuning the feel.
 */
export const motion = {
  duration: {
    fast: 180,
    base: 320,
    slow: 620,
    reveal: 720,
    entrance: 900,
    route: 420,
  },
  easing: {
    standard: 'cubic-bezier(.2, .7, .2, 1)',
    emphasized: 'cubic-bezier(.2, .8, .2, 1)',
  },
  stagger: 90,
  countUp: 1300,
  scrollThreshold: 24,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
