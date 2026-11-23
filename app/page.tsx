'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CakeAssembleAnimation from '../components/CakeAssembleAnimation';
import LifeCurvedCarousel from '../components/LifeCurvedCarousel';
import HeroSection from '../components/HeroSection';
import WriteReview from '../components/WriteReview';
import FooterReveal from '../components/FooterReveal';
import SectionDecor from '../components/SectionDecor';
import SectionDivider from '../components/SectionDivider';
import SectionLayers from '../components/SectionLayers';

const branchMaps = {
  Kattukulangara: 'https://maps.app.goo.gl/HdktFy3z33jXDytF9?g_st=ic',
  Olavanna: 'https://maps.app.goo.gl/49WfTtpBAKszr95N8?g_st=ic',
  Kulangarapeedika: 'https://maps.app.goo.gl/QCRyJKBEdF9bmrtv5?g_st=ic',
};
const cakeOrderHref = '/cake-world#custom-builder';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const storyPhotoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const photo = storyPhotoRef.current;
    const frame = photo?.parentElement;
    const section = frame?.closest('#story');
    if (!photo || !frame || !section) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(photo, { yPercent: 7 }, {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.fromTo(photo, { clipPath: 'inset(-1%)', opacity: 0.96 }, {
        clipPath: 'inset(0 0 0 0)',
        opacity: 1,
        duration: 0.45,
        immediateRender: false,
        scrollTrigger: { trigger: frame, start: 'top 90%', once: true },
      });

      let disposed = false;
      const refresh = () => {
        if (!disposed) ScrollTrigger.refresh();
      };
      photo.addEventListener('load', refresh, { once: true });
      void document.fonts.ready.then(refresh);
      return () => {
        disposed = true;
        photo.removeEventListener('load', refresh);
      };
    });
    return () => media.revert();
  }, []);

  // Lock body scroll while mobile drawer is open and handle Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    } else {
      document.body.style.overflow = '';
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    document.body.style.overflow = '';
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1c1c18] font-sans antialiased overflow-x-clip selection:bg-[#E3A04B] selection:text-[#5C0302]">
      
      {/* 
        1) MOBILE NAVIGATION DRAWER
        - Full screen / slide-in right drawer in site's cream/maroon style
        - Links stacked, 20px font, 56px tap height, staggered fade-in
        - "Order Online" button at bottom, close button, closes on link click and Escape
      */}
      <div
        ref={drawerRef}
        data-mobile-drawer
        data-lenis-prevent
        id="site-navigation"
        data-open={mobileMenuOpen ? 'true' : 'false'}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className="fixed inset-0 z-[60] bg-[#1C050B]/95 backdrop-blur-md flex flex-col justify-between site-gutter py-5 overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-6 border-b border-[#CA8B4A]/30">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-bold text-[#FDF2D8]">PARADISE BAKES</span>
          </div>
          <button
            onClick={closeMenu}
            className="w-11 h-11 rounded-full border border-[#CA8B4A]/40 flex items-center justify-center text-[#FDF2D8] hover:bg-[#5C0302] transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 py-6 text-xl font-semibold uppercase tracking-wider text-[#FDF2D8]">
          <a onClick={closeMenu} href="#home" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Home</a>
          <a onClick={closeMenu} href="#branches" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Our Branch</a>
          <a onClick={closeMenu} href="#story" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Our Story</a>
          <Link onClick={closeMenu} href="/cake-world" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Our Cake World</Link>
          <a onClick={closeMenu} href="#life" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Life at Paradise</a>
          <a onClick={closeMenu} href="#findus" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Find Us</a>
          <a onClick={closeMenu} href="#reviews" className="min-h-[56px] flex items-center hover:text-[#E3A04B] transition-colors">Reviews</a>
        </nav>

        <div className="pt-6 border-t border-[#CA8B4A]/30 flex flex-col gap-3">
          <Link
            onClick={closeMenu}
            href={cakeOrderHref}
            className="w-full min-h-[48px] flex items-center justify-center text-center bg-[#9A1C20] hover:bg-[#5C0302] text-[#FDF2D8] text-xs font-bold uppercase tracking-widest py-3.5 rounded-full shadow-lg"
          >
            Order Online
          </Link>
        </div>
      </div>

      {/* TOP ANNOUNCEMENT BAR */}
      <div data-enter="topbar" className="bg-[#5C0302] text-xs font-medium tracking-wider text-[#FDF2D8] py-2.5 site-gutter border-b border-[#CA8B4A]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E3A04B] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs">LIFE AT PARADISE ARTISANAL PATISSERIE &amp; CAFE • FRESH DAILY BAKES</span>
          </div>
          <div className="text-[#d7c1c4] tracking-widest text-[11px] uppercase font-semibold hidden lg:block">
            KULANGARAPEEDIKA • OLAVANNA • KATTUKULANGARA
          </div>
          <div className="text-[#E3A04B] font-medium flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>OPENING HOURS: 10:00 AM - 12:00 PM</span>
          </div>
        </div>
      </div>

      {/* 
        1) HEADER / NAV
        - Sticky, height about 64px on mobile (h-16), 80px on desktop (lg:h-20)
        - Logo height about 44px on mobile (h-11), 60px on desktop (lg:h-[60px])
        - Hamburger button opens drawer; desktop links hidden on mobile/tablet
      */}
      <header data-sticky-header data-enter="header" className="sticky top-0 z-50 bg-[#FDF2D8]/95 backdrop-blur-md border-b border-[#CA8B4A]/30 transition-all">
        <div className="site-shell h-16 lg:h-20 flex items-center justify-between">
          {/* Logo: 44px on mobile/tablet, 60px on desktop */}
          <a className="flex items-center group" href="#home">
            <img
              alt="Paradise Bakes Logo"
              className="h-11 lg:h-[60px] w-auto object-contain transition-transform group-hover:scale-105 duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDjtMyLuJAMudAi6V10AukPj5Uvu8-GYn-vlSJo_BfXIPp5VpendcUI1IoWgGLV8ZNB5vljXiN4Gco1FJTCO-OgDQNHN5xW5AcIxjNQj_EBWffCkjw-fBgnhOoijcuaxLEssnNXWDtWNHcL2nwNzW57l0-phPGPYwZDJg4nVsO3h2IRoAocEJv0u5oKT54b11uI7nko3EmN8mjxfd3eh27I-Y1OyiTmY8o8t6WU7ezVIN-LiXZ8a1V"
            />
          </a>

          {/* Navigation links: desktop only */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] font-semibold uppercase tracking-wider text-[#31302d]">
            <a className="nav-link text-[#5C0302] pb-1 font-bold" href="#home">Home</a>
            <a className="nav-link hover:text-[#5C0302] pb-1" href="#branches">Our Branch</a>
            <a className="nav-link hover:text-[#5C0302] pb-1" href="#story">Our Story</a>
            <a className="nav-link hover:text-[#5C0302] pb-1" href="/cake-world">Our Cake World</a>
            <a className="nav-link hover:text-[#5C0302] pb-1" href="#life">Life at Paradise</a>
            <a className="nav-link hover:text-[#5C0302] pb-1" href="#findus">Find Us</a>
            <a className="nav-link hover:text-[#5C0302] pb-1" href="#reviews">Reviews</a>
          </nav>

          {/* Right Action CTA & Hamburger button */}
          <div className="flex items-center gap-3">
            <a
              data-lift
              className="hidden sm:inline-flex bg-[#9A1C20] hover:bg-[#5C0302] text-[#FDF2D8] text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              href={cakeOrderHref}
            >
              Order Online
            </a>
            <button
              data-lift
              aria-label="Open menu"
              className="w-11 h-11 rounded-full border border-[#d7c1c4] flex items-center justify-center text-[#5C0302] hover:bg-[#ebe8e2] transition-colors lg:hidden"
              type="button"
              aria-controls="site-navigation"
              aria-expanded={mobileMenuOpen}
              onClick={(event) => {
                menuButtonRef.current = event.currentTarget;
                setMobileMenuOpen(true);
              }}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <button
              data-lift
              aria-label="More options"
              className="hidden lg:flex w-10 h-10 rounded-full border border-[#d7c1c4] items-center justify-center text-[#5C0302] hover:bg-[#ebe8e2] transition-colors"
              type="button"
              aria-controls="site-navigation"
              aria-expanded={mobileMenuOpen}
              onClick={(event) => {
                menuButtonRef.current = event.currentTarget;
                setMobileMenuOpen(true);
              }}
            >
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2) HOME HERO */}
      <HeroSection />

      {/* MARQUEE RIBBON */}
      <div data-parallax-section className="relative bg-[#E3A04B] text-[#5C0302] py-3.5 font-bold text-xs uppercase tracking-widest overflow-hidden shadow-inner select-none">
        <div data-parallax-depth="0.018" className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4">• HANDCRAFTED BUTTER CROISSANTS • BELGIAN CHOCOLATE TRUFFLES • FRENCH MACARONS • STONEGROUND SOURDOUGH • CUSTOM CELEBRATION CAKES • HANDCRAFTED BUTTER CROISSANTS • BELGIAN CHOCOLATE TRUFFLES • FRENCH MACARONS • STONEGROUND SOURDOUGH • CUSTOM CELEBRATION CAKES</span>
          <span className="mx-4">• HANDCRAFTED BUTTER CROISSANTS • BELGIAN CHOCOLATE TRUFFLES • FRENCH MACARONS • STONEGROUND SOURDOUGH • CUSTOM CELEBRATION CAKES • HANDCRAFTED BUTTER CROISSANTS • BELGIAN CHOCOLATE TRUFFLES • FRENCH MACARONS • STONEGROUND SOURDOUGH • CUSTOM CELEBRATION CAKES</span>
        </div>
        <SectionDivider color="#F2E4C9" speed={0.16} height="h-2 sm:h-3" />
      </div>

      {/* 
        3) OUR BRANCH
        - Phone (<640px): 1 column, full width, 20px gap, 20px padding, headings 22px, full-width tap buttons (call + directions)
        - Tablet (640-1023px): 2 columns
        - Desktop (1024px+): 3 columns, exact current design
        - Section padding: 56-64px on mobile (py-14 sm:py-20 lg:py-20), side padding 20px (site-gutter)
      */}
      <section className="relative overflow-x-clip bg-[#F2E4C9] py-14 sm:py-20 lg:py-20 site-gutter border-b border-[#d7c1c4]/60" id="branches" data-parallax-section="branches">
        <SectionLayers tone="light" variant="branches" delay={2} />
        <SectionDecor variant="branch" />
        <div data-layer="midground" className="relative z-10 max-w-7xl mx-auto">
          <div data-parallax-depth="-0.075" data-reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-[#5C0302] block mb-2">VISIT OUR LOCATIONS</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2f0211]">Our Branch</h2>
            <div className="w-16 h-0.5 bg-[#C9A34E] mx-auto mt-4"></div>
            <p className="mt-4 text-[#524346] text-sm sm:text-base">Step into any of our neighborhood patisseries to savor hot oven bakes, artisan desserts, and heartfelt Calicut warmth.</p>
          </div>

          {/* Cards grid: 1 col phone, 2 cols tablet, 3 cols desktop */}
          <div data-reveal-group className="flex flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            
            {/* Branch 1: Olavanna */}
            <div data-parallax="0.05" data-hover-card className="w-full bg-[#fdf9f3] rounded-2xl overflow-hidden shadow-md border border-[#e6e2dc] flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 sm:h-52 md:h-60 w-full overflow-hidden bg-stone-200">
                <img alt="Olavanna Branch" className="w-full h-full object-cover" src="/images/shop/olavanna shope image.png" />
                <div className="absolute top-3 left-3 bg-[#1C050B]/90 text-[#ffe088] text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border border-[#C9A34E]/50">
                  MAIN BRANCH • OLAVANNA
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[22px] sm:text-xl lg:text-2xl font-bold text-[#5C0302]">Olavanna Branch</h3>
                  <p className="text-sm sm:text-xs text-[#524346] mt-2 sm:mt-3 leading-relaxed">
                    Warm artisanal ambiance, expansive viewing bakery kitchen, fresh oven-baked viennoiserie, and our premier celebration gateaux studio.
                  </p>
                  <div className="mt-4 sm:mt-5 space-y-2 text-sm sm:text-xs text-[#1c1c18] border-t border-[#e6e2dc] pt-3 sm:pt-4 font-medium">
                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[#735c00] text-[18px]">schedule</span> 10:00 AM – 12:00 Midnight</p>
                    <a href="tel:+919744242477" className="flex items-center gap-2 hover:text-[#9A1C20]"><span className="material-symbols-outlined text-[#735c00] text-[18px]">call</span> +91 97442 42477</a>
                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[#735c00] text-[18px]">location_on</span> Near Calicut Road, Olavanna</p>
                  </div>
                </div>
                {/* Two full-width tap buttons on mobile (min-h-[44px]) */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-2 w-full">
                  <a
                    href="tel:+919744242477"
                    className="w-full sm:flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg border border-[#847375] text-xs font-semibold text-[#5C0302] hover:bg-[#ebe8e2] transition-colors text-center"
                  >
                    Call Branch
                  </a>
                  <a
                    href={branchMaps.Olavanna}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg bg-[#5C0302] hover:bg-[#430202] text-white text-xs font-semibold transition-colors text-center shadow-sm"
                  >
                    Get Directions
                  </a>
                </div>
                <Link href="/menu" className="mt-2 inline-flex min-h-[44px] items-center self-start text-sm font-semibold text-[#5C0302] underline underline-offset-4">View menu</Link>
              </div>
            </div>

            {/* Branch 2: Kattukulangara */}
            <div data-parallax="0.12" data-hover-card className="w-full bg-[#fdf9f3] rounded-2xl overflow-hidden shadow-md border border-[#e6e2dc] flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 sm:h-52 md:h-60 w-full overflow-hidden bg-stone-200">
                <img alt="Kattukulangara Branch" className="w-full h-full object-cover" src="/images/shop/katukulanagara shop image.png" />
                <div className="absolute top-3 left-3 bg-[#1C050B]/90 text-[#ffe088] text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border border-[#C9A34E]/50">
                  CAFE &amp; BAKE • STATION RD
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[22px] sm:text-xl lg:text-2xl font-bold text-[#5C0302]">Kattukulangara Branch</h3>
                  <p className="text-sm sm:text-xs text-[#524346] mt-2 sm:mt-3 leading-relaxed">
                    Intimate boutique cafe with specialty pour-over brews, delicate Parisian mousse cups, daily hot puffs, and cozy indoor seating.
                  </p>
                  <div className="mt-4 sm:mt-5 space-y-2 text-sm sm:text-xs text-[#1c1c18] border-t border-[#e6e2dc] pt-3 sm:pt-4 font-medium">
                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[#735c00] text-[18px]">schedule</span> 10:00 AM – 12:00 Midnight</p>
                    <a href="tel:+919846772424" className="flex items-center gap-2 hover:text-[#9A1C20]"><span className="material-symbols-outlined text-[#735c00] text-[18px]">call</span> +91 98467 72424</a>
                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[#735c00] text-[18px]">location_on</span> Station Junction, Kattukulangara</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-2 w-full">
                  <a
                    href="tel:+919846772424"
                    className="w-full sm:flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg border border-[#847375] text-xs font-semibold text-[#5C0302] hover:bg-[#ebe8e2] transition-colors text-center"
                  >
                    Call Branch
                  </a>
                  <a
                    href={branchMaps.Kattukulangara}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg bg-[#5C0302] hover:bg-[#430202] text-white text-xs font-semibold transition-colors text-center shadow-sm"
                  >
                    Get Directions
                  </a>
                </div>
                <Link href="/menu" className="mt-2 inline-flex min-h-[44px] items-center self-start text-sm font-semibold text-[#5C0302] underline underline-offset-4">View menu</Link>
              </div>
            </div>

            {/* Branch 3: Kulangarapeedika */}
            <div data-parallax="0.2" data-hover-card className="w-full bg-[#fdf9f3] rounded-2xl overflow-hidden shadow-md border border-[#e6e2dc] flex flex-col hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="relative h-48 sm:h-52 md:h-60 w-full overflow-hidden bg-stone-200">
                <img alt="Kulangarapeedika Branch" className="w-full h-full object-cover" src="/images/shop/kulangarapeedika-inpainted.jpg" />
                <div className="absolute top-3 left-3 bg-[#1C050B]/90 text-[#ffe088] text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase border border-[#C9A34E]/50">
                  EXPRESS OUTPOST • HIGHWAY
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[22px] sm:text-xl lg:text-2xl font-bold text-[#5C0302]">Kulangarapeedika Branch</h3>
                  <p className="text-sm sm:text-xs text-[#524346] mt-2 sm:mt-3 leading-relaxed">
                    Express takeaway counter stocked with hot savories, afternoon tea cookies, premium gift hampers, and on-demand celebration cakes.
                  </p>
                  <div className="mt-4 sm:mt-5 space-y-2 text-sm sm:text-xs text-[#1c1c18] border-t border-[#e6e2dc] pt-3 sm:pt-4 font-medium">
                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[#735c00] text-[18px]">schedule</span> 10:00 AM – 12:00 Midnight</p>
                    <a href="tel:+919946777707" className="flex items-center gap-2 hover:text-[#9A1C20]"><span className="material-symbols-outlined text-[#735c00] text-[18px]">call</span> +91 99467 77707</a>
                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-[#735c00] text-[18px]">location_on</span> Highway Corner, Kulangarapeedika</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-2 w-full">
                  <a
                    href="tel:+919946777707"
                    className="w-full sm:flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg border border-[#847375] text-xs font-semibold text-[#5C0302] hover:bg-[#ebe8e2] transition-colors text-center"
                  >
                    Call Branch
                  </a>
                  <a
                    href={branchMaps.Kulangarapeedika}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3 rounded-lg bg-[#5C0302] hover:bg-[#430202] text-white text-xs font-semibold transition-colors text-center shadow-sm"
                  >
                    Get Directions
                  </a>
                </div>
                <Link href="/menu" className="mt-2 inline-flex min-h-[44px] items-center self-start text-sm font-semibold text-[#5C0302] underline underline-offset-4">View menu</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        4) OUR STORY & HERITAGE
        - Mobile & Tablet: Single column (text first, image after), heading clamp(1.8rem, 7vw, 2.2rem), paragraphs 16px
        - Desktop: 2-column grid (lg:grid-cols-12, left 6, right 6), exact current desktop design
      */}
      <section className="relative overflow-x-clip bg-[#F2E4C9] py-14 sm:py-20 lg:py-24 site-gutter border-b border-[#CA8B4A]/30" id="story" data-parallax-section="story">
        <SectionLayers tone="light" variant="story" flip delay={4} />
        <SectionDecor variant="story" />
        <div data-layer="midground" className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Left Editorial Copy (First on mobile/tablet) */}
          <div data-parallax-depth="0.065" data-reveal="left" className="w-full lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9A1C20] block">OUR STORY &amp; HERITAGE</span>
            <h2 className="font-serif text-[clamp(1.8rem,7vw,2.2rem)] sm:text-4xl lg:text-5xl font-bold text-[#5C0302] leading-tight">
              Fresh from the oven, <br /><span className="italic font-normal text-[#5C0302]">every single morning.</span>
            </h2>
            <p className="text-base text-[#31302d] leading-relaxed">
              Founded with an uncompromising passion for slow-fermented crusts and genuine hospitality, Paradise Bakes has grown from a humble family oven into Kozhikode’s cherished neighborhood benchmark for artisanal baking.
            </p>
            <p className="text-base text-[#31302d] leading-relaxed">
              We refuse shortcuts. We use only cultured butter, stoneground unbleached flours, rich chocolate couvertures, and seasonal Malabar fruits. Each loaf takes up to thirty hours of patient sourdough fermentation before touching the stone hearth.
            </p>
            
            {/* Feature Pills / Stat Cards */}
            <div data-reveal-group className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2 sm:pt-4">
              <div className="p-3 sm:p-3.5 bg-[#fdf9f3] rounded-xl border border-[#C9A34E]/40 text-center shadow-sm">
                <span className="block font-serif text-lg font-bold text-[#9A1C20]">01</span>
                <span className="block text-xs font-semibold text-[#1c1c18] mt-1">Three Branches</span>
                <span className="block text-[11px] text-[#524346]">Across Calicut</span>
              </div>
              <div className="p-3 sm:p-3.5 bg-[#fdf9f3] rounded-xl border border-[#C9A34E]/40 text-center shadow-sm">
                <span className="block font-serif text-lg font-bold text-[#9A1C20]">02</span>
                <span className="block text-xs font-semibold text-[#1c1c18] mt-1">Baked Daily</span>
                <span className="block text-[11px] text-[#524346]">Zero preservatives</span>
              </div>
              <div className="p-3 sm:p-3.5 bg-[#fdf9f3] rounded-xl border border-[#C9A34E]/40 text-center shadow-sm">
                <span className="block font-serif text-lg font-bold text-[#9A1C20]">03</span>
                <span className="block text-xs font-semibold text-[#1c1c18] mt-1">Made to Order</span>
                <span className="block text-[11px] text-[#524346]">Bespoke celebration</span>
              </div>
            </div>
          </div>

          {/* Right Arch Photography (After text on mobile/tablet) */}
          <div className="w-full lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Arched Photo Container */}
              <figure className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-2xl border-4 border-[#C9A34E] bg-[#F1E4C8] shadow-2xl after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/60 after:via-transparent after:to-transparent">
                <img
                  ref={storyPhotoRef}
                  alt="Baker shaping dough by hand"
                  width={900}
                  height={506}
                  loading="eager"
                  className="absolute -top-[9%] left-0 h-[118%] w-full object-cover"
                  src="/images/life/life-12.jpg"
                />
              </figure>
              {/* Pure Heritage Badge */}
              <div className="absolute z-10 -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 bg-[#5C0302] text-[#FDF2D8] p-3.5 sm:p-5 rounded-2xl shadow-xl border border-[#C9A34E]/60 max-w-[170px] sm:max-w-[200px]">
                <span className="text-[#ffe088] font-bold text-xs uppercase tracking-widest block">★ Pure Heritage</span>
                <p className="text-[11px] text-[#ffd7c9] mt-1">Honoring time-tested French patisserie methods in Calicut.</p>
              </div>
              {/* Overlapping Circular Badge Logo */}
              <div className="absolute z-10 -top-4 -right-3 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#fdf9f3] rounded-full p-2 shadow-xl border border-[#C9A34E]/50 flex items-center justify-center animate-spin-slow">
                <img
                  alt="Badge Logo"
                  className="w-full h-full object-contain"
                  src="/images/logo.jpg"
                />
              </div>
            </div>
          </div>

        </div>
        <SectionDivider color="#9A1C20" speed={0.18} />
      </section>

      {/* 
        5) STEP INTO CAKE WORLD
        - Mobile & Tablet: Stack (Text first, then cake animation below it, centred)
        - Full-width button on mobile, animation container size min(88vw, 360px)
        - Desktop: Left 7 cols, Right 5 cols, exact current desktop design
      */}
      <section className="relative bg-[#9A1C20] text-[#FDF2D8] py-14 sm:py-20 lg:py-24 site-gutter overflow-x-clip" id="cakeworld" data-parallax-section="cakeworld">
        {/* Base Warm Vignette Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9A1C20] via-[#5C0302] to-[#5C0302] pointer-events-none opacity-80 z-0"></div>

        {/* Ambient Gold Glow */}
        <div data-parallax="0.1" data-parallax-mobile-hide
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 950px 700px at 68% 50%, rgba(201, 163, 78, 0.16) 0%, rgba(227, 160, 75, 0.08) 50%, transparent 80%)',
          }}
        />

        {/* Watermark: "OUR CAKE WORLD" */}
        <div data-parallax="0.1" data-parallax-mobile-hide className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span className="font-serif font-bold tracking-[0.22em] text-[60px] sm:text-[130px] lg:text-[180px] text-[#C9A34E] opacity-[0.045] whitespace-nowrap leading-none select-none">
            OUR CAKE WORLD
          </span>
        </div>

        <SectionLayers tone="dark" variant="cakeworld" delay={6} />
        <SectionDecor variant="cakeworld" />

        <div data-layer="midground" className="max-w-7xl mx-auto flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-12 items-center relative z-10">
          
          {/* Text block: First on mobile/tablet */}
          <div data-parallax-depth="0.07" data-reveal-group className="w-full lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-6 relative z-20">
            <div className="inline-flex items-center gap-2 bg-[#1C050B]/60 border border-[#C9A34E]/50 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#ffe088] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34E]"></span>Experience The Art of Celebration
            </div>
            <h2 className="font-serif text-[clamp(1.8rem,7vw,2.4rem)] sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Step into <span className="italic font-normal text-[#C9A34E]">Our Cake World.</span>
            </h2>
            <p className="text-base text-[#ffd7c9] leading-relaxed max-w-xl">
              We&apos;re excited to share that Paradise is now making your cake experience easier, safer, and more affordable than ever. Every cake is prepared with strict hygiene and genuine care, so you can enjoy sweetness with complete peace of mind. We believe great quality shouldn&apos;t be expensive, which is why our prices stay friendly and budget-smart while keeping our standards high.
            </p>
            
            {/* Check chips: stacked on small phones, wrapping on tablet/desktop */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5 pt-2 text-xs font-medium text-[#fdf9f3] w-full">
              <div className="flex items-center gap-2 bg-[#1C050B]/60 border border-[#C9A34E]/40 px-3.5 py-2 rounded-full text-xs">
                <span className="text-[#C9A34E] font-bold">✓</span> Strict Kitchen Hygiene
              </div>
              <div className="flex items-center gap-2 bg-[#1C050B]/60 border border-[#C9A34E]/40 px-3.5 py-2 rounded-full text-xs">
                <span className="text-[#C9A34E] font-bold">✓</span> Pocket-Friendly Luxury
              </div>
              <div className="flex items-center gap-2 bg-[#1C050B]/60 border border-[#C9A34E]/40 px-3.5 py-2 rounded-full text-xs">
                <span className="text-[#C9A34E] font-bold">✓</span> Handcrafted with Love &amp; Care
              </div>
              <div className="flex items-center gap-2 bg-[#1C050B]/60 border border-[#C9A34E]/40 px-3.5 py-2 rounded-full text-xs">
                <span className="text-[#C9A34E] font-bold">✓</span> Safe Temperature Delivery
              </div>
            </div>

            {/* CTA button: full-width on mobile */}
            <div className="pt-2 sm:pt-4 w-full sm:w-auto">
              <a
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 bg-[#E3A04B] hover:bg-[#CA8B4A] text-[#5C0302] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all shadow-xl hover:gap-4 text-center"
                href="/cake-world"
              >
                <span>Enter Our Cake World</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Cake animation: Below text, centered on mobile/tablet */}
          <div className="w-full lg:col-span-5 flex items-center justify-center relative z-10 overflow-visible">
            <CakeAssembleAnimation />
          </div>

        </div>
        <SectionDivider color="#5C0302" speed={0.2} />
      </section>

      {/* 
        6) LIFE AT PARADISE (Curved Carousel)
        - Phone: 3 cards (centre + 1 each side), width min(66vw, 260px), height 340px
        - Tablet: 5 cards
        - Desktop: 7 cards, exact current design
      */}
      <section className="relative bg-[#5C0302] text-[#FDF2D8] py-14 sm:py-20 lg:py-24 site-gutter border-b border-[#CA8B4A]/30 overflow-x-clip" id="life" data-parallax-section="life">
        <SectionLayers tone="dark" variant="life" flip delay={8} />
        <SectionDecor variant="life" />
        <div data-layer="midground" className="relative z-10 max-w-7xl mx-auto">
          <div data-parallax="0.05" data-reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#ffe088] block mb-2">MOMENTS IN THE BAKERY</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Life at Paradise</h2>
            <div className="w-16 h-0.5 bg-[#C9A34E] mx-auto mt-4"></div>
            <p className="mt-4 text-[#ffd7c9]/80 text-sm sm:text-base">
              A glimpse into our flour-filled mornings, joyous laughter over freshly brewed coffee, and the artisan hands that craft your sweet memories.
            </p>
          </div>
          {/* 15-Moment Curved Arc Carousel */}
          <LifeCurvedCarousel />
        </div>
        <SectionDivider color="#F2E4C9" speed={0.17} />
      </section>

      {/* 
        7) FIND US ACROSS KOZHIKODE
        - Mobile: Info cards stacked in 1 column, map height 280px, phone/directions tap actions
        - Tablet: 2 columns
        - Desktop: 3 columns, exact current design
      */}
      <section className="relative overflow-x-clip bg-[#F2E4C9] py-14 sm:py-20 lg:py-24 site-gutter border-b border-[#CA8B4A]/30" id="findus" data-parallax-section="findus">
        <SectionLayers tone="light" variant="findus" delay={10} />
        <SectionDecor variant="findus" />
        <div data-layer="midground" className="relative z-10 max-w-7xl mx-auto">
          <div data-parallax-depth="-0.06" data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#9A1C20] block mb-2">FIND US ACROSS BRANCH</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5C0302]">Find Us Across Kozhikode</h2>
              <p className="text-sm text-[#524346] mt-2">Visit our nearest branch or service center to get in touch with our team across Kozhikode.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#FDF2D8] border border-[#CA8B4A]/40 px-4 py-2 rounded-full text-xs font-semibold text-[#5C0302] shadow-sm self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#9A1C20] animate-pulse"></span>
              LOCATION SEARCH ACTIVE
            </div>
          </div>

          <div data-reveal-group className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            
            {/* Map Card 1: Kattukulangara */}
            <div data-parallax="0.08" data-hover-card className="w-full bg-[#fdf9f3] rounded-2xl p-5 sm:p-4 shadow-sm border border-[#CA8B4A]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#735c00]">Branch 01</span>
                  <span className="material-symbols-outlined text-[#E3A04B] text-lg">pin_drop</span>
                </div>
                <h3 className="font-serif text-xl sm:text-lg lg:text-xl font-bold text-[#5C0302] mb-3">Kattukulangara Branch</h3>
                
                {/* Map Container: 280px height on mobile */}
                <a
                  data-parallax="0.04"
                  href={branchMaps.Kattukulangara}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Kattukulangara map in Google Maps (opens in a new tab)"
                  className="block h-[260px] sm:h-40 md:h-44 w-full rounded-xl overflow-hidden border border-[#CA8B4A]/30 relative mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A1C20]"
                >
                  <Image
                    src="/images/map/katukulangara map gif.gif"
                    alt="Kattukulangara Map Location"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#1C050B]/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded text-[#ffe088] border border-[#C9A34E]/50">
                    Open Maps
                  </div>
                </a>

                {/* Details with direct tap actions */}
                <div className="space-y-2 text-sm sm:text-xs text-[#524346]">
                  <a
                    href={branchMaps.Kattukulangara}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-[#5C0302]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0 mt-0.5">location_on</span>
                    <span>Station Junction, Kattukulangara, Kozhikode</span>
                  </a>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0">schedule</span>
                    <span>10:00 AM – 12:00 PM</span>
                  </p>
                  <a href="tel:+919846772424" className="flex items-center gap-2 font-semibold text-[#1c1c18] hover:text-[#5C0302]">
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0">call</span>
                    <span>+91 98467 72424</span>
                  </a>
                </div>
              </div>

              <a
                className="mt-5 w-full min-h-[44px] py-3 bg-[#5C0302] hover:bg-[#430202] text-[#FDF2D8] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
                href={branchMaps.Kattukulangara}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                GET DIRECTIONS ON MAPS
              </a>
            </div>

            {/* Map Card 2: Olavanna */}
            <div data-parallax="0.12" data-hover-card className="w-full bg-[#fdf9f3] rounded-2xl p-5 sm:p-4 shadow-sm border border-[#CA8B4A]/40 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#735c00]">Branch 02</span>
                  <span className="material-symbols-outlined text-[#E3A04B] text-lg">pin_drop</span>
                </div>
                <h3 className="font-serif text-xl sm:text-lg lg:text-xl font-bold text-[#5C0302] mb-3">Olavanna Branch</h3>
                
                <a
                  data-parallax="0.04"
                  href={branchMaps.Olavanna}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Olavanna map in Google Maps (opens in a new tab)"
                  className="block h-[260px] sm:h-40 md:h-44 w-full rounded-xl overflow-hidden border border-[#CA8B4A]/30 relative mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A1C20]"
                >
                  <Image
                    src="/images/map/olavanna map gif.gif"
                    alt="Olavanna Map Location"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#1C050B]/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded text-[#ffe088] border border-[#C9A34E]/50">
                    Open Maps
                  </div>
                </a>

                <div className="space-y-2 text-sm sm:text-xs text-[#524346]">
                  <a
                    href={branchMaps.Olavanna}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-[#5C0302]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0 mt-0.5">location_on</span>
                    <span>Near Calicut Road, Olavanna, Kozhikode</span>
                  </a>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0">schedule</span>
                    <span>10:00 AM – 12:00 PM</span>
                  </p>
                  <a href="tel:+919744242477" className="flex items-center gap-2 font-semibold text-[#1c1c18] hover:text-[#5C0302]">
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0">call</span>
                    <span>+91 97442 42477</span>
                  </a>
                </div>
              </div>

              <a
                className="mt-5 w-full min-h-[44px] py-3 bg-[#5C0302] hover:bg-[#430202] text-[#FDF2D8] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
                href={branchMaps.Olavanna}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                GET DIRECTIONS ON MAPS
              </a>
            </div>

            {/* Map Card 3: Kulangarapeedika */}
            <div data-parallax="0.16" data-hover-card className="w-full bg-[#fdf9f3] rounded-2xl p-5 sm:p-4 shadow-sm border border-[#CA8B4A]/40 flex flex-col justify-between hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#735c00]">Branch 03</span>
                  <span className="material-symbols-outlined text-[#E3A04B] text-lg">pin_drop</span>
                </div>
                <h3 className="font-serif text-xl sm:text-lg lg:text-xl font-bold text-[#5C0302] mb-3">Kulangarapeedika Branch</h3>
                
                <a
                  data-parallax="0.04"
                  href={branchMaps.Kulangarapeedika}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Kulangarapeedika map in Google Maps (opens in a new tab)"
                  className="block h-[260px] sm:h-40 md:h-44 w-full rounded-xl overflow-hidden border border-[#CA8B4A]/30 relative mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A1C20]"
                >
                  <Image
                    src="/images/map/kulangarapeedika map gif.gif"
                    alt="Kulangarapeedika Map Location"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#1C050B]/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded text-[#ffe088] border border-[#C9A34E]/50">
                    Open Maps
                  </div>
                </a>

                <div className="space-y-2 text-sm sm:text-xs text-[#524346]">
                  <a
                    href={branchMaps.Kulangarapeedika}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-[#5C0302]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0 mt-0.5">location_on</span>
                    <span>Highway Corner, Kulangarapeedika, Kozhikode</span>
                  </a>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0">schedule</span>
                    <span>10:00 AM – 12:00 PM</span>
                  </p>
                  <a href="tel:+919946777707" className="flex items-center gap-2 font-semibold text-[#1c1c18] hover:text-[#5C0302]">
                    <span className="material-symbols-outlined text-[16px] text-[#5C0302] shrink-0">call</span>
                    <span>+91 99467 77707</span>
                  </a>
                </div>
              </div>

              <a
                className="mt-5 w-full min-h-[44px] py-3 bg-[#5C0302] hover:bg-[#430202] text-[#FDF2D8] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center flex items-center justify-center gap-2"
                href={branchMaps.Kulangarapeedika}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                GET DIRECTIONS ON MAPS
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 
        8) CUSTOMER REVIEWS
        - Mobile: Rating summary stacked & centred, cards horizontal swipe slider (85vw) or column, text 15px
        - Tablet: 2 columns
        - Desktop: 3 columns, exact current design
      */}
      <section className="relative overflow-x-clip bg-[#F2E4C9] py-14 sm:py-20 lg:py-24 site-gutter border-b border-[#d7c1c4]/60" id="reviews" data-parallax-section="reviews">
        <SectionLayers tone="light" variant="reviews" flip delay={12} />
        <SectionDecor variant="reviews" />
        <div data-layer="midground" className="relative z-10 max-w-7xl mx-auto">
          
          <div data-parallax-depth="-0.06" data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 text-center md:text-left items-center md:items-start">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#5C0302] block mb-2">KOZHIKODE&apos;S MOST LOVED PATISSERIE</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2f0211]">Loved by Thousands Across Calicut</h2>
            </div>
            
            {/* Google Rating Badge: centered on mobile */}
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#d7c1c4] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow font-bold text-amber-600 text-lg border">
                G
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-[#cca830] text-sm">
                  ★★★★★
                  <span className="font-bold text-[#1c1c18] ml-1 text-sm">4.6</span>
                </div>
                <span className="text-[11px] text-[#524346]">44+ Google Reviews</span>
              </div>
              <WriteReview />
            </div>
          </div>

          {/* Review cards: 85vw swipe slider on mobile, 2 cols on tablet, 3 cols on desktop */}
          <div data-reveal-group className="flex overflow-x-auto gap-4 pb-4 px-1 snap-x snap-mandatory hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8 sm:pb-0 sm:px-0 sm:overflow-visible">
            
            {/* Review 1 */}
            <div data-parallax="0.05" data-hover-card className="w-[85vw] max-w-[340px] shrink-0 snap-center sm:w-auto bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e6e2dc] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#cca830] text-sm tracking-widest">★★★★★</div>
                  <span className="text-[10px] text-[#735c00] bg-[#fef9ee] border border-[#CA8B4A]/30 px-2 py-0.5 rounded-full font-medium">5 months ago</span>
                </div>
                <p className="text-[15px] sm:text-sm text-[#31302d] italic leading-relaxed">
                  &ldquo;Excellent bakery with a wide variety of fresh cakes, snacks, shawarma, shawaya, fried chicken, and juices. The food is tasty, the shop is clean, and the staff are friendly. Highly recommended for quality food and bakery items in Kattukulangara.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f1ede7] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#1c1c18]">Muhammed Fahad.v</h5>
                  <span className="text-[10px] text-[#524346]">Local Guide • Google Review</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">Verified</span>
              </div>
            </div>

            {/* Review 2 */}
            <div data-parallax="0.1" data-hover-card className="w-[85vw] max-w-[340px] shrink-0 snap-center sm:w-auto bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e6e2dc] flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#cca830] text-sm tracking-widest">★★★★★</div>
                  <span className="text-[10px] text-[#735c00] bg-[#fef9ee] border border-[#CA8B4A]/30 px-2 py-0.5 rounded-full font-medium">5 months ago</span>
                </div>
                <p className="text-[15px] sm:text-sm text-[#31302d] italic leading-relaxed">
                  &ldquo;Tried the signature Shawaya at Paradise Bakery &amp; Restaurant, and it was really good. Their bakery and sweet selection is also worth trying… fresh, delicious, and perfect with a cup of tea. A great new spot in Kozhikode!&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f1ede7] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#1c1c18]">RPM</h5>
                  <span className="text-[10px] text-[#524346]">Local Guide • 650+ reviews</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">Verified</span>
              </div>
            </div>

            {/* Review 3 */}
            <div data-parallax="0.15" data-hover-card className="w-[85vw] max-w-[340px] shrink-0 snap-center sm:w-auto bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e6e2dc] flex flex-col justify-between hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[#cca830] text-sm tracking-widest">★★★★★</div>
                  <span className="text-[10px] text-[#735c00] bg-[#fef9ee] border border-[#CA8B4A]/30 px-2 py-0.5 rounded-full font-medium">4 months ago</span>
                </div>
                <p className="text-[15px] sm:text-sm text-[#31302d] italic leading-relaxed">
                  &ldquo;Everything was great—the service, the atmosphere, the works. And their puffs? Man, they are absolutely amazing—a must-try.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f1ede7] flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#1c1c18]">Safvan Jr</h5>
                  <span className="text-[10px] text-[#524346]">Google Reviewer</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">Verified</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-x-clip bg-[#F2E4C9] py-14 sm:py-20 site-gutter border-b border-[#CA8B4A]/30 text-center" data-parallax-section="cta">
        <SectionLayers tone="light" variant="cta" delay={14} />
        <div data-layer="midground" data-reveal className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
          <img data-parallax-depth="-0.065"
            alt="Paradise Bakes Logo"
            className="h-12 sm:h-16 mx-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDjtMyLuJAMudAi6V10AukPj5Uvu8-GYn-vlSJo_BfXIPp5VpendcUI1IoWgGLV8ZNB5vljXiN4Gco1FJTCO-OgDQNHN5xW5AcIxjNQj_EBWffCkjw-fBgnhOoijcuaxLEssnNXWDtWNHcL2nwNzW57l0-phPGPYwZDJg4nVsO3h2IRoAocEJv0u5oKT54b11uI7nko3EmN8mjxfd3eh27I-Y1OyiTmY8o8t6WU7ezVIN-LiXZ8a1V"
          />
          <span className="text-xs font-bold uppercase tracking-widest text-[#9A1C20] block">BESPOKE ORDERS &amp; DAILY DELIGHTS</span>
          <h2 data-parallax-depth="0.035" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5C0302]">Crafting Sweet Memories</h2>
          <p className="text-sm sm:text-base text-[#5C0302]/80 leading-relaxed">
            Let us bake the centerpiece for your next wedding, anniversary, or intimate afternoon coffee break. Reach out to our bakery master team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto min-h-[48px] bg-[#9A1C20] hover:bg-[#5C0302] border border-[#CA8B4A]/40 text-[#FDF2D8] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center text-center"
              href={cakeOrderHref}
            >
              Order Online Now
            </a>
            <a
              className="w-full sm:w-auto min-h-[48px] border border-[#5C0302] bg-[#fdf9f3] text-[#5C0302] hover:bg-[#5C0302] hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all shadow-sm hover:-translate-y-0.5 flex items-center justify-center text-center"
              href="#findus"
            >
              Find Nearest Branch
            </a>
          </div>
        </div>
        <SectionDivider color="#5C0302" speed={0.19} />
      </section>

      {/* 
        9) FOOTER
        - Mobile: 1 column, tap targets 44px, branch blocks stacked, links 2-col grid
        - Tablet: 2 columns
        - Desktop: 5 columns (lg:grid-cols-5), exact current design
      */}
      <footer id="contact" className="relative overflow-hidden bg-[#5C0302] text-[#FDF2D8] pt-12 sm:pt-16 pb-8 sm:pb-10 site-gutter border-t border-[#CA8B4A]/30">
        <SectionDecor variant="footer" />
        <FooterReveal className="relative z-10">
        <div data-parallax-depth="0.07" data-reveal-group className="max-w-7xl mx-auto flex flex-col gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 pb-8 sm:pb-12 border-b border-[#CA8B4A]/30">
          
          {/* Brand Info */}
          <div className="w-full sm:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Paradise Bakes Logo"
                className="h-10 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDjtMyLuJAMudAi6V10AukPj5Uvu8-GYn-vlSJo_BfXIPp5VpendcUI1IoWgGLV8ZNB5vljXiN4Gco1FJTCO-OgDQNHN5xW5AcIxjNQj_EBWffCkjw-fBgnhOoijcuaxLEssnNXWDtWNHcL2nwNzW57l0-phPGPYwZDJg4nVsO3h2IRoAocEJv0u5oKT54b11uI7nko3EmN8mjxfd3eh27I-Y1OyiTmY8o8t6WU7ezVIN-LiXZ8a1V"
              />
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">PARADISE BAKES</h4>
                <span className="text-[10px] tracking-widest text-[#C9A34E] uppercase">Artisanal Patisserie • Kozhikode</span>
              </div>
            </div>
            <p className="text-xs text-[#ffd7c9]/80 leading-relaxed max-w-sm">
              Committed to classical slow baking, French butter viennoiserie, and memorable celebrations across Kozhikode since our inception.
            </p>
          </div>

          {/* Quick Links: 2 columns on mobile */}
          <div className="w-full space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#ffe088]">Quick Links</h5>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs text-[#ffd7c9]/70">
              <li><a className="min-h-[44px] flex items-center hover:text-white transition-colors" href="#home">Home</a></li>
              <li><a className="min-h-[44px] flex items-center hover:text-white transition-colors" href="#branches">Our Branches</a></li>
              <li><a className="min-h-[44px] flex items-center hover:text-white transition-colors" href="#story">Our Story</a></li>
              <li><a className="min-h-[44px] flex items-center hover:text-white transition-colors" href="/cake-world">Our Cake World</a></li>
              <li><a className="min-h-[44px] flex items-center hover:text-white transition-colors" href="#life">Life at Paradise</a></li>
            </ul>
          </div>

          {/* Our Branches: stacked blocks */}
          <div className="w-full space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#ffe088]">Our Branches</h5>
            <ul className="space-y-3 text-xs text-[#ffd7c9]/70">
              <li>
                <strong className="text-white block">Olavanna Branch:</strong>
                Near Calicut Road, Kozhikode<br />
                <a href="tel:+919744242477" className="hover:text-white">+91 97442 42477</a>
              </li>
              <li>
                <strong className="text-white block">Kattukulangara Branch:</strong>
                Station Rd Junction<br />
                <a href="tel:+919846772424" className="hover:text-white">+91 98467 72424</a>
              </li>
              <li>
                <strong className="text-white block">Kulangarapeedika:</strong>
                Main Highway Corner<br />
                <a href="tel:+919946777707" className="hover:text-white">+91 99467 77707</a>
              </li>
            </ul>
          </div>

          {/* Hours & Delivery */}
          <div className="w-full space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#ffe088]">Hours &amp; Delivery</h5>
            <p className="text-xs text-[#ffd7c9]/80">
              Open 7 Days a Week<br />
              <strong className="text-white">10:00 AM – 12:00 Midnight</strong>
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9A34E] block mb-1.5">Delivery &amp; Pickup:</span>
              <div className="flex flex-col gap-1.5 text-xs font-medium text-white">
                <span className="px-2 py-1 bg-[#3B0813] border border-[#C9A34E]/30 rounded inline-block w-fit">5 km Delivery</span>
                <span className="px-2 py-1 bg-[#3B0813] border border-[#C9A34E]/30 rounded inline-block w-fit">Direct Counter Pickup</span>
              </div>
            </div>
          </div>

        </div>
        </FooterReveal>

        <div data-parallax-depth="0.025" data-reveal className="relative z-10 max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#ffd7c9]/60 gap-4 text-center sm:text-left">
          <p>© 2026 Paradise Bakes &amp; Patisserie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="min-h-[44px] flex items-center hover:text-white transition-colors" href="#findus">Google Maps</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
