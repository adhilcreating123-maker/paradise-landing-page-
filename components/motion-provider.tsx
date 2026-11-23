'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { motion, prefersReducedMotion } from '../lib/motion';

const REVEAL_SELECTOR = '[data-reveal], [data-reveal-group], [data-countup]';

/**
 * One client component owns every scroll-driven effect on the site:
 *  - a single IntersectionObserver for reveal groups and count-up values
 *  - a second observer for the in-page navigation scrollspy
 *  - one passive, rAF-throttled scroll listener for the sticky header and the
 *    two decorative hero glows (subtle parallax)
 *
 * It renders nothing, resets on route changes, and disconnects everything on
 * cleanup. When JavaScript or motion is unavailable, the CSS reveals are
 * never armed, so all content stays visible.
 */
export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();
    root.setAttribute('data-motion-ready', '');

    /* ---------------- count-up values ---------------- */
    const frames = new Map<HTMLElement, number>();
    const revealTimers = new Set<number>();

    // Once a reveal has finished, drop its attributes so the element falls
    // back to its own hover/transition CSS instead of the slower reveal one.
    const settleReveal = (el: HTMLElement) => {
      if (!el.hasAttribute('data-reveal') && !el.hasAttribute('data-reveal-group')) return;
      const count = el.hasAttribute('data-reveal-group') ? el.children.length : 1;
      const timer = window.setTimeout(() => {
        revealTimers.delete(timer);
        el.removeAttribute('data-reveal');
        el.removeAttribute('data-reveal-group');
        el.classList.remove('is-visible');
      }, motion.duration.reveal + count * motion.stagger + 160);
      revealTimers.add(timer);
    };

    const cancelCount = (el: HTMLElement) => {
      const frame = frames.get(el);
      if (frame !== undefined) cancelAnimationFrame(frame);
      frames.delete(el);
    };

    const countUp = (el: HTMLElement) => {
      if (reduced || el.dataset.counted === 'true') return;
      const raw = el.dataset.countValue ?? el.textContent?.trim() ?? '';
      const match = raw.match(/^(\d[\d,]*\.?\d*)([\s\S]*)$/);
      if (!match) return;

      el.dataset.countValue = raw;
      el.dataset.counted = 'true';

      const numberText = match[1];
      const suffix = match[2];
      const target = Number.parseFloat(numberText.replace(/,/g, ''));
      if (!Number.isFinite(target)) return;

      const decimals = (numberText.split('.')[1] ?? '').length;
      const grouped = numberText.includes(',');
      const format = (value: number) => {
        const fixed = value.toFixed(decimals);
        const numeric = grouped
          ? Number(fixed).toLocaleString('en-IN', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : fixed;
        return numeric + suffix;
      };

      const started = performance.now();
      el.textContent = format(0);

      const tick = (now: number) => {
        const progress = Math.min((now - started) / motion.countUp, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(target * eased);
        if (progress < 1) {
          frames.set(el, requestAnimationFrame(tick));
        } else {
          el.textContent = raw;
          frames.delete(el);
        }
      };

      frames.set(el, requestAnimationFrame(tick));
    };

    /* ---------------- reveal + count observer ---------------- */
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.classList.add('is-visible');
          settleReveal(el);
          if (el.hasAttribute('data-countup')) countUp(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    /* ---------------- in-page navigation scrollspy ---------------- */
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!active) return;

        const id = active.target.id;
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.toggleAttribute('data-active-section', isActive);
          if (isActive) link.setAttribute('aria-current', 'location');
          else if (link.getAttribute('aria-current') === 'location') {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    /* ---------------- DOM scanning (debounced) ---------------- */
    let scanQueued = false;
    const scan = () => {
      scanQueued = false;

      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.hasAttribute('data-motion-observed')) return;
        el.setAttribute('data-motion-observed', '');
        revealObserver.observe(el);
      });

      document.querySelectorAll<HTMLElement>('section[id]').forEach((section) => {
        if (section.hasAttribute('data-spy-observed')) return;
        section.setAttribute('data-spy-observed', '');
        sectionObserver.observe(section);
      });
    };

    const scheduleScan = () => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(scan);
    };

    /* ---------------- sticky header + restrained parallax ---------------- */
    let scrollQueued = false;
    const applyScroll = () => {
      scrollQueued = false;
      const y = window.scrollY;
      root.toggleAttribute('data-scrolled', y > motion.scrollThreshold);
      if (!reduced) root.style.setProperty('--pb-scroll', String(Math.min(y, 1200)));
    };

    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(applyScroll);
    };

    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    scheduleScan();
    applyScroll();

    return () => {
      mutations.disconnect();
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      frames.forEach((frame) => cancelAnimationFrame(frame));
      frames.clear();
      revealTimers.forEach((timer) => clearTimeout(timer));
      revealTimers.clear();
      document.querySelectorAll('[data-motion-observed]').forEach((el) => el.removeAttribute('data-motion-observed'));
      document.querySelectorAll('[data-spy-observed]').forEach((el) => el.removeAttribute('data-spy-observed'));
      root.removeAttribute('data-motion-ready');
    };
  }, [pathname]);

  return null;
}
