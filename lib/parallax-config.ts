/**
 * Parallax tuning lives here so the whole site can be dialled down (or off)
 * from one place. `PARALLAX_STRENGTH = 0` disables scroll motion while keeping
 * Lenis smooth scrolling alive; `MOBILE_STRENGTH` scales only small screens.
 */
export const PARALLAX_ENABLED = true;
export const PARALLAX_STRENGTH: number = 1;
export const MOBILE_STRENGTH: number = 0.5;
export const SCRUB: number = 0.8;

/** Shared travel budget in pixels before strength multipliers are applied. */
export const PARALLAX_TRAVEL: number = 360;

/** Per section caps. Decorative layers are dropped first when a section is busy. */
export const MAX_LAYERS = {
  desktop: 6,
  mobile: 3,
} as const;

export const SECTION_SPEEDS = {
  hero: { bg: 0.12, mid: -0.15, fg: 0.5 },
  branches: { bg: 0.1, mid: 0.12, fg: 0.35 },
  story: { bg: 0.1, mid: 0.065, fg: 0.4 },
  cakeworld: { bg: 0.1, mid: 0.07, fg: 0.45 },
  life: { bg: 0.1, mid: 0.05, fg: 0.4 },
  findus: { bg: 0.1, mid: 0.08, fg: 0.35 },
  reviews: { bg: 0.1, mid: 0.05, fg: 0.4 },
  cta: { bg: 0.08, mid: 0.05, fg: 0.3 },
  footer: { bg: 0.08, mid: 0.05, fg: 0.3 },
} as const;

export type ParallaxSection = keyof typeof SECTION_SPEEDS;
export type ParallaxRole = keyof typeof SECTION_SPEEDS.hero;

/** Returns a configured speed, falling back to the provided value. */
export function sectionSpeed(
  section: ParallaxSection | undefined,
  role: ParallaxRole,
  fallback: number,
): number {
  return section ? SECTION_SPEEDS[section][role] : fallback;
}
