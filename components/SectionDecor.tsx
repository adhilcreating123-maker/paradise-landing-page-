'use client';

import Image from 'next/image';
import { useId, type ReactNode } from 'react';

export type SectionDecorVariant =
  | 'branch'
  | 'story'
  | 'cakeworld'
  | 'life'
  | 'findus'
  | 'reviews'
  | 'footer'
  | 'cakes';

interface SectionDecorProps {
  variant: SectionDecorVariant;
  className?: string;
}

const INGREDIENTS = [
  { src: '/parallax/ingredients/flour.webp', className: 'left-[-3%] top-[18%] w-24 sm:w-32' },
  { src: '/parallax/ingredients/sugar.webp', className: 'right-[-2%] top-[12%] w-20 sm:w-28' },
  { src: '/parallax/ingredients/eggs.webp', className: 'left-[4%] bottom-[10%] w-20 sm:w-28' },
  { src: '/parallax/ingredients/milk.webp', className: 'right-[5%] bottom-[14%] w-24 sm:w-32' },
  { src: '/parallax/ingredients/vanilla.webp', className: 'left-[18%] top-[-4%] w-16 sm:w-24' },
  { src: '/parallax/ingredients/nuts.webp', className: 'right-[20%] bottom-[-3%] w-20 sm:w-28' },
  { src: '/parallax/ingredients/strawberry.webp', className: 'left-[42%] bottom-[-5%] w-16 sm:w-24' },
];

const CAKE_HERO_CRUMBS = [
  { src: '/parallax/ingredients/flour.webp', className: 'left-[-2%] top-[14%] w-24 sm:w-32' },
  { src: '/parallax/ingredients/vanilla.webp', className: 'right-[3%] top-[8%] w-20 sm:w-28' },
  { src: '/parallax/ingredients/milk.webp', className: 'left-[10%] bottom-[6%] w-20 sm:w-28' },
  { src: '/parallax/ingredients/strawberry.webp', className: 'right-[12%] bottom-[-2%] w-24 sm:w-32' },
];

function Dot({ className, color = '#C9A34E' }: { className: string; color?: string }) {
  return (
    <span
      className={`absolute h-1.5 w-1.5 rounded-full pb-bob ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}

function variantContent(variant: SectionDecorVariant, uid: string): ReactNode {
  switch (variant) {
    case 'branch':
      return (
        <>
          {/* BACKGROUND — very faint wheat-stalk pattern (6%). */}
          <svg
            data-parallax="0.1"
            data-parallax-mobile-hide
            viewBox="0 0 1440 600"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-[-12%] h-[124%] w-[124%] opacity-[0.06]"
            aria-hidden="true"
          >
            <defs>
              <pattern id={`${uid}-wheat`} width="120" height="120" patternUnits="userSpaceOnUse">
                <path
                  d="M60 112V52 M60 60C45 55 42 42 48 32C55 40 58 48 60 56 M60 60C75 55 78 42 72 32C65 40 62 48 60 56 M60 80C48 76 45 66 50 58C56 64 59 72 60 78 M60 80C72 76 75 66 70 58C64 64 61 72 60 78"
                  fill="none"
                  stroke="#C9A34E"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${uid}-wheat)`} />
          </svg>

          {/* FOREGROUND — a slim gold ornament crossing between the cards. */}
          <svg
            data-parallax="0.35"
            data-parallax-decor
            viewBox="0 0 1440 24"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-[52%] h-6 w-full opacity-60"
            aria-hidden="true"
          >
            <path
              d="M0 12H636l18-8 18 16 18-8H1440"
              fill="none"
              stroke="#C9A34E"
              strokeWidth="1"
            />
            <circle cx="654" cy="12" r="2" fill="#E3A04B" />
            <circle cx="702" cy="12" r="2" fill="#E3A04B" />
          </svg>
        </>
      );

    case 'story':
      return (
        <>
          {/* BACKGROUND — horizontal oversized watermark at 4%. */}
          <div
            data-parallax="0.12"
            data-axis="x"
            data-parallax-mobile-hide
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <span className="font-serif text-[22vw] font-bold leading-none tracking-[0.18em] text-[#C9A34E] opacity-[0.04]">
              STORY
            </span>
          </div>
          {/* FOREGROUND — small framed accent moving faster than the image. */}
          <div
            data-parallax="0.4"
            data-parallax-decor
            className="absolute right-[12%] top-[18%] h-16 w-16 rotate-12 rounded-xl border border-[#C9A34E]/30 sm:h-24 sm:w-24"
          />
        </>
      );

    case 'cakeworld':
      return (
        <>
          {/* MIDGROUND — scroll-rotated orbit rings, outside the pinned timeline. */}
          <div
            data-parallax="0.12"
            data-rotate="14"
            data-parallax-decor
            className="absolute left-1/2 top-1/2 h-[min(78vw,620px)] w-[min(78vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A34E]/20"
          />
          <div
            data-parallax="0.12"
            data-rotate="-10"
            data-parallax-decor
            className="absolute left-1/2 top-1/2 h-[min(58vw,460px)] w-[min(58vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E3A04B]/15"
          />
          {/* FOREGROUND — 7 blurred ingredients spanning the full section width. */}
          <div data-parallax="0.45" data-depth="fg" className="absolute inset-0">
            {INGREDIENTS.map(({ src, className }) => (
              <Image
                key={src}
                src={src}
                alt=""
                aria-hidden
                loading="lazy"
                width={180}
                height={180}
                className={`absolute h-auto w-auto object-contain opacity-[0.13] blur-md ${className}`}
              />
            ))}
          </div>
        </>
      );

    case 'life':
      return (
        <>
          {/* BACKGROUND — soft curved gold arc behind the carousel. */}
          <svg
            data-parallax="0.15"
            data-parallax-mobile-hide
            viewBox="0 0 1440 420"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-[-6%] h-[62%] w-full opacity-[0.16]"
            aria-hidden="true"
          >
            <path
              d="M-40 360 C 320 80, 1120 80, 1480 360"
              fill="none"
              stroke="#C9A34E"
              strokeWidth="2"
            />
          </svg>
          {/* FOREGROUND — cream/gold crumbs at the corners. */}
          <div data-parallax="0.4" data-depth="fg" className="absolute inset-0">
            <Dot className="left-[8%] top-[14%]" />
            <Dot className="right-[10%] top-[22%]" color="#FDF2D8" />
            <Dot className="bottom-[16%] left-[22%]" color="#E3A04B" />
            <Dot className="bottom-[10%] right-[28%]" />
          </div>
        </>
      );

    case 'findus':
      return (
        <>
          {/* BACKGROUND — faint map-grid line pattern. */}
          <div
            data-parallax="0.1"
            data-parallax-mobile-hide
            className="absolute inset-[-8%] opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,163,78,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,163,78,0.8) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
          {/* FOREGROUND — bobbing location pin. */}
          <svg
            data-parallax="0.35"
            data-depth="fg"
            viewBox="0 0 24 24"
            className="pb-bob absolute right-[8%] top-[16%] h-9 w-9 opacity-40 sm:h-12 sm:w-12"
            fill="#C9A34E"
            aria-hidden="true"
          >
            <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
          </svg>
        </>
      );

    case 'reviews':
      return (
        <>
          {/* BACKGROUND — oversized quotation mark at 8%. */}
          <div
            data-parallax="0.15"
            data-parallax-mobile-hide
            className="absolute left-[4%] top-[-6%] select-none font-serif text-[30vw] leading-none text-[#C9A34E] opacity-[0.08] sm:text-[20rem]"
          >
            &ldquo;
          </div>
          {/* FOREGROUND — three floating gold stars near the rating. */}
          <div data-parallax="0.4" data-depth="fg" className="absolute inset-0">
            <span className="pb-bob absolute right-[22%] top-[10%] text-xs text-[#C9A34E]">★</span>
            <span className="pb-bob absolute right-[16%] top-[20%] text-sm text-[#E3A04B]">★</span>
            <span className="pb-bob absolute right-[26%] bottom-[18%] text-[10px] text-[#C9A34E]">★</span>
          </div>
        </>
      );

    case 'footer':
      return (
        <div
          data-parallax="0.08"
          data-parallax-mobile-hide
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="font-serif text-[18vw] font-bold leading-none tracking-[0.12em] text-[#C9A34E] opacity-[0.045]">
            PARADISE
          </span>
        </div>
      );

    case 'cakes':
      return (
        <>
          {/* BACKGROUND — Cake World hero watermark and radial gold glow. */}
          <div
            data-parallax="0.1"
            data-axis="x"
            data-parallax-mobile-hide
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            <span className="font-serif text-[20vw] font-bold leading-none tracking-[0.18em] text-[#C9A34E] opacity-[0.04]">
              CAKES
            </span>
          </div>
          <div
            data-parallax="0.1"
            data-parallax-mobile-hide
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 760px 520px at 62% 46%, rgba(201,163,78,0.16) 0%, rgba(227,160,75,0.07) 48%, transparent 78%)',
            }}
          />
          {/* FOREGROUND — blurred ingredients outside the cooler. */}
          <div data-parallax="0.45" data-depth="fg" className="absolute inset-0">
            {CAKE_HERO_CRUMBS.map(({ src, className }) => (
              <Image
                key={src}
                src={src}
                alt=""
                aria-hidden
                loading="lazy"
                width={180}
                height={180}
                className={`absolute h-auto w-auto object-contain opacity-[0.12] blur-md ${className}`}
              />
            ))}
          </div>
        </>
      );
  }
}

/** Low-opacity, non-interactive parallax accents rendered behind section copy. */
export default function SectionDecor({ variant, className = '' }: SectionDecorProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <div
      aria-hidden="true"
      data-layer="decor"
      className={`pointer-events-none absolute inset-0 z-0 select-none overflow-x-clip ${className}`}
    >
      {variantContent(variant, uid)}
    </div>
  );
}
