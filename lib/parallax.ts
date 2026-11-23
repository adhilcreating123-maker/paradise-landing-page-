'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import {
  MAX_LAYERS,
  MOBILE_STRENGTH,
  PARALLAX_ENABLED,
  PARALLAX_STRENGTH,
  PARALLAX_TRAVEL,
  SCRUB,
} from './parallax-config';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ParallaxDepth = 'bg' | 'mid' | 'fg';
export type ParallaxAxis = 'y' | 'x';
export type ParallaxFade = number | boolean;

export interface ParallaxOptions {
  /** -0.5 → 0.5. Positive drifts against scroll, negative reverses it. */
  speed?: number;
  depth?: ParallaxDepth;
  axis?: ParallaxAxis;
  /** End scale; starts at 1. Background preset uses 1.1. */
  scale?: number;
  /** Total rotation across the section, in degrees. */
  rotate?: number;
  /** 0–1 fades out; -1–0 fades in. `true` is a 0.5 fade-out. */
  fade?: ParallaxFade;
}

export interface InitParallaxOptions {
  /** The app's existing Lenis instance. Do not create another one. */
  lenis?: Lenis | null;
  /** Elements to scan. Managed ParallaxLayer elements are excluded by default. */
  selector?: string;
  /** Also treat `root` itself as a candidate (used by ParallaxLayer). */
  includeRoot?: boolean;
}

interface DepthPreset {
  speed: number;
  scale: number;
  rotate: number;
  blur: number;
}

interface NormalizedLayer {
  speed: number;
  depth: ParallaxDepth;
  axis: ParallaxAxis;
  scale: number;
  rotate: number;
  fade: number;
  blur: number;
  clip: number;
}

const DEPTH_PRESETS: Record<ParallaxDepth, DepthPreset> = {
  bg: { speed: 0.15, scale: 1.1, rotate: 0, blur: 1.5 },
  mid: { speed: 0.3, scale: 1, rotate: 0, blur: 0 },
  fg: { speed: 0.5, scale: 1, rotate: 2.6, blur: 0 },
};

const DEFAULT_SELECTOR = ':is([data-parallax], [data-parallax-depth]):not([data-parallax-managed])';

/*
 * One shared Lenis → ScrollTrigger bridge. ParallaxEngine and each
 * ParallaxLayer call initParallax, so the bridge is reference counted instead
 * of adding duplicate ticker callbacks or scroll listeners.
 */
let bridgeCount = 0;
let unsubscribeScroll: (() => void) | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let refreshTimer = 0;

/** Shared debounce so many layers never trigger a refresh storm. */
function scheduleRefresh(): void {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
}

function connectLenis(lenis: Lenis | null | undefined): () => void {
  if (!lenis || typeof window === 'undefined') return () => {};

  if (bridgeCount === 0) {
    const onScroll = () => ScrollTrigger.update();
    unsubscribeScroll = lenis.on('scroll', onScroll);

    // GSAP's ticker is now the only animation loop for Lenis. SmoothScroll
    // mounts ReactLenis with autoRaf: false so we never run two RAF loops.
    tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
  }

  bridgeCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    bridgeCount = Math.max(0, bridgeCount - 1);

    if (bridgeCount === 0) {
      unsubscribeScroll?.();
      unsubscribeScroll = null;
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
      // Restore GSAP's default once nobody needs frame-accurate scrolling.
      gsap.ticker.lagSmoothing(500, 33);
    }
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function finite(value: string | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readDepth(value: string | undefined): ParallaxDepth {
  return value === 'bg' || value === 'mid' || value === 'fg' ? value : 'mid';
}

function normalizeLayer(element: HTMLElement): NormalizedLayer {
  const data = element.dataset;
  // `data-parallax-depth` / `data-parallax-rot` are kept as aliases for the
  // older engine's markup, but the documented attributes are data-depth etc.
  const depth = readDepth(data.depth ?? data.parallaxDepth);
  const preset = DEPTH_PRESETS[depth];

  // Older sections encode speed in data-parallax-depth (e.g. "-0.25").
  const legacySpeed =
    data.parallaxDepth !== undefined &&
    data.parallaxDepth !== '' &&
    Number.isFinite(Number(data.parallaxDepth))
      ? data.parallaxDepth
      : undefined;
  const speed = clamp(
    finite(data.parallax ?? data.parallaxSpeed ?? legacySpeed, preset.speed),
    -0.5,
    0.5,
  );
  const axis: ParallaxAxis = data.axis === 'x' ? 'x' : 'y';
  const scale = finite(data.scale ?? data.parallaxScale, preset.scale);
  // Decorative foreground layers get the preset's extra rotation; content
  // layers stay upright unless `data-rotate` / the rotate prop asks for it.
  const isDecoration =
    element.hasAttribute('data-parallax-decor') ||
    data.layer === 'foreground' ||
    (element.getAttribute('class') ?? '').includes('decor');
  const rotate = finite(data.rotate ?? data.parallaxRot, isDecoration ? preset.rotate : 0);

  let fade = 0;
  const fadeValue = data.fade ?? data.parallaxFade;
  if (fadeValue !== undefined) {
    fade = clamp(fadeValue === '' ? 0.5 : finite(fadeValue, 0.5), -1, 1);
  }

  return {
    speed,
    depth,
    axis,
    scale,
    rotate,
    fade,
    blur: depth === 'bg' ? preset.blur : 0,
    clip: clamp(finite(data.clip ?? data.parallaxClip, 0), 0, 50),
  };
}

function collectLayers(root: ParentNode, selector: string, includeRoot: boolean): HTMLElement[] {
  const layers: HTMLElement[] = [];

  if (includeRoot && typeof Element !== 'undefined' && root instanceof Element && root.matches(selector)) {
    layers.push(root as HTMLElement);
  }

  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (!layers.includes(element)) layers.push(element);
  });

  return layers;
}

function sectionFor(layer: HTMLElement): HTMLElement {
  return layer.closest<HTMLElement>('section, footer, [data-parallax-section]') ?? document.body;
}

function groupBySection(layers: HTMLElement[]): Map<HTMLElement, HTMLElement[]> {
  const groups = new Map<HTMLElement, HTMLElement[]>();
  layers.forEach((layer) => {
    const section = sectionFor(layer);
    const group = groups.get(section) ?? [];
    group.push(layer);
    groups.set(section, group);
  });
  return groups;
}

/** Lower numbers survive the per-section layer cap first. */
function layerPriority(layer: HTMLElement): number {
  const explicit = Number(layer.dataset.parallaxPriority);
  if (Number.isFinite(explicit)) return explicit;

  const role = layer.dataset.layer;
  if (role === 'midground') return 0;
  if (role === 'foreground' || role === 'decor') return 3;
  if (role === 'background') return 4;
  return layer.hasAttribute('data-parallax-decor') ? 3 : 1;
}

function capLayers(layers: HTMLElement[], mobile: boolean): HTMLElement[] {
  const available = mobile
    ? layers.filter(
        (layer) =>
          !layer.hasAttribute('data-parallax-mobile-hide') &&
          normalizeLayer(layer).depth !== 'bg',
      )
    : layers;

  return [...available]
    .sort((a, b) => layerPriority(a) - layerPriority(b))
    .slice(0, mobile ? MAX_LAYERS.mobile : MAX_LAYERS.desktop);
}

function animateLayer(layer: HTMLElement, section: HTMLElement, mobile: boolean): void {
  // Marks the layers actually driven this pass (handy for QA/debugging).
  layer.dataset.parallaxActive = '';
  const config = normalizeLayer(layer);
  const travel =
    PARALLAX_TRAVEL * PARALLAX_STRENGTH * (mobile ? MOBILE_STRENGTH : 1);
  const distance = travel * config.speed;
  const translateVar = config.axis === 'x' ? '--pb-parallax-x' : '--pb-parallax-y';
  const rotation = mobile ? 0 : config.rotate;

  // CSS custom properties keep parallax on the individual transform properties
  // (`translate` / `scale` / `rotate`) so reveal and hover `transform` rules on
  // the same element keep working instead of being overwritten by GSAP.
  const from: gsap.TweenVars = {
    [translateVar]: `${distance / 2}px`,
    '--pb-parallax-scale': 1,
    ease: 'none',
  };
  const to: gsap.TweenVars = {
    [translateVar]: `${-distance / 2}px`,
    '--pb-parallax-scale': config.scale,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: SCRUB,
      invalidateOnRefresh: true,
    },
  };

  if (rotation !== 0) {
    from['--pb-parallax-rotate'] = `${-rotation / 2}deg`;
    to['--pb-parallax-rotate'] = `${rotation / 2}deg`;
  }

  if (config.fade !== 0) {
    // Positive fades out across the section; negative fades in.
    from['--pb-parallax-opacity'] = config.fade > 0 ? 1 : 1 + config.fade;
    to['--pb-parallax-opacity'] = config.fade > 0 ? 1 - config.fade : 1;
  }

  if (config.clip > 0 && !mobile) {
    from['--pb-parallax-clip'] = `${config.clip}%`;
    to['--pb-parallax-clip'] = '0%';
  }

  // Do not flatten an existing CSS/Tailwind blur (hero glows already have one).
  const hasExistingFilter = window.getComputedStyle(layer).filter !== 'none';
  if (!mobile && config.blur > 0 && !hasExistingFilter) {
    from.filter = 'blur(0px)';
    to.filter = `blur(${config.blur}px)`;
  }

  gsap.fromTo(layer, from, to);
}

function watchLayout(root: ParentNode, sections: HTMLElement[]): () => void {
  const images = Array.from(root.querySelectorAll('img'));
  images.forEach((image) => {
    if (!image.complete) {
      image.addEventListener('load', scheduleRefresh, { once: true });
      image.addEventListener('error', scheduleRefresh, { once: true });
    }
  });

  window.addEventListener('resize', scheduleRefresh, { passive: true });
  const resizeObserver =
    typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleRefresh) : null;
  sections.forEach((section) => resizeObserver?.observe(section));

  // Fonts and images can settle after the first effect pass.
  requestAnimationFrame(scheduleRefresh);

  return () => {
    window.removeEventListener('resize', scheduleRefresh);
    resizeObserver?.disconnect();
    images.forEach((image) => {
      image.removeEventListener('load', scheduleRefresh);
      image.removeEventListener('error', scheduleRefresh);
    });
  };
}

/**
 * Wire the shared Lenis instance and create scrubbed parallax timelines for
 * every matching element under `root`. Returns a cleanup that reverts the
 * GSAP context, matchMedia queries, listeners and the Lenis bridge.
 */
export function initParallax(
  root: ParentNode = document,
  options: InitParallaxOptions = {},
): () => void {
  if (typeof window === 'undefined') return () => {};

  // Keep the Lenis bridge alive even when parallax is switched off, otherwise
  // autoRaf:false would leave the page with no scroll loop.
  const disconnectLenis = connectLenis(options.lenis);
  const documentRoot = document.documentElement;
  const parallaxOff = !PARALLAX_ENABLED || PARALLAX_STRENGTH === 0;
  documentRoot.toggleAttribute('data-parallax-off', parallaxOff);
  if (parallaxOff) {
    return () => {
      documentRoot.removeAttribute('data-parallax-off');
      disconnectLenis();
    };
  }

  const selector = options.selector ?? DEFAULT_SELECTOR;
  const layers = collectLayers(root, selector, options.includeRoot ?? false);
  const scope = typeof Element !== 'undefined' && root instanceof Element ? root : document.body;

  let media: gsap.MatchMedia | undefined;

  const ctx = gsap.context(() => {
    media = gsap.matchMedia();

    media.add(
      {
        desktop: '(min-width: 1024px)',
        mobile: '(max-width: 1023px)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const conditions = context.conditions ?? {};
        // Reduced motion: no transforms, rotation, blur or scrub at all.
        if (conditions.reduced) return;

        const mobile = Boolean(conditions.mobile);
        const groups = groupBySection(layers);
        const sections: HTMLElement[] = [];

        groups.forEach((sectionLayers, section) => {
          sections.push(section);

          // Keep the important content layers first, then decorative accents.
          const activeLayers = capLayers(sectionLayers, mobile);
          activeLayers.forEach((layer) => animateLayer(layer, section, mobile));
        });

        return watchLayout(root, sections);
      },
    );
  }, scope);

  return () => {
    ctx.revert();
    media?.revert();
    root
      .querySelectorAll<HTMLElement>('[data-parallax-active]')
      .forEach((layer) => delete layer.dataset.parallaxActive);
    documentRoot.removeAttribute('data-parallax-off');
    disconnectLenis();
  };
}
