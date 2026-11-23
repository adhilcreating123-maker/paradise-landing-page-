'use client';

interface SectionDividerProps {
  /** Exact palette colour of the section that follows. */
  color: string;
  speed?: number;
  flip?: boolean;
  /** Tailwind height classes; reduce this for narrow ribbons. */
  height?: string;
}

/** Soft wave overlap between sections; sits behind the midground content. */
export default function SectionDivider({
  color,
  speed = 0.18,
  flip = false,
  height = 'h-12 sm:h-16',
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      data-parallax={speed}
      data-parallax-decor
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none ${height} ${flip ? 'rotate-180' : ''}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill={color}
        aria-hidden="true"
      >
        <path d="M0,64 C240,20 480,100 720,56 C960,12 1200,88 1440,40 L1440,120 L0,120 Z" />
      </svg>
    </div>
  );
}
