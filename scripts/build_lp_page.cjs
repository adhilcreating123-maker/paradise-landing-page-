const fs = require('fs');

const jsxBody = fs.readFileSync('scratch/lp_jsx_body.txt', 'utf8');

const fullComponent = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1c1c18] font-sans antialiased overflow-x-hidden selection:bg-[#E3A04B] selection:text-[#5C0302]">
      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1C050B]/80 backdrop-blur-md flex flex-col justify-between p-6 md:hidden animate-fade-in">
          <div className="flex items-center justify-between pb-6 border-b border-[#CA8B4A]/30">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl font-bold text-[#FDF2D8]">PARADISE BAKES</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-[#CA8B4A]/40 flex items-center justify-center text-[#FDF2D8] hover:bg-[#5C0302]"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8 text-base font-semibold uppercase tracking-wider text-[#FDF2D8]">
            <a onClick={() => setMobileMenuOpen(false)} href="#home" className="hover:text-[#E3A04B] transition-colors">Home</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#branches" className="hover:text-[#E3A04B] transition-colors">Our Branch</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#story" className="hover:text-[#E3A04B] transition-colors">Our Story</a>
            <Link onClick={() => setMobileMenuOpen(false)} href="/cake-world" className="hover:text-[#E3A04B] transition-colors">Cake World</Link>
            <a onClick={() => setMobileMenuOpen(false)} href="#life" className="hover:text-[#E3A04B] transition-colors">Life at Paradise</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#findus" className="hover:text-[#E3A04B] transition-colors">Find Us</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#reviews" className="hover:text-[#E3A04B] transition-colors">Reviews</a>
          </nav>

          <div className="pt-6 border-t border-[#CA8B4A]/30 flex flex-col gap-3">
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href="/cake-world"
              className="w-full text-center bg-[#9A1C20] hover:bg-[#5C0302] text-[#FDF2D8] text-xs font-semibold uppercase tracking-widest py-3.5 rounded-full shadow-lg"
            >
              Order Online
            </Link>
          </div>
        </div>
      )}

${jsxBody}
    </div>
  );
}
`;

// In jsxBody, replace menu button onclick to toggle mobileMenuOpen:
// <button aria-label="Open menu" class="..." ...> -> add onClick={() => setMobileMenuOpen(true)}
const updatedComponent = fullComponent.replace(
  /<button aria-label="Open menu"([^>]*)>/g,
  '<button aria-label="Open menu"$1 onClick={() => setMobileMenuOpen(true)}>'
);

fs.writeFileSync('app/page.tsx', updatedComponent);
console.log('Written to app/page.tsx successfully!');
