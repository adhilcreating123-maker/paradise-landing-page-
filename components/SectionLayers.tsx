import Image from 'next/image';
import React, { type CSSProperties, type Ref } from 'react';
import {
  SECTION_SPEEDS,
  type ParallaxSection,
} from '../lib/parallax-config';

type Tone = 'light' | 'dark';

interface DecorAsset {
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface SectionLayersProps {
  /** Light sections use maroon/gold on cream; dark sections use cream/gold on maroon. */
  tone?: Tone;
  /** Selects the configured speeds and decorative image set for the section. */
  variant?: ParallaxSection;
  /** Mirrors the small foreground accents so neighbouring sections do not repeat. */
  flip?: boolean;
  /** Staggers the ambient drift so sections breathe independently. */
  delay?: number;
  /** Lets a section (the hero) own the foreground motion instead of the scroll engine. */
  controlledForeground?: boolean;
  /** Ref for that section-owned foreground motion. */
  foregroundRef?: Ref<HTMLDivElement>;
  className?: string;
}

const TONES: Record<
  Tone,
  {
    blobWarm: string;
    blobGold: string;
    ring: string;
    texture: string;
    dotSoft: string;
    dotGold: string;
    ringSmall: string;
  }
> = {
  light: {
    blobWarm: 'bg-[#C9A34E]/[0.07]',
    blobGold: 'bg-[#E3A04B]/[0.055]',
    ring: 'border-[#5C0302]/[0.07]',
    texture: 'rgba(92, 3, 2, 0.055)',
    dotSoft: 'bg-[#5C0302]/[0.11]',
    dotGold: 'bg-[#C9A34E]/[0.16]',
    ringSmall: 'border-[#C9A34E]/[0.18]',
  },
  dark: {
    blobWarm: 'bg-[#C9A34E]/[0.10]',
    blobGold: 'bg-[#E3A04B]/[0.07]',
    ring: 'border-[#FDF2D8]/[0.09]',
    texture: 'rgba(253, 242, 216, 0.06)',
    dotSoft: 'bg-[#FDF2D8]/[0.12]',
    dotGold: 'bg-[#E3A04B]/[0.18]',
    ringSmall: 'border-[#C9A34E]/[0.22]',
  },
};

const BACKGROUND_ASSETS: Partial<Record<ParallaxSection, DecorAsset>> = {
  branches: {
    src: '/parallax/wheat.svg',
    width: 220,
    height: 220,
    className: 'right-[8%] top-[8%] w-40 opacity-[0.10] sm:w-56 lg:w-72',
  },
  story: {
    src: '/parallax/wheat.svg',
    width: 220,
    height: 220,
    className: 'left-[-2%] bottom-[6%] w-44 opacity-[0.09] sm:w-60 lg:w-72',
  },
  cakeworld: {
    src: '/parallax/flour-dust.svg',
    width: 180,
    height: 180,
    className: 'right-[16%] top-[12%] w-44 opacity-[0.16] sm:w-64',
  },
  life: {
    src: '/parallax/wheat.svg',
    width: 220,
    height: 220,
    className: 'left-[10%] top-[4%] w-40 opacity-[0.12] sm:w-56',
  },
  findus: {
    src: '/parallax/gold-dots.svg',
    width: 140,
    height: 140,
    className: 'right-[12%] bottom-[10%] w-36 opacity-[0.14] sm:w-52',
  },
  reviews: {
    src: '/parallax/flour-dust.svg',
    width: 180,
    height: 180,
    className: 'left-[6%] top-[8%] w-40 opacity-[0.12] sm:w-56',
  },
};

const FOREGROUND_ASSETS: Record<ParallaxSection, DecorAsset[]> = {
  hero: [
    {
      src: '/parallax/gold-dots.svg',
      width: 140,
      height: 140,
      className: 'left-[3%] top-[10%] w-24 opacity-50 sm:w-32',
    },
    {
      src: '/parallax/croissant-crumb.svg',
      width: 280,
      height: 180,
      className:
        'left-[-8%] top-[58%] w-56 opacity-30 blur-[2px] sm:w-72 lg:left-[-5%] lg:top-[14%] lg:w-80',
    },
    {
      src: '/parallax/flour-crumb.webp',
      width: 240,
      height: 240,
      className:
        'bottom-[6%] left-[14%] w-28 opacity-25 blur-[3px] sm:w-36 lg:left-[24%]',
    },
  ],
  branches: [
    {
      src: '/parallax/star.svg',
      width: 72,
      height: 72,
      className: 'right-[7%] top-[16%] w-6 opacity-45 sm:w-8',
    },
    {
      src: '/parallax/crumbs.svg',
      width: 260,
      height: 190,
      className: 'bottom-[4%] left-[8%] w-28 opacity-30 sm:w-40',
    },
  ],
  story: [
    {
      src: '/parallax/flour-dust.svg',
      width: 180,
      height: 180,
      className: 'right-[6%] bottom-[12%] w-24 opacity-35 sm:w-32',
    },
    {
      src: '/parallax/crumbs.svg',
      width: 260,
      height: 190,
      className: 'left-[4%] top-[10%] w-28 opacity-25 sm:w-36',
    },
  ],
  cakeworld: [
    {
      src: '/parallax/flour-dust.svg',
      width: 180,
      height: 180,
      className: 'left-[5%] top-[14%] w-28 opacity-30 sm:w-40',
    },
    {
      src: '/parallax/crumbs.svg',
      width: 260,
      height: 190,
      className: 'right-[5%] bottom-[12%] w-32 opacity-25 sm:w-44',
    },
  ],
  life: [
    {
      src: '/parallax/star.svg',
      width: 72,
      height: 72,
      className: 'right-[9%] top-[14%] w-6 opacity-45 sm:w-9',
    },
    {
      src: '/parallax/flour-dust.svg',
      width: 180,
      height: 180,
      className: 'left-[7%] bottom-[10%] w-24 opacity-30 sm:w-32',
    },
  ],
  findus: [
    {
      src: '/parallax/pin.svg',
      width: 64,
      height: 80,
      className: 'right-[8%] top-[14%] w-7 opacity-40 sm:w-10',
    },
    {
      src: '/parallax/gold-dots.svg',
      width: 140,
      height: 140,
      className: 'left-[6%] bottom-[12%] w-24 opacity-35 sm:w-32',
    },
  ],
  reviews: [
    {
      src: '/parallax/star.svg',
      width: 72,
      height: 72,
      className: 'right-[20%] top-[10%] w-5 opacity-45 sm:w-8',
    },
    {
      src: '/parallax/flour-dust.svg',
      width: 180,
      height: 180,
      className: 'left-[8%] bottom-[10%] w-24 opacity-28 sm:w-32',
    },
  ],
  cta: [
    {
      src: '/parallax/gold-dots.svg',
      width: 140,
      height: 140,
      className: 'left-[10%] top-[14%] w-24 opacity-35 sm:w-32',
    },
    {
      src: '/parallax/star.svg',
      width: 72,
      height: 72,
      className: 'right-[12%] bottom-[14%] w-6 opacity-40 sm:w-8',
    },
  ],
  footer: [
    {
      src: '/parallax/flour-dust.svg',
      width: 180,
      height: 180,
      className: 'right-[10%] top-[10%] w-28 opacity-25 sm:w-36',
    },
  ],
};

function DecorImage({ asset }: { asset: DecorAsset }) {
  return (
    <Image
      src={asset.src}
      alt=""
      aria-hidden
      loading="lazy"
      width={asset.width}
      height={asset.height}
      className={`pointer-events-none absolute h-auto object-contain ${asset.className}`}
    />
  );
}

/**
 * Decorative depth for a section. It renders the background and foreground
 * layers; the section's own content stays in the midground (relative z-10).
 * Both layers are aria-hidden, non-interactive and clipped to the section.
 */
export default function SectionLayers({
  tone = 'light',
  variant = 'cta',
  flip = false,
  delay = 0,
  controlledForeground = false,
  foregroundRef,
  className = '',
}: SectionLayersProps) {
  const palette = TONES[tone];
  const speeds = SECTION_SPEEDS[variant];
  const backgroundAsset = BACKGROUND_ASSETS[variant];
  const foregroundAssets = FOREGROUND_ASSETS[variant];

  const textureStyle: CSSProperties = {
    backgroundImage: `radial-gradient(${palette.texture} 1px, transparent 1px)`,
    backgroundSize: '24px 24px',
    WebkitMaskImage:
      'linear-gradient(120deg, transparent 12%, #000 45%, #000 72%, transparent 96%)',
    maskImage:
      'linear-gradient(120deg, transparent 12%, #000 45%, #000 72%, transparent 96%)',
  };

  return (
    <div
      aria-hidden="true"
      data-section-layers=""
      className={`pointer-events-none absolute inset-0 z-0 select-none overflow-x-clip ${className}`}
    >
      {/* BACKGROUND — big soft shapes, texture and glow (slowest drift). */}
      <div
        data-layer="background"
        data-depth="bg"
        data-parallax={speeds.bg}
        data-parallax-priority={4}
        data-parallax-decor=""
        data-parallax-mobile-hide=""
        className="section-layer section-layer--bg absolute inset-[-12%]"
        style={{ animationDelay: `${-delay}s` }}
      >
        <span
          className={`absolute left-[-10%] top-[-18%] h-[30rem] w-[30rem] rounded-full blur-3xl ${palette.blobWarm}`}
        />
        <span
          className={`absolute right-[-8%] top-[6%] h-[28rem] w-[28rem] rounded-full border ${palette.ring}`}
        />
        <span
          className={`absolute bottom-[-24%] left-[26%] h-[22rem] w-[44rem] rounded-[50%] blur-3xl ${palette.blobGold}`}
        />
        <span className="absolute inset-0" style={textureStyle} />
        {backgroundAsset ? <DecorImage asset={backgroundAsset} /> : null}
      </div>

      {/* FOREGROUND — small accents that drift faster, still behind the text. */}
      <div
        ref={foregroundRef}
        data-layer="foreground"
        data-depth="fg"
        data-parallax-controlled={controlledForeground ? '' : undefined}
        data-parallax={controlledForeground ? undefined : speeds.fg}
        data-parallax-managed={controlledForeground ? '' : undefined}
        data-parallax-priority={3}
        data-parallax-decor=""
        className="section-layer section-layer--fg absolute inset-[-6%]"
        style={{ animationDelay: `${-delay * 0.4}s` }}
      >
        <div className={flip ? 'absolute inset-0 -scale-x-100' : 'absolute inset-0'}>
          <span
            className={`absolute left-[6%] top-[16%] h-1.5 w-1.5 rounded-full ${palette.dotGold}`}
          />
          <span
            className={`absolute right-[8%] top-[22%] h-3 w-3 rounded-full border ${palette.ringSmall}`}
          />
          <span
            className={`absolute bottom-[20%] left-[10%] h-2 w-2 rotate-45 ${palette.dotSoft}`}
          />
          <span
            className={`absolute bottom-[16%] right-[12%] h-1.5 w-1.5 rounded-full ${palette.dotSoft}`}
          />
          {foregroundAssets.map((asset) => (
            <DecorImage key={asset.src} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
