'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ==========================================================================
   CONFIGURABLE CONSTANTS (Exposed as requested)
   ========================================================================== */
export const AUTOPLAY_MS = 3000;
export const VISIBLE_SIDE_DESKTOP = 3; // 7 visible cards (-3 .. +3)
export const VISIBLE_SIDE_TABLET = 2;  // 5 visible cards (-2 .. +2)
export const VISIBLE_SIDE_MOBILE = 1;  // 3 visible cards (-1 .. +1)

export const STEP_X_DESKTOP = 180;
export const STEP_X_TABLET = 130;
export const STEP_X_MOBILE = 90;

export const ARC_DEPTH_DESKTOP = 18;
export const ARC_DEPTH_TABLET = 14;
export const ARC_DEPTH_MOBILE = 10;

export const ROTATE_Y = 20;     // deg per step
export const ROTATE_Z = 4;      // deg per step for smile arc
export const SCALE_STEP = 0.11; // scale drop per tier
export const SWIPE_THRESHOLD = 40; // px for touch swipe

/* ==========================================================================
   15 LIFE AT PARADISE CURATED MOMENTS
   ========================================================================== */
export interface LifeCardItem {
  id: string;
  label: string;
  title: string;
  alt: string;
  src: string;
}

export const LIFE_CARDS: LifeCardItem[] = [
  {
    id: 'life-01',
    label: 'Stone Hearth Oven',
    title: 'The Artisan Hearth',
    alt: 'Stone Hearth Oven baking artisanal bread at Paradise Bakes',
    src: '/images/life/life-01.jpg',
  },
  {
    id: 'life-02',
    label: 'Viennoiserie',
    title: 'Golden Crisp Croissants',
    alt: 'Handmade flaky butter croissants fresh from the oven',
    src: '/images/life/life-02.jpg',
  },
  {
    id: 'life-03',
    label: 'Cake Studio',
    title: 'Velvet Birthday Masterpiece',
    alt: 'Master pastry chef detailing celebration cake',
    src: '/images/life/life-03.jpg',
  },
  {
    id: 'life-04',
    label: 'Daily Craft',
    title: 'Morning Flour Sifting',
    alt: 'Artisan baker carefully sifting organic flour',
    src: '/images/life/life-04.jpg',
  },
  {
    id: 'life-05',
    label: 'Olavanna Cafe',
    title: 'Espresso & Macarons',
    alt: 'Freshly pulled espresso with assorted French macarons',
    src: '/images/life/life-05.jpg',
  },
  {
    id: 'life-06',
    label: 'Bespoke Orders',
    title: 'Pastel Cupcake Palette',
    alt: 'Artisanal decorated cupcakes for festive parties',
    src: '/images/life/life-06.jpg',
  },
  {
    id: 'life-07',
    label: 'Chocolaterie',
    title: 'Belgian Truffle Glaze',
    alt: 'Rich molten dark chocolate ganache glaze application',
    src: '/images/life/life-07.jpg',
  },
  {
    id: 'life-08',
    label: 'Celebrations',
    title: 'Tiered Wedding Splendor',
    alt: 'Grand tiered wedding cake crafted by Paradise masters',
    src: '/images/life/life-08.jpg',
  },
  {
    id: 'life-09',
    label: 'Sourdough Workshop',
    title: 'Rustic Country Boules',
    alt: 'Fermented crusty sourdough country loaf',
    src: '/images/life/life-09.jpg',
  },
  {
    id: 'life-10',
    label: 'Kattukulangara',
    title: 'Afternoon Pastry Counter',
    alt: 'Vibrant glass patisserie display counter with treats',
    src: '/images/life/life-10.jpg',
  },
  {
    id: 'life-11',
    label: 'Puff Pastry',
    title: 'Fresh Chicken Turnovers',
    alt: 'Golden flaky puff pastry snacks steaming hot',
    src: '/images/life/life-11.jpg',
  },
  {
    id: 'life-12',
    label: 'Artisan Hands',
    title: 'Hand-Kneaded Brioche',
    alt: 'Baking hands rolling rich butter brioche dough',
    src: '/images/life/life-12.jpg',
  },
  {
    id: 'life-13',
    label: 'Fruit Tarts',
    title: 'Seasonal Strawberry Glaze',
    alt: 'Glossy strawberry vanilla pastry cream tart',
    src: '/images/life/life-13.jpg',
  },
  {
    id: 'life-14',
    label: 'Barista Corner',
    title: 'Velvety Latte Art',
    alt: 'Steamed milk rosetta latte art in ceramic cup',
    src: '/images/life/life-14.jpg',
  },
  {
    id: 'life-15',
    label: 'Night Shift',
    title: 'Midnight Oven Baking',
    alt: 'Oven glowing in the quiet hours preparing morning batches',
    src: '/images/life/life-15.jpg',
  },
];

/**
 * Calculates the shortest signed circular offset in range [-7 .. +7]
 */
export function getCircularOffset(index: number, activeIndex: number, total: number = 15): number {
  let diff = (index - activeIndex) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function LifeCurvedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Determine responsive bounds
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  const visibleSide = isMobile
    ? VISIBLE_SIDE_MOBILE
    : isTablet
    ? VISIBLE_SIDE_TABLET
    : VISIBLE_SIDE_DESKTOP;

  const stepX = isMobile
    ? STEP_X_MOBILE
    : isTablet
    ? STEP_X_TABLET
    : STEP_X_DESKTOP;

  const arcDepth = isMobile
    ? ARC_DEPTH_MOBILE
    : isTablet
    ? ARC_DEPTH_TABLET
    : ARC_DEPTH_DESKTOP;

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + LIFE_CARDS.length) % LIFE_CARDS.length);
  };

  const prev = () => move(-1);
  const next = () => move(1);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (isPaused || motionPreference.matches) return;

    const timer = window.setTimeout(() => {
      if (!motionPreference.matches) {
        setActiveIndex((index) => (index + 1) % LIFE_CARDS.length);
      }
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  /**
   * Keyboard Arrow Navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  /**
   * Touch Swipe Handlers (Threshold 40px)
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null)
      return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Only swipe if horizontal distance is significantly greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Life at Paradise 15-moment gallery carousel"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[#C9A34E]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#5C0302] rounded-3xl pt-2 pb-6"
    >
      {/* 3D Arc Gallery Stage */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full h-[370px] sm:h-[430px] lg:h-[460px] flex items-center justify-center overflow-hidden"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Soft Warm Center Spotlight Behind Center Active Card */}
        <div
          data-parallax-depth="0.15"
          className="absolute w-72 sm:w-96 aspect-square rounded-full pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(circle, rgba(201, 163, 78, 0.22) 0%, rgba(92, 3, 2, 0.15) 55%, transparent 75%)',
            filter: 'blur(45px)',
          }}
        />

        {/* 15 Cards Absolute Stack */}
        {LIFE_CARDS.map((item, idx) => {
          const offset = getCircularOffset(idx, activeIndex, LIFE_CARDS.length);
          const distance = Math.abs(offset);
          const isActive = distance === 0;
          const isVisible = distance <= visibleSide;
          const position = Math.sign(offset) * Math.min(distance, visibleSide + 1);
          const tier = Math.abs(position);
          const scale = isActive ? 1.1 : Math.max(0.68, 0.93 - (tier - 1) * SCALE_STEP);
          const transform = [
            'translate(-50%, -50%)',
            `translate3d(${position * stepX}px, ${tier ** 2 * arcDepth}px, ${-tier * (isMobile ? 70 : 105)}px)`,
            `rotateY(${-position * (isMobile ? 15 : ROTATE_Y)}deg)`,
            `rotateZ(${position * (isMobile ? 2.5 : ROTATE_Z)}deg)`,
            `scale(${scale})`,
          ].join(' ');

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              role="group"
              aria-label={`${item.title} (${idx + 1} of 15)`}
              aria-hidden={!isVisible}
              aria-current={isActive ? 'true' : undefined}
              className={`absolute top-1/2 left-1/2 w-[min(66vw,260px)] sm:w-[250px] lg:w-[280px] h-[340px] sm:h-[345px] lg:h-[385px] rounded-[24px] overflow-hidden cursor-pointer transition-[transform,opacity,filter,box-shadow] duration-700 ease-in-out motion-reduce:transition-none ${
                isActive
                  ? 'border border-[#C9A34E] shadow-[0_12px_40px_rgba(201,163,78,0.38)] cursor-default'
                  : 'border border-[#C9A34E]/30 hover:border-[#C9A34E]/60 shadow-[0_8px_25px_rgba(0,0,0,0.5)]'
              }`}
              style={{
                transform,
                opacity: isVisible ? (distance === visibleSide ? 0.82 : 1) : 0,
                filter: isActive ? 'none' : `brightness(${Math.max(0.45, 0.88 - tier * 0.14)}) blur(${Math.min(2.5, tier * 0.75)}px)`,
                zIndex: isVisible ? 30 - distance * 5 : 1,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            >
              {/* Image with subtle Ken Burns zoom for active card */}
              <div className="relative w-full h-full overflow-hidden bg-[#1C050B]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                    isActive ? 'scale-108' : 'scale-100 hover:scale-105'
                  }`}
                />

                {/* Dark Gradient Overlay for Caption Readability */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-300 ${
                    isActive ? 'opacity-90' : 'opacity-75'
                  }`}
                />

                {/* Golden Corner Badge for Center Card */}
                {isActive && (
                  <div className="absolute top-3 right-3 bg-[#5C0302]/85 backdrop-blur-md border border-[#C9A34E]/70 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-[#FFE088] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E] animate-ping" />
                    <span>Moment {idx + 1}</span>
                  </div>
                )}

                {/* Card Caption (Label + Title) */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span
                    className={`text-[11px] uppercase font-bold tracking-widest block transition-colors duration-300 ${
                      isActive ? 'text-[#C9A34E]' : 'text-[#C9A34E]/80'
                    }`}
                  >
                    {item.label}
                  </span>
                  <h4
                    className={`font-serif text-sm sm:text-lg font-bold text-white mt-0.5 leading-snug line-clamp-2 ${
                      isActive ? 'drop-shadow-md' : 'opacity-90'
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls: Prev / Next Chevrons & Progress Indicator */}
      <div className="w-full flex flex-col items-center gap-5 mt-6 px-4">
        {/* Prev / Next Chevrons */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous moment"
            className="w-12 h-12 rounded-full border border-[#ffe088]/40 hover:border-[#ffe088] text-[#ffe088] flex items-center justify-center transition-all bg-[#1C050B]/60 hover:bg-[#1C050B] active:scale-90 shadow-md focus-visible:ring-2 focus-visible:ring-[#C9A34E] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl pointer-events-none">chevron_left</span>
          </button>

          {/* Active Step Counter */}
          <div className="px-4 py-1.5 rounded-full bg-[#1C050B]/60 border border-[#C9A34E]/30 text-xs font-semibold tracking-wider text-[#ffd7c9] shadow-sm">
            <span className="text-[#C9A34E] font-bold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="opacity-40 mx-1.5">/</span>
            <span>15</span>
          </div>

          <button
            onClick={next}
            aria-label="Next moment"
            className="w-12 h-12 rounded-full border border-[#ffe088]/40 hover:border-[#ffe088] text-[#ffe088] flex items-center justify-center transition-all bg-[#1C050B]/60 hover:bg-[#1C050B] active:scale-90 shadow-md focus-visible:ring-2 focus-visible:ring-[#C9A34E] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl pointer-events-none">chevron_right</span>
          </button>
        </div>

        {/* 15 Position Progress Dots (Clickable) */}
        <div
          role="tablist"
          aria-label="Select a moment"
          className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-md pt-1"
        >
          {LIFE_CARDS.map((card, i) => {
            const isCurrent = i === activeIndex;
            return (
              <button
                key={card.id}
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Jump to moment ${i + 1}: ${card.title}`}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A34E] ${
                  isCurrent
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#C9A34E] shadow-[0_0_10px_#C9A34E]'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
