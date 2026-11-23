const fs = require('fs');

let body = fs.readFileSync('scratch/sc_clean_base.jsx', 'utf8');

// 1. View Mode Toggling
body = body.replace(
  'id="btn-view-shelf"',
  'id="btn-view-shelf" onClick={() => setViewMode(\'shelf\')} aria-pressed={viewMode === \'shelf\'}'
);
body = body.replace(
  'id="btn-view-full"',
  'id="btn-view-full" onClick={() => setViewMode(\'full\')} aria-pressed={viewMode === \'full\'}'
);

// Toggle container visibility
body = body.replace(
  'id="vitrine-shelves-wrapper"',
  'id="vitrine-shelves-wrapper" style={{ display: viewMode === \'shelf\' ? \'block\' : \'none\' }}'
);
body = body.replace(
  'id="vitrine-full-view"',
  'id="vitrine-full-view" style={{ display: viewMode === \'full\' ? \'block\' : \'none\' }}'
);

// 2. In-Stock Toggle: remove aria-pressed="false"
body = body.replace(
  /<button\s+aria-pressed="false"\s+className="([^"]*)"\s+id="instock-toggle"\s+type="button">/,
  '<button aria-pressed={inStockOnly} className="$1" id="instock-toggle" type="button" onClick={() => setInStockOnly(!inStockOnly)}>'
);

// Thumb translation for in-stock toggle
body = body.replace(
  /<span className="[^"]*" id="toggle-thumb"><\/span>/,
  '<span id="toggle-thumb" className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 transform ${inStockOnly ? \'translate-x-3.5 bg-[#5C0302]\' : \'translate-x-0 bg-[#CA8B4A]\'}`}></span>'
);

// 3. Category Buttons
const cats = [
  { label: 'All Cakes (15)', val: 'All Cakes' },
  { label: 'Signature Gateaux (5)', val: 'Signature Gateaux' },
  { label: 'Chocolate Indulgence (4)', val: 'Chocolate Indulgence' },
  { label: 'Fruit & Berry (3)', val: 'Fruit & Berry' },
  { label: 'Exotic & Premium (3)', val: 'Exotic & Premium' }
];

cats.forEach(c => {
  const pattern = new RegExp(`(<button[^>]*>\\s*${c.label.replace('&', '&amp;')}[\\s\\S]*?<\\/button>)`, 'gi');
  body = body.replace(pattern, (match) => {
    return match.replace('<button', `<button onClick={() => setActiveCategory('${c.val}')}`);
  });
});

// 4. Cake card click handlers
const cakeClickMap = [
  { name: 'Red Velvet Rose', key: 'red-velvet' },
  { name: 'Oreo Chocolate', key: 'oreo-chocolate' },
  { name: 'Royal Berry Gateau', key: 'royal-berry' },
  { name: 'Ferrero Rocher', key: 'ferrero-rocher' },
  { name: 'Belgian Truffle', key: 'belgian-truffle' },
  { name: 'Black Forest', key: 'black-forest' },
  { name: 'Dark Truffle Noir', key: 'dark-truffle' },
  { name: 'Dark Truffle', key: 'dark-truffle' },
  { name: 'Salted Caramel Crunch', key: 'salted-caramel' },
  { name: 'Salted Caramel', key: 'salted-caramel' },
  { name: 'Royal Berry', key: 'royal-berry' }
];

cakeClickMap.forEach(item => {
  const pattern = new RegExp(`(<div[^>]*className="[^"]*cake-card[^"]*"[^>]*)>([\\s\\S]*?<h[34][^>]*>\\s*${item.name}\\s*<\\/h[34]>)`, 'gi');
  body = body.replace(pattern, (match, tag, rest) => {
    if (tag.includes('onClick')) return match;
    return `${tag} onClick={() => handleSelectCake('${item.key}')}>${rest}`;
  });
});

// 5. Cake Detail Panel live bindings
body = body.replace(
  /<h2\b([^>]*id="detail-cake-name"[^>]*)>([\s\S]*?)<\/h2>/,
  '<h2 $1>{currentCake.displayName}</h2>'
);

body = body.replace(
  /<div\b([^>]*id="detail-cake-total-price"[^>]*)>([\s\S]*?)<\/div>/,
  '<div $1>₹{calculatedReadyMadePrice}</div>'
);

body = body.replace(
  /<span\b([^>]*id="detail-cake-rate"[^>]*)>([\s\S]*?)<\/span>/,
  '<span $1>₹{currentCake.pricePerKg}</span>'
);

// detail-cake-img and detail-cake-img-mobile: remove old alt and old src
body = body.replace(
  /<img\s+alt="[^"]*"\s+className="([^"]*)"\s+id="detail-cake-img-mobile"\s+src="[^"]*"\s*\/>/,
  '<img className="$1" id="detail-cake-img-mobile" src={currentCake.img} alt={currentCake.displayName} />'
);

body = body.replace(
  /<img\s+alt="[^"]*"\s+className="([^"]*)"\s+id="detail-cake-img"\s+src="[^"]*"\s*\/>/,
  '<img className="$1" id="detail-cake-img" src={currentCake.img} alt={currentCake.displayName} />'
);

// Weight pills
const wts = [0.5, 1.0, 1.5, 2.0, 3.0];
wts.forEach(w => {
  const wStr = w === 1.0 ? '1 kg' : `${w} kg`;
  const pattern = new RegExp(`(<button[^>]*>\\s*${wStr}\\s*<\\/button>)`, 'g');
  body = body.replace(pattern, (m) => m.replace('<button', `<button onClick={() => setCurrentWeight(${w})}`));
});

// Selects and inputs in detail panel
body = body.replace(
  'id="detail-flavour-select"',
  'id="detail-flavour-select" value={selectedFlavour} onChange={(e) => setSelectedFlavour(e.target.value)}'
);
body = body.replace(
  'id="detail-branch-select"',
  'id="detail-branch-select" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}'
);

// Detail inputs: remove static value="..."
body = body.replace(
  /<input\b([^>]*id="detail-cake-message"[^>]*)value="[^"]*"([^>]*)\/>/,
  '<input $1value={cakeMessage} onChange={(e) => setCakeMessage(e.target.value)}$2/>'
);

body = body.replace(
  /<input\b([^>]*id="detail-pickup-time"[^>]*)value="[^"]*"([^>]*)\/>/,
  '<input $1value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}$2/>'
);

// Detail panel WhatsApp button
body = body.replace(
  /(<button[^>]*>\s*<span className="material-symbols-outlined[^"]*">chat<\/span>\s*<span>Order via WhatsApp<\/span>\s*<\/button>)/,
  (m) => m.replace('<button', '<button onClick={handleSendReadyMadeWhatsApp}')
);

// Mobile sticky bottom bar
body = body.replace(
  /<div\b([^>]*id="sticky-mobile-price"[^>]*)>([\s\S]*?)<\/div>/,
  '<div $1>₹{calculatedReadyMadePrice}</div>'
);
body = body.replace(
  /(<button[^>]*>\s*<span className="material-symbols-outlined[^"]*">chat<\/span>\s*<span>Order<\/span>\s*<\/button>)/,
  (m) => m.replace('<button', '<button onClick={handleSendReadyMadeWhatsApp}')
);

// 6. Custom Builder
// Shape buttons
const shapeList = ['Round', 'Heart', 'Square', 'Tiered'];
shapeList.forEach(sh => {
  const pattern = new RegExp(`(<button[^>]*custom-shape-btn[^>]*>[\\s\\S]*?${sh}[\\s\\S]*?<\\/button>)`, 'gi');
  body = body.replace(pattern, (m) => m.replace('<button', `<button onClick={() => setCustomShape('${sh}')}`));
});

// Flavour buttons
const flavourList = ['Belgian Chocolate', 'Red velvet', 'Butterscotch', 'Vanilla Berry'];
flavourList.forEach(fl => {
  const pattern = new RegExp(`(<button[^>]*custom-flavour-btn[^>]*>[\\s\\S]*?${fl}[\\s\\S]*?<\\/button>)`, 'gi');
  body = body.replace(pattern, (m) => m.replace('<button', `<button onClick={() => setCustomFlavour('${fl}')}`));
});

// Layers buttons
const layersList = ['Single', '2-Tier', '3-Tier'];
layersList.forEach(ly => {
  const pattern = new RegExp(`(<button[^>]*custom-layer-btn[^>]*>[\\s\\S]*?${ly}[\\s\\S]*?<\\/button>)`, 'gi');
  body = body.replace(pattern, (m) => m.replace('<button', `<button onClick={() => setCustomLayers('${ly}')}`));
});

// Size buttons
const sizesList = ['0.5 kg', '1.0 kg', '1.5 kg', '2.0 kg+'];
sizesList.forEach(sz => {
  const pattern = new RegExp(`(<button[^>]*custom-size-btn[^>]*>[\\s\\S]*?${sz.replace('+', '\\+')}[\\s\\S]*?<\\/button>)`, 'gi');
  body = body.replace(pattern, (m) => m.replace('<button', `<button onClick={() => setCustomSize('${sz}')}`));
});

// Theme swatches
const themeList = [
  'Royal Burgundy & Gold',
  'Pastel Blooms',
  'Dark Velvet Noir',
  'Golden Ivory Minimal'
];
themeList.forEach(th => {
  const pattern = new RegExp(`(<button[^>]*title="\\s*${th.replace('&', '&amp;')}\\s*"[^>]*)>`, 'gi');
  body = body.replace(pattern, `$1 onClick={() => setCustomTheme('${th}')}>`);
});

// Toppers buttons
const topperList = [
  'None',
  "Acrylic 'Happy Birthday'",
  'Golden Star Burst',
  'Monogram Initials'
];
topperList.forEach(top => {
  const cleanTop = top.replace(/'/g, '');
  const pattern = new RegExp(`(<button[^>]*custom-topper-btn[^>]*>[\\s\\S]*?${cleanTop.replace('&', '&amp;')}[\\s\\S]*?<\\/button>)`, 'gi');
  body = body.replace(pattern, (m) => m.replace('<button', `<button onClick={() => setCustomTopper("${top.replace(/'/g, "\\'")}")}`));
});

// Custom message input: remove static value="..."
body = body.replace(
  /<input\b([^>]*id="custom-message-input"[^>]*)value="[^"]*"([^>]*)\/>/,
  '<input $1value={customMessage} onChange={(e) => setCustomMessage(e.target.value)}$2/>'
);

// Preview topper badge
body = body.replace(
  /<div\b([^>]*id="preview-topper-badge"[^>]*)>([\s\S]*?)<\/div>/,
  `<div $1 style={{ display: customTopper === 'None' ? 'none' : 'flex' }}>
    <span className="material-symbols-outlined text-xs text-[#E3A04B]">celebration</span>
    <span>{customTopper}</span>
  </div>`
);

// Custom preview image: remove static alt/src
body = body.replace(
  /<img\s+alt="[^"]*"\s+className="([^"]*)"\s+id="custom-preview-img"\s+src="[^"]*"\s*\/>/,
  '<img className="$1" id="custom-preview-img" src={customFlavourImages[customFlavour] || customFlavourImages[\'Belgian Chocolate\']} alt={customFlavour} />'
);

// Summary table
body = body.replace(/<span\b([^>]*id="sum-shape"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customShape}</span>');
body = body.replace(/<span\b([^>]*id="sum-flavour"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customFlavour}</span>');
body = body.replace(/<span\b([^>]*id="sum-layers"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customLayers}</span>');
body = body.replace(/<span\b([^>]*id="sum-size"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customSize}</span>');
body = body.replace(/<span\b([^>]*id="sum-theme"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customTheme}</span>');
body = body.replace(/<span\b([^>]*id="sum-topper"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customTopper}</span>');
body = body.replace(/<span\b([^>]*id="sum-message"[^>]*)>([\s\S]*?)<\/span>/, '<span $1>{customMessage.trim() || \'None\'}</span>');

// Custom WhatsApp order button
body = body.replace(
  /(<button[^>]*>\s*<span className="material-symbols-outlined[^"]*">chat<\/span>\s*<span>Send Custom Inquiry via WhatsApp<\/span>\s*<\/button>)/,
  (m) => m.replace('<button', '<button onClick={handleSendCustomWhatsApp}')
);

// 7. Gallery Slider
body = body.replace(
  'id="gallery-track"',
  'id="gallery-track" ref={galleryTrackRef}'
);
body = body.replace(
  /(<button[^>]*aria-label="Previous"[^>]*)>/,
  '$1 onClick={() => handleSlideGallery(\'prev\')}>'
);
body = body.replace(
  /(<button[^>]*aria-label="Next"[^>]*)>/,
  '$1 onClick={() => handleSlideGallery(\'next\')}>'
);

// Wrap into full component
const fullComponent = `'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface CakeItem {
  id: string;
  name: string;
  displayName: string;
  pricePerKg: number;
  img: string;
  flavourDefault: string;
  category: string;
  inStock: boolean;
  desc: string;
}

const showcaseCakesData: Record<string, CakeItem> = {
  'red-velvet': {
    id: 'red-velvet',
    name: 'Red velvet',
    displayName: 'Red Velvet Rose',
    pricePerKg: 750,
    img: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    flavourDefault: 'Chocolate',
    category: 'Signature Gateaux',
    inStock: true,
    desc: 'Silky cream cheese frosting layered with crimson velvet sponge and candied rose petals.'
  },
  'oreo-chocolate': {
    id: 'oreo-chocolate',
    name: 'Oreo chocolate',
    displayName: 'Oreo Chocolate',
    pricePerKg: 720,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Crushed Oreo cookies folded into airy dark cocoa cream and topped with cookie crunch.'
  },
  'royal-berry': {
    id: 'royal-berry',
    name: 'Royal berry',
    displayName: 'Royal Berry Gateau',
    pricePerKg: 780,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA',
    flavourDefault: 'Berry Coulis',
    category: 'Fruit & Berry',
    inStock: false,
    desc: 'Fresh raspberries, blackberries, and light chantilly cream over vanilla sponge.'
  },
  'ferrero-rocher': {
    id: 'ferrero-rocher',
    name: 'Ferrero rocher',
    displayName: 'Ferrero Rocher',
    pricePerKg: 850,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I',
    flavourDefault: 'Hazelnut Praline',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Toasted roasted hazelnut praline ganache, crushed wafer, and pure milk chocolate drizzle.'
  },
  'belgian-truffle': {
    id: 'belgian-truffle',
    name: 'Belgian truffle',
    displayName: 'Belgian Truffle',
    pricePerKg: 850,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: '70% dark Belgian chocolate ganache melted into moist fudge sponge with gold leaf dusting.'
  },
  'black-forest': {
    id: 'black-forest',
    name: 'Black forest',
    displayName: 'Black Forest',
    pricePerKg: 680,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA',
    flavourDefault: 'Chocolate',
    category: 'Signature Gateaux',
    inStock: true,
    desc: 'Classic Kirsch-soaked cherries, whipped fresh dairy cream, and shaved bitter chocolate.'
  },
  'dark-truffle': {
    id: 'dark-truffle',
    name: 'Dark truffle',
    displayName: 'Dark Truffle Noir',
    pricePerKg: 760,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
    flavourDefault: 'Chocolate',
    category: 'Chocolate Indulgence',
    inStock: true,
    desc: 'Intense 80% single-origin dark cocoa, dense truffle layers, and velvety chocolate glaze.'
  },
  'salted-caramel': {
    id: 'salted-caramel',
    name: 'Salted caramel crunch',
    displayName: 'Salted Caramel Crunch',
    pricePerKg: 720,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I',
    flavourDefault: 'Vanilla Bean',
    category: 'Exotic & Premium',
    inStock: true,
    desc: 'Slow-simmered artisanal amber caramel, Himalayan sea salt flakes, and butter crisp pearls.'
  }
};

const customFlavourImages: Record<string, string> = {
  'Belgian Chocolate': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcesXuTWM8oCkmUQke081RDXp61NMdJvBvYEoADTgtBfgx40WFABA-Ix6KEGAL-2jk67FvINAWsDtptB51E0AP225qYa37kJmIV2b7V1cHWokm6tN5aZqOdfILSzYsNcb3rXjGOeitGWVX_ihNvble8xQi0j_VUrM6V-6DISjBJ5ILFn3Jc7KYag1DXtneRNicfMkMwj9RazGBxoLmNtRUTmdNW9a16yExwajl9Kw',
  'Red velvet': 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
  'Butterscotch': 'https://lh3.googleusercontent.com/aida-public/AB6AXuATITdLMaM3hyXu4wc63nNN1WYLfJDKGY96WiFvdUA6omMCYSjVn57ASKeCSdyloyvTTkkkWaaW3l7ASXMA-W5WYrGH3jpDTRY6as84hdxX8Zh_UoABYH-Hiz_ADZl5NKroeUfTbx-69UktczD5yIzd9LdFJc_7rcDFGeYFRfpWWcICPk30PosTlz2c6SATCmCpDIJ8bUGimOTzOLCVJxJWjBIjPk9ROee2V2foJ8I',
  'Vanilla Berry': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmkwJlOtwpTejVrfn6AOCsRYjXVIHX0EbIcnG-uKHM5jPqZd-E4QEwm2RkO8YIcaP2Bphjrp25pyIdDpsGnanUQHpogmwgOblQN75Dfc83AaY9rSD8TJIgxdbTlen-ePt662k-zCnbwR0WXLOI-jSbAaTyXEyGt43BxzdKQM8029fIkr4phW6k_zoJHlf2vdhkkjX4Ak64K61MOwF2A4JUHDx5RvtOFuQ2uT-15dA'
};

export default function CakeShowcasePage() {
  const [viewMode, setViewMode] = useState<'shelf' | 'full'>('shelf');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Cakes');

  const [currentCakeKey, setCurrentCakeKey] = useState('red-velvet');
  const [currentWeight, setCurrentWeight] = useState(1.0);
  const [selectedFlavour, setSelectedFlavour] = useState('Chocolate');
  const [selectedBranch, setSelectedBranch] = useState('Olavanna Branch');
  const [cakeMessage, setCakeMessage] = useState('');
  const [pickupTime, setPickupTime] = useState('Today, 5:00 PM');

  const [customShape, setCustomShape] = useState('Round');
  const [customFlavour, setCustomFlavour] = useState('Belgian Chocolate');
  const [customLayers, setCustomLayers] = useState('2-Tier');
  const [customSize, setCustomSize] = useState('1.5 kg');
  const [customTheme, setCustomTheme] = useState('Royal Burgundy & Gold');
  const [customTopper, setCustomTopper] = useState("Acrylic 'Happy Birthday'");
  const [customMessage, setCustomMessage] = useState('');

  const galleryTrackRef = useRef<HTMLDivElement>(null);

  const currentCake = showcaseCakesData[currentCakeKey] || showcaseCakesData['red-velvet'];
  const calculatedReadyMadePrice = Math.round(currentCake.pricePerKg * currentWeight);

  const handleSelectCake = (key: string) => {
    setCurrentCakeKey(key);
    const detailPanel = document.getElementById('cake-detail-panel');
    if (detailPanel) {
      detailPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendReadyMadeWhatsApp = () => {
    const waText = \`Hi Paradise Bakes, I’d like to order a ready-made cake:
Cake: \${currentCake.displayName}
Weight: \${currentWeight} kg
Flavour: \${selectedFlavour}
Message on cake: \${cakeMessage.trim() || 'None'}
Pickup: \${pickupTime} at \${selectedBranch}
Total: ₹\${calculatedReadyMadePrice}
Please confirm availability. Thank you!\`;

    window.open('https://wa.me/?text=' + encodeURIComponent(waText), '_blank');
  };

  const handleSendCustomWhatsApp = () => {
    const waCustomText = \`Hi Paradise Bakes, I’d like a custom cake:
Shape: \${customShape}
Flavour: \${customFlavour}
Layers: \${customLayers}
Size: \${customSize}
Theme: \${customTheme}
Topper: \${customTopper}
Message on cake: \${customMessage.trim() || 'None'}
Reference photo: I will send it here
Please confirm the price and availability. Thank you!\`;

    window.open('https://wa.me/?text=' + encodeURIComponent(waCustomText), '_blank');
  };

  const handleSlideGallery = (direction: 'prev' | 'next') => {
    if (!galleryTrackRef.current) return;
    const scrollAmount = 320;
    if (direction === 'prev') {
      galleryTrackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      galleryTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!galleryTrackRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = galleryTrackRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        galleryTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        galleryTrackRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#1c1c18] font-sans antialiased overflow-x-hidden selection:bg-[#E3A04B] selection:text-[#5C0302]">
      ${body}
    </div>
  );
}
`;

fs.writeFileSync('app/cake-world/page.tsx', fullComponent);
console.log('Successfully written complete cake-world page with interactive handlers!');
