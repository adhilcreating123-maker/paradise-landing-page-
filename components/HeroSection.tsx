'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MOBILE_STRENGTH,
  PARALLAX_ENABLED,
  PARALLAX_STRENGTH,
  PARALLAX_TRAVEL,
  SCRUB,
  SECTION_SPEEDS,
} from '../lib/parallax-config';
import SectionLayers from './SectionLayers';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_PHOTOS = [
  { src: '/hero/Rosetta Cappuccino on Burgundy-3.png', alt: 'Rosetta cappuccino', focalX: '77%' },
  { src: '/hero/Sparkling lime mint cooler-2.png', alt: 'Sparkling lime mint cooler', focalX: '78%' },
  { src: '/hero/Golden Kerala fried chicken bites-1.png', alt: 'Golden Kerala fried chicken bites', focalX: '74%' },
  { src: '/hero/Kerala Egg Puffs on Ivory Plate-5.png', alt: 'Kerala egg puffs', focalX: '73%' },
  { src: '/hero/Black Forest Cake on Burgundy-4.png', alt: 'Black Forest cake', focalX: '72%' },
];

export default function HeroSection() {
  const [rotationStep, setRotationStep] = useState(0);
  const activePhoto = rotationStep % HERO_PHOTOS.length;
  const previousPhoto = (rotationStep - 1) % HERO_PHOTOS.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRotationStep((step) => step + 1);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      !PARALLAX_ENABLED ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let media: gsap.MatchMedia | undefined;
    const ctx = gsap.context(() => {
      media = gsap.matchMedia();
      media.add(
        { desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' },
        (context) => {
          if (
            !photoRef.current ||
            !shadeRef.current ||
            !copyRef.current ||
            !fgRef.current
          ) {
            return;
          }

          const mobile = Boolean(context.conditions?.mobile);
          const travel =
            PARALLAX_TRAVEL * PARALLAX_STRENGTH * (mobile ? MOBILE_STRENGTH : 1);
          const speeds = SECTION_SPEEDS.hero;
          const scrollTrigger = () => ({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: SCRUB,
            invalidateOnRefresh: true,
          });

          // BACKGROUND — slow drift plus a 1.05 → 1.18 zoom on the photo.
          gsap.fromTo(
            photoRef.current,
            { y: (travel * speeds.bg) / 2, scale: 1.05 },
            {
              y: -(travel * speeds.bg) / 2,
              scale: 1.18,
              ease: 'none',
              scrollTrigger: scrollTrigger(),
            },
          );

          // The dark maroon shade deepens as the hero scrolls away.
          gsap.fromTo(
            shadeRef.current,
            { opacity: 0.08 },
            { opacity: 0.62, ease: 'none', scrollTrigger: scrollTrigger() },
          );

          // MIDGROUND — copy drifts up faster and fades to 0.3.
          gsap.fromTo(
            copyRef.current,
            { y: 0, opacity: 1 },
            {
              y: travel * speeds.mid,
              opacity: 0.3,
              ease: 'none',
              scrollTrigger: scrollTrigger(),
            },
          );

          // FOREGROUND — dust and crumbs travel fastest.
          gsap.fromTo(
            fgRef.current,
            { y: (travel * speeds.fg) / 2 },
            {
              y: -(travel * speeds.fg) / 2,
              ease: 'none',
              scrollTrigger: scrollTrigger(),
            },
          );
        },
      );
    }, section);

    return () => {
      ctx.revert();
      media?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-parallax-start
      data-parallax-section="hero"
      className="relative bg-[#5C0302] text-[#FDF2D8] flex flex-col lg:flex-row lg:items-center overflow-x-clip lg:min-h-[640px] lg:h-[calc(100svh-116px)]"
    >
      <SectionLayers
        tone="dark"
        variant="hero"
        delay={1}
        controlledForeground
        foregroundRef={fgRef}
      />

      {/* Ambient background glows */}
      <div data-parallax-depth="-0.25" data-parallax-decor data-parallax-priority={4} data-parallax-mobile-hide className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#C9A34E]/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div data-parallax-depth="-0.15" data-parallax-decor data-parallax-priority={4} data-parallax-mobile-hide className="absolute -bottom-32 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#5C0302]/40 rounded-full blur-3xl pointer-events-none z-0" />

      {/* 
        PHOTO CONTAINER:
        - Mobile (<640px): On top, height 46svh, full width, bottom 30% fade into maroon
        - Tablet (640-1023px): On top, height 50svh, full width, bottom 30% fade into maroon
        - Desktop (1024px+): Full-width background with a horizontal mask behind the copy
      */}
      <div data-layer="background" className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full h-[46svh] sm:h-[50svh] overflow-hidden lg:h-full">
        <div className="relative w-full h-full overflow-hidden hero-desktop-mask">
          <div
            style={{
              filter: 'saturate(1.08) contrast(1.05)',
            }}
            className="relative w-full h-full"
          >
            {/* Hero Image — background motion layer (slow drift + zoom) */}
            <div ref={photoRef} className="absolute inset-0 scale-105">
              {HERO_PHOTOS.map(({ src, alt }, index) => {
                const isActive = index === activePhoto;
                return (
                  <Image
                    key={src}
                    src={src}
                    alt={isActive ? alt : ''}
                    fill
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    loading="eager"
                    className={`object-cover hero-img-${index} ${isActive
                      ? 'z-10 opacity-100 motion-safe:transition-opacity motion-safe:duration-700'
                      : index === previousPhoto
                        ? 'opacity-100'
                        : 'opacity-0'}`}
                  />
                );
              })}
            </div>

            {/* Mobile / Tablet bottom 30% fade into background (removes any hard line) */}
            <div
              className="absolute bottom-0 inset-x-0 h-[30%] pointer-events-none z-20 bg-gradient-to-t from-[#5C0302] via-[#5C0302]/70 to-transparent lg:hidden"
            />

            {/* Desktop-only focused shades */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-[40%] pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(90deg, #5C0302 0%, rgba(92,3,2,0.65) 25%, transparent 100%)',
              }}
            />
            <div
              className="hidden lg:block absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(0deg, rgba(20,2,4,0.85) 0%, rgba(20,2,4,0.3) 50%, transparent 100%)',
              }}
            />
            <div
              className="hidden lg:block absolute top-0 left-0 right-0 h-20 pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(180deg, #5C0302 0%, rgba(92,3,2,0.7) 35%, transparent 100%)',
              }}
            />
            <div
              className="hidden lg:block absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-20"
              style={{
                background:
                  'linear-gradient(0deg, #5C0302 0%, rgba(92,3,2,0.75) 35%, transparent 100%)',
              }}
            />
            <div
              className="hidden lg:block absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  'radial-gradient(circle at 60% 45%, transparent 60%, rgba(20,2,4,0.2) 100%)',
              }}
            />

            {/* Scroll-deepening maroon shade */}
            <div
              ref={shadeRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 bg-[#5C0302]"
              style={{ opacity: 0.08 }}
            />


          </div>
        </div>
      </div>

      <div className="site-shell relative z-20 flex flex-col justify-center pt-[calc(46svh+1.5rem)] pb-6 sm:pt-[calc(50svh+2rem)] sm:pb-8 lg:h-full lg:py-6">
        {/* "MADE WITH CARE" badge */}
        <div className="absolute top-3 right-[var(--site-inset)] lg:top-7 bg-[#1C050B]/80 backdrop-blur-md border border-[#C9A34E]/60 rounded-full px-3 py-1 text-[11px] font-bold text-[#FFE088] uppercase tracking-wider z-30 shadow-lg flex items-center gap-1.5 select-none pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E3A04B] animate-ping" />
          <span>Made With Care</span>
        </div>

        {/* Desktop-only Caption: bottom-right */}
        <div data-parallax-depth="0.10" className="hidden lg:block absolute lg:bottom-7 right-[var(--site-inset)] text-right z-30 pointer-events-none drop-shadow-md">
          <span className="lg:text-[11px] uppercase font-bold text-[#C9A34E] tracking-[0.2em] block">
            Cakes • Breads • Bakes
          </span>
          <p className="font-serif lg:text-2xl font-bold text-white mt-0.5 leading-snug">
            Shared with joy.
          </p>
        </div>

        <div ref={copyRef} data-layer="midground" className="relative z-20 w-full lg:w-[58%] lg:max-w-[680px] space-y-3.5 sm:space-y-4">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#703343]/60 border border-[#C9A34E]/40 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#ffe088] uppercase self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E]"></span>
            Bakery &amp; Studio
          </div>

          {/* Headline: clamp(2.1rem, 9vw, 2.6rem), 2 lines */}
          <h1 className="font-serif leading-[1.1] tracking-[-0.02em] text-[#fdf9f3] text-balance">
            <span className="block text-[clamp(2.1rem,9vw,2.6rem)] sm:text-4xl md:text-4xl lg:text-[3.5rem] xl:text-[4.2rem] font-bold pb-0.5">
              Every craving finds its
            </span>
            <span className="block text-[clamp(2.1rem,9vw,2.6rem)] sm:text-4xl md:text-4xl lg:text-[3.5rem] xl:text-[4.2rem] italic font-normal text-[#C9A34E]">
              Paradise.
            </span>
          </h1>

          {/* Text Blocks */}
          <div className="space-y-2 pt-0.5">
            {/* Paragraph: 16px on mobile/tablet */}
            <p className="text-base sm:text-base lg:text-[17px] text-[#FDF2D8]/90 font-light leading-relaxed">
              Croissants, breads and celebration cakes, made with care at our three Kozhikode branches.
            </p>

            {/* Shortened italic quote: 14-15px */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-0.5">
              <div className="w-8 sm:w-10 h-0.5 bg-[#C9A34E] rounded-full shrink-0" />
              <p className="text-[14px] sm:text-[15px] lg:text-base text-[#FDF2D8]/90 font-light italic truncate">
                &ldquo;Freshly baked every morning. Table waiting for you.&rdquo;
              </p>
            </div>
          </div>

          {/* Tags: 13px */}
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium tracking-wider text-[#ffe088]/90 pt-0.5">
            <span>Dine-in</span>
            <span className="text-[#C9A34E] font-bold text-[9px] select-none">•</span>
            <span>Takeaway</span>
            <span className="text-[#C9A34E] font-bold text-[9px] select-none">•</span>
            <span>Cakes</span>
          </div>

          {/* Call-to-action buttons wrap at narrow widths. */}
          <div className="flex flex-wrap items-center gap-3 pb-2">
            <a
              href="#cakeworld"
              className="min-h-[48px] max-w-full bg-[#E3A04B] hover:bg-[#CA8B4A] text-[#5C0302] font-bold text-xs lg:text-[13px] uppercase tracking-[0.14em] px-6 lg:px-8 py-3 lg:py-4 rounded-full transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center text-center"
            >
              Explore Cake World
            </a>
            <a
              href="#branches"
              className="min-h-[48px] max-w-full border border-[#CA8B4A] hover:border-[#E3A04B] text-[#FDF2D8] bg-[#9A1C20]/40 hover:bg-[#9A1C20] font-semibold text-xs lg:text-[13px] uppercase tracking-[0.14em] px-5 lg:px-7 py-3 lg:py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-sm flex items-center justify-center text-center"
            >
              Our Branches
            </a>
          </div>
        </div>
      </div>

      {/* Responsive image focal positioning & Desktop mask rules */}
      <style jsx>{`
        /* Mobile & Tablet (<1024px): Center the food subject directly in the mobile viewport */
        @media (max-width: 1023px) {
          :global(.hero-img-0) {
            object-position: 77% 50% !important;
          }
          :global(.hero-img-1) {
            object-position: 78% 50% !important;
          }
          :global(.hero-img-2) {
            object-position: 74% 50% !important;
          }
          :global(.hero-img-3) {
            object-position: 73% 50% !important;
          }
          :global(.hero-img-4) {
            object-position: 72% 50% !important;
          }
        }

        /* Desktop (1024px+): Strictly preserved original center framing with mask */
        @media (min-width: 1024px) {
          :global([class*="hero-img-"]) {
            object-position: center center !important;
          }
          .hero-desktop-mask {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 33%,
              rgba(0, 0, 0, 0.6) 52%,
              #000 70%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              rgba(0, 0, 0, 0.6) 18%,
              #000 42%
            );
          }
        }
      `}</style>
    </section>
  );
}
