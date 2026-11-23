const fs = require('fs');

const baseBody = fs.readFileSync('scratch/sc_clean_base.jsx', 'utf8');

const testComponent = `'use client';

import React from 'react';
import Link from 'next/link';

export default function CakeShowcasePage() {
  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1c1c18] font-sans antialiased overflow-x-hidden selection:bg-[#E3A04B] selection:text-[#5C0302]">
      ${baseBody}
    </div>
  );
}
`;

fs.writeFileSync('app/cake-world/page.tsx', testComponent);
console.log('Written test component to app/cake-world/page.tsx');
