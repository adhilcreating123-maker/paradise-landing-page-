import type { Metadata } from 'next';
import MotionProvider from '../components/motion-provider';
import ParallaxEngine from '../components/ParallaxEngine';
import ScrollProgress from '../components/ScrollProgress';
import SmoothScroll from '../components/smooth-scroll';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Paradise Bakes & Patisserie — Kozhikode',
  description:
    'Artisanal Patisserie & Cafe in Kozhikode. Handcrafted Daily, 100% Pure Butter, Calicut’s Finest Cakes and Pastries.',
  icons: {
    icon: '/favicon.ico',
  },
};

// Arming animation classes before first paint avoids a flash of hidden
// content. If the provider never mounts, a short timeout reveals everything.
// `data-js-motion` is rendered by the server so hydration sees the exact same
// attribute. `<noscript>` below unhides everything when scripting is disabled.
// The failsafe injects a stylesheet instead of mutating a hydrated element.
const motionBootstrap = `
(function () {
  try {
    setTimeout(function () {
      if (!document.documentElement.hasAttribute('data-motion-ready')) {
        var style = document.createElement('style');
        style.textContent =
          'html[data-js-motion] [data-enter],' +
          'html[data-js-motion] [data-enter] > *,' +
          'html[data-js-motion] [data-reveal],' +
          'html[data-js-motion] [data-reveal-group] > *' +
          '{opacity:1!important;transform:none!important;animation:none!important}';
        document.head.appendChild(style);
      }
    }, 2500);
  } catch (error) {}
})();
`;

const noMotionStyles = `
  html[data-js-motion] [data-enter],
  html[data-js-motion] [data-enter] > *,
  html[data-js-motion] [data-reveal],
  html[data-js-motion] [data-reveal-group] > * {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-js-motion="">
      <head>
        <noscript><style dangerouslySetInnerHTML={{ __html: noMotionStyles }} /></noscript>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#E3A04B] selection:text-[#5C0302]">
        <ScrollProgress />
        <MotionProvider />
        <SmoothScroll>
          <ParallaxEngine />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
