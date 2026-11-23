'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   EASY TWEAK CONFIGURATION
   ========================================================================== */
export const PIN_LENGTH = '+=320%';
export const SCRUB_SPEED = 1.5;
export const HOVER_TILT = 6;
const STAGE_DESIGN_WIDTH = 500;

/* ==========================================================================
   INGREDIENTS SPECIFICATION
   Seven transparent PNGs scattered around the cake. Each entry keeps its
   own float timing so the arrangement never moves as one rigid group.
   ========================================================================== */
interface IngredientDef {
  id: string;
  name: string;
  src: string;
  startX: number;
  startY: number;
  box: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  floatDuration: number;
  floatDelay: number;
}

const INGREDIENTS: IngredientDef[] = [
  { id: 'flour', name: 'Flour', src: '/ingredients/flour.png', startX: -60, startY: -170, box: 160, offsetX: -2, offsetY: -3, rotation: -8, floatDuration: 7.4, floatDelay: -1.2 },
  { id: 'vanilla', name: 'Vanilla', src: '/ingredients/vanilla.png', startX: 75, startY: -165, box: 165, offsetX: 0, offsetY: -4, rotation: 6, floatDuration: 8.6, floatDelay: -4.1 },
  { id: 'milk', name: 'Milk', src: '/ingredients/milk.png', startX: 155, startY: -45, box: 190, offsetX: -9, offsetY: -9, rotation: 5, floatDuration: 9.2, floatDelay: -2.6 },
  { id: 'sugar', name: 'Sugar', src: '/ingredients/sugar.png', startX: 160, startY: 80, box: 180, offsetX: 2, offsetY: 2, rotation: -6, floatDuration: 6.8, floatDelay: -0.7 },
  { id: 'eggs', name: 'Eggs', src: '/ingredients/eggs.png', startX: -90, startY: 155, box: 165, offsetX: -3, offsetY: -13, rotation: 9, floatDuration: 8.1, floatDelay: -5.4 },
  { id: 'nuts', name: 'Nuts', src: '/ingredients/nuts.png', startX: 85, startY: 150, box: 200, offsetX: 6, offsetY: -18, rotation: -11, floatDuration: 7.7, floatDelay: -3.3 },
  { id: 'strawberry', name: 'Strawberry', src: '/ingredients/strawberry.png', startX: -145, startY: 15, box: 210, offsetX: 0, offsetY: 5, rotation: 12, floatDuration: 9.8, floatDelay: -6.2 },
];

export default function CakeAssembleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3-tier cake nested wrappers: scroll -> idle -> hover
  const cakeScrollRef = useRef<HTMLDivElement>(null);
  const cakeIdleRef = useRef<HTMLDivElement>(null);
  const cakeHoverRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  // Scroll timeline transforms the outer wrapper only; the float animation
  // lives on an inner wrapper so the two never fight over the same transform.
  const scrollWrappersRef = useRef<(HTMLDivElement | null)[]>([]);

  const cakeQuickX = useRef<((val: number) => void) | null>(null);
  const cakeQuickY = useRef<((val: number) => void) | null>(null);
  const cakeQuickRotX = useRef<((val: number) => void) | null>(null);
  const cakeQuickRotY = useRef<((val: number) => void) | null>(null);

  const [isAssembled, setIsAssembled] = useState(false);
  const isAssembledRef = useRef(false);
  const [stageScale, setStageScale] = useState(1);
  const cachedRectRef = useRef<DOMRect | null>(null);
  const isTouchRef = useRef(false);

  // Scale the whole illustration as one unit so every ingredient stays inside
  // the illustration area on smaller screens.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      setStageScale(Math.min(1, el.clientWidth / STAGE_DESIGN_WIDTH));
    };

    updateScale();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    isTouchRef.current =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!containerRef.current || !cakeScrollRef.current) return;

    const cakeShadow =
      'drop-shadow(0 0 22px rgba(227,160,75,0.5)) drop-shadow(0 22px 32px rgba(20,5,8,0.7))';

    // Reduced motion: static scattered arrangement, no pinning and no float.
    if (isReducedMotion) {
      gsap.set(cakeScrollRef.current, { scale: 1, opacity: 1, filter: cakeShadow });
      INGREDIENTS.forEach((ing, idx) => {
        const el = scrollWrappersRef.current[idx];
        if (!el) return;
        gsap.set(el, {
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          x: ing.startX,
          y: ing.startY,
          rotation: ing.rotation,
          scale: 1,
          opacity: 1,
          filter: 'none',
        });
      });
      return;
    }

    // The cake is visible from the start and stays visible throughout.
    gsap.set(cakeScrollRef.current, { scale: 0.96, opacity: 1, filter: cakeShadow });
    if (auraRef.current) gsap.set(auraRef.current, { scale: 0.85, opacity: 0.45 });

    INGREDIENTS.forEach((ing, idx) => {
      const el = scrollWrappersRef.current[idx];
      if (!el) return;
      gsap.set(el, {
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        x: ing.startX,
        y: ing.startY,
        rotation: ing.rotation,
        scale: 1,
        opacity: 1,
        filter: 'none',
      });
    });

    const triggerTarget = document.getElementById('cakeworld') || containerRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerTarget,
        start: 'top top',
        end: PIN_LENGTH,
        pin: triggerTarget,
        anticipatePin: 1,
        scrub: SCRUB_SPEED,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const gathered = self.progress >= 0.85;
          if (gathered !== isAssembledRef.current) {
            isAssembledRef.current = gathered;
            setIsAssembled(gathered);
          }
        },
      },
    });

    // Gently draw the ingredients inward. No opacity fade and no trip through
    // the cake centre, so its silhouette remains readable at every position.
    INGREDIENTS.forEach((ing, idx) => {
      const el = scrollWrappersRef.current[idx];
      if (!el) return;

      tl.to(
        el,
        {
          x: ing.startX * 0.68,
          y: ing.startY * 0.68,
          rotation: ing.rotation * 0.65,
          scale: 0.98,
          opacity: 1,
          ease: 'sine.inOut',
          duration: 0.55,
        },
        0
      ).to(
        el,
        {
          x: ing.startX * 0.4,
          y: ing.startY * 0.4,
          rotation: ing.rotation * 0.3,
          scale: 0.92,
          opacity: 0.96,
          ease: 'sine.inOut',
          duration: 0.45,
        },
        0.55
      );
    });

    tl.to(
      cakeScrollRef.current,
      { scale: 1, opacity: 1, ease: 'sine.inOut', duration: 0.8 },
      0
    );

    if (auraRef.current) {
      tl.to(
        auraRef.current,
        { scale: 1.05, opacity: 0.7, ease: 'sine.inOut', duration: 0.8 },
        0
      );
    }

    if (cakeHoverRef.current) {
      cakeQuickX.current = gsap.quickTo(cakeHoverRef.current, 'x', {
        duration: 0.4,
        ease: 'power2.out',
      });
      cakeQuickY.current = gsap.quickTo(cakeHoverRef.current, 'y', {
        duration: 0.4,
        ease: 'power2.out',
      });
      cakeQuickRotX.current = gsap.quickTo(cakeHoverRef.current, 'rotationX', {
        duration: 0.4,
        ease: 'power2.out',
      });
      cakeQuickRotY.current = gsap.quickTo(cakeHoverRef.current, 'rotationY', {
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  /* ------------------------------------------------------------------------
     MOUSE INTERACTIONS (gentle cake tilt only)
     ------------------------------------------------------------------------ */
  const handleMouseEnter = () => {
    if (isTouchRef.current) return;
    if (containerRef.current) {
      cachedRectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current || !isAssembledRef.current) return;
    const rect = cachedRectRef.current;
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const normX = (mouseX - rect.width / 2) / (rect.width / 2);
    const normY = (mouseY - rect.height / 2) / (rect.height / 2);

    if (cakeQuickRotX.current && cakeQuickRotY.current) {
      cakeQuickRotX.current(-normY * HOVER_TILT);
      cakeQuickRotY.current(normX * HOVER_TILT);
    }
    if (cakeQuickX.current && cakeQuickY.current) {
      cakeQuickX.current(normX * 8);
      cakeQuickY.current(normY * 8);
    }
  };

  const handleMouseLeave = () => {
    if (isTouchRef.current) return;
    if (cakeQuickRotX.current) cakeQuickRotX.current(0);
    if (cakeQuickRotY.current) cakeQuickRotY.current(0);
    if (cakeQuickX.current) cakeQuickX.current(0);
    if (cakeQuickY.current) cakeQuickY.current(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        if (cakeHoverRef.current) {
          gsap.timeline()
            .to(cakeHoverRef.current, { scale: 0.96, duration: 0.12, ease: 'power2.in' })
            .to(cakeHoverRef.current, { scale: 1.03, duration: 0.18, ease: 'back.out(2)' })
            .to(cakeHoverRef.current, { scale: 1, duration: 0.15, ease: 'power1.out' });
        }
      }}
      className="relative w-full max-w-[min(88vw,360px)] sm:max-w-[460px] lg:max-w-[500px] aspect-square flex items-center justify-center select-none bg-transparent overflow-visible pointer-events-auto"
      style={{
        perspective: '1000px',
        willChange: 'transform',
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: 'scale(' + stageScale + ')',
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        {/* 1. Ambient Warm Radial Backlight (Deep ruby burgundy + gold, NO white) */}
      <div
        ref={auraRef}
        className="absolute w-[280px] sm:w-[340px] lg:w-[380px] aspect-square rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(227, 160, 75, 0.4) 0%, rgba(123, 30, 27, 0.35) 50%, transparent 75%)',
          filter: 'blur(50px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* 2. Concentric Celestial Golden Rings & Expanded Wide Orbit */}
      <div
        className="absolute w-72 h-72 sm:w-84 sm:h-84 lg:w-96 lg:h-96 rounded-full border border-[#C9A34E]/20 pointer-events-none animate-spin"
        style={{ animationDuration: '70s' }}
      />
      <div className="absolute w-56 h-56 sm:w-68 sm:h-68 lg:w-76 lg:h-76 rounded-full border border-dashed border-[#C9A34E]/25 pointer-events-none" />

      {/* Expanded Wide Celestial Orbit Ring sweeping across behind the left text block */}
      <div
        className="hidden lg:block absolute w-[880px] h-[480px] rounded-[50%] border border-dashed border-[#C9A34E]/15 pointer-events-none -left-72 transform -rotate-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      />

      {/* Subtle Flowing Golden Energy Arc bridging chips towards the cake */}
      <svg
        className="hidden lg:block absolute -left-80 top-1/2 -translate-y-1/2 w-[440px] h-36 pointer-events-none z-0 opacity-20"
        viewBox="0 0 440 144"
        fill="none"
      >
        <path
          d="M 10 90 C 130 90, 220 20, 420 70"
          stroke="#C9A34E"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
        <circle cx="10" cy="90" r="3" fill="#FFE088" />
        <circle cx="420" cy="70" r="3" fill="#FFE088" />
      </svg>

      {/* 3. Floating Ingredient PNGs (transparent padding accounted for per item) */}
      {INGREDIENTS.map((ing, idx) => (
        <div
          key={ing.id}
          ref={(el) => {
            scrollWrappersRef.current[idx] = el;
          }}
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform:
              'translate(-50%, -50%) translate(' +
              ing.startX +
              'px, ' +
              ing.startY +
              'px) rotate(' +
              ing.rotation +
              'deg)',
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="ingredient-float flex items-center justify-center"
            style={{
              animationDuration: ing.floatDuration + 's',
              animationDelay: ing.floatDelay + 's',
            }}
          >
            <img
              src={ing.src}
              alt={ing.name}
              draggable={false}
              className="block select-none object-contain pointer-events-none"
              style={{
                width: ing.box,
                height: ing.box,
                transform: 'translate(' + ing.offsetX + 'px, ' + ing.offsetY + 'px)',
              }}
            />
          </div>
        </div>
      ))}

      {/* 4. Centerpiece: Original Google Stitch Artisanal Celebration Cake (Nested: scroll -> idle -> hover) */}
      <div
        ref={cakeScrollRef}
        className="relative z-20 w-64 sm:w-76 lg:w-88 flex flex-col items-center pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Middle: Cake slow float wrapper */}
        <div
          ref={cakeIdleRef}
          className="w-full flex flex-col items-center"
          style={{ willChange: 'transform' }}
        >
          {/* Inner: Cake 3D tilt & touch-tap wrapper */}
          <div
            ref={cakeHoverRef}
            className="relative flex flex-col items-center"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* Cake Bottom Shadows */}
            <div className="absolute -bottom-6 w-56 sm:w-68 h-8 rounded-full bg-black/60 blur-xl pointer-events-none" />
            <div className="absolute -bottom-4 w-44 sm:w-56 h-6 rounded-full bg-[#E3A04B]/30 blur-lg pointer-events-none" />

            {/* Pure SVG Cake Graphic (Original Google Stitch Design, NO white band) */}
            <svg
              className="w-60 sm:w-72 lg:w-80 h-auto drop-shadow-[0_25px_35px_rgba(20,5,8,0.7)] transition-shadow duration-300"
              viewBox="0 0 340 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gold Stand & Pedestal Plate */}
              <ellipse cx="170" cy="295" rx="140" ry="16" fill="#180509" opacity="0.6" filter="blur(4px)" />
              <ellipse cx="170" cy="285" rx="130" ry="14" fill="#C9A34E" stroke="#FFE088" strokeWidth="1.5" />
              <path d="M160 285 L164 305 L176 305 L180 285 Z" fill="#B88628" />
              <ellipse cx="170" cy="305" rx="35" ry="6" fill="#9B6F2D" />

              {/* Tier 1: Base Chocolate Velvet Layer (Dark cocoa, NO white band) */}
              <path d="M55 235 C55 215 285 215 285 235 L285 272 C285 288 55 288 55 272 Z" fill="url(#cakeBaseDark)" />
              <ellipse cx="170" cy="235" rx="115" ry="18" fill="#4A1525" />
              {/* Scalloped Gold Piping Tier 1 */}
              <path
                d="M55 235 C70 248 85 238 100 252 C115 238 135 248 150 240 C165 248 185 238 205 250 C225 240 245 248 260 238 C275 246 285 238 285 235"
                stroke="#E3A04B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Tier 2: Middle Velvet Layer */}
              <path d="M80 170 C80 152 260 152 260 170 L260 215 C260 230 80 230 80 215 Z" fill="url(#cakeMidDark)" />
              <ellipse cx="170" cy="170" rx="90" ry="15" fill="#3B0E19" />
              {/* Scalloped Cream Gold Piping Tier 2 */}
              <path
                d="M80 170 C95 180 110 172 125 182 C145 174 165 184 185 175 C205 184 225 174 245 182 C255 176 260 170 260 170"
                stroke="#FED7AA"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Tier 3: Top Gateau Layer */}
              <path d="M105 110 C105 96 235 96 235 110 L235 152 C235 164 105 164 105 152 Z" fill="url(#cakeTopDark)" />
              <ellipse cx="170" cy="110" rx="65" ry="12" fill="#2B0B12" />
              {/* Scalloped Gold Piping Tier 3 */}
              <path
                d="M105 110 C118 118 132 112 145 120 C160 114 175 122 195 114 C210 120 225 114 235 110"
                stroke="#E3A04B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Crown of Glazed Cherries & Red Velvet Berries */}
              <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
                <circle cx="170" cy="96" r="11" fill="#DC2626" />
                <circle cx="167" cy="93" r="3" fill="#FFFFFF" opacity="0.6" />
                <circle cx="152" cy="102" r="9" fill="#881337" />
                <circle cx="188" cy="101" r="9" fill="#BE123C" />
                <circle cx="138" cy="106" r="7" fill="#1E1B4B" />
                <circle cx="202" cy="105" r="7" fill="#1E1B4B" />
                <circle cx="170" cy="84" r="3" fill="#FFE088" />
                <circle cx="180" cy="88" r="2" fill="#FFE088" />
                <circle cx="160" cy="89" r="2" fill="#FFE088" />
              </g>

              {/* Golden Patisserie Sparkles */}
              <g stroke="#FFE088" strokeWidth="2" strokeLinecap="round">
                <line x1="168" y1="136" x2="172" y2="136" />
                <line x1="140" y1="195" x2="144" y2="195" />
                <line x1="200" y1="196" x2="204" y2="196" />
                <line x1="115" y1="258" x2="120" y2="258" />
                <line x1="225" y1="260" x2="230" y2="260" />
              </g>

              <defs>
                <linearGradient id="cakeBaseDark" x1="55" y1="215" x2="285" y2="280" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#42111D" />
                  <stop offset="50%" stopColor="#2B0B12" />
                  <stop offset="100%" stopColor="#180509" />
                </linearGradient>
                <linearGradient id="cakeMidDark" x1="80" y1="152" x2="260" y2="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#581728" />
                  <stop offset="50%" stopColor="#3B0E19" />
                  <stop offset="100%" stopColor="#21060D" />
                </linearGradient>
                <linearGradient id="cakeTopDark" x1="105" y1="96" x2="235" y2="158" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4A1525" />
                  <stop offset="50%" stopColor="#2B0B12" />
                  <stop offset="100%" stopColor="#1C050B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Bespoke 2026 Gold Seal Badge */}
            <div className="absolute -top-3 -right-2 bg-[#2B0B12]/90 backdrop-blur-md border border-[#E3A04B] rounded-full px-3.5 py-1 text-[10px] font-bold text-[#E3A04B] uppercase tracking-wider shadow-xl flex items-center space-x-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3A04B] animate-ping" />
              <span>Bespoke 2026</span>
            </div>
          </div>

          {/* Dynamic Status Chip */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C050B]/60 border border-[#C9A34E]/30 text-[11px] font-medium text-[#ffd7c9]">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isAssembled ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-[#E3A04B]'
              }`}
            />
            <span>{isAssembled ? 'Artisanal Cake Assembled' : 'Scroll to Assemble Ingredients'}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
