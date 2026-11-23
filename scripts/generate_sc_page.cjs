const fs = require('fs');

const headerCode = fs.readFileSync('scratch/sc_header_code.txt', 'utf8');
let body = fs.readFileSync('scratch/sc_clean_body.jsx', 'utf8');

// 1. View Mode Toggling
body = body.replace(
  /<button\b([^>]*id="btn-view-shelf"[^>]*)>([\s\S]*?)<\/button>/,
  `<button $1 onClick={() => setViewMode('shelf')} className={\`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all \${viewMode === 'shelf' ? 'bg-[#5C0302] text-[#FDF2D8] shadow-sm' : 'text-[#5C0302]/70 hover:text-[#5C0302]'}\`}>$2</button>`
);

body = body.replace(
  /<button\b([^>]*id="btn-view-full"[^>]*)>([\s\S]*?)<\/button>/,
  `<button $1 onClick={() => setViewMode('full')} className={\`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all \${viewMode === 'full' ? 'bg-[#5C0302] text-[#FDF2D8] shadow-sm' : 'text-[#5C0302]/70 hover:text-[#5C0302]'}\`}>$2</button>`
);

// 2. In-Stock Toggle
body = body.replace(
  /<button\b([^>]*id="instock-toggle"[^>]*)>([\s\S]*?)<\/button>/,
  `<button $1 onClick={() => setInStockOnly(!inStockOnly)} className={\`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${inStockOnly ? 'bg-[#5C0302]' : 'bg-[#CA8B4A]/40'}\`}>
    <span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out \${inStockOnly ? 'translate-x-5' : 'translate-x-0'}\`} />
  </button>`
);

// 3. Category Buttons
const categories = ['All Cakes', 'Signature Gateaux', 'Chocolate Indulgence', 'Fruit & Berry', 'Exotic & Premium'];
categories.forEach(cat => {
  const catRegex = new RegExp(`<button([^>]*>\\s*${cat.replace('&', '&amp;')}[\\s\\S]*?<\\/button>)`, 'g');
  body = body.replace(catRegex, (match, p1) => {
    return `<button onClick={() => setActiveCategory('${cat}')} className={\`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all \${activeCategory === '${cat}' ? 'bg-[#9A1C20] text-[#FDF2D8] shadow-sm' : 'bg-[#FDF2D8] text-[#5C0302] border border-[#CA8B4A]/50 hover:bg-[#E3A04B]/20'}\`} ${p1.replace(/^[^>]*>/, '>')}`;
  });
});

// 4. Vitrine Shelves vs Full View containers
body = body.replace(
  /id="vitrine-shelves-wrapper"([^>]*)className="([^"]*)"/,
  `id="vitrine-shelves-wrapper"$1className={\`$2 \${viewMode === 'shelf' ? '' : 'hidden'}\`}`
);

body = body.replace(
  /id="vitrine-full-view"([^>]*)className="([^"]*)"/,
  `id="vitrine-full-view"$1className={\`$2 \${viewMode === 'full' ? '' : 'hidden'}\`}`
);

// 5. Connect each cake card to handleSelectCake
const cakeKeys = [
  'red-velvet', 'oreo-chocolate', 'royal-berry', 'ferrero-rocher',
  'belgian-truffle', 'black-forest', 'dark-truffle', 'salted-caramel'
];

cakeKeys.forEach(key => {
  const cardRegex = new RegExp(`(<div[^>]*className="[^"]*cake-card[^"]*"[^>]*onclick="[^"]*selectShowcaseCake\\('${key}'[^"]*"[^>]*)>`, 'gi');
  body = body.replace(cardRegex, (m, p1) => {
    const cleanP1 = p1.replace(/onclick="[^"]*"/gi, '').replace(/className="([^"]*)"/, (cm, cls) => {
      return `className={\`${cls} \${currentCakeKey === '${key}' ? 'is-selected' : ''}\`}`;
    });
    return `${cleanP1} onClick={() => handleSelectCake('${key}')}>`;
  });
});

// 6. Cake Detail Panel live bindings
body = body.replace(
  /<h2\b([^>]*id="detail-cake-name"[^>]*)>([\s\S]*?)<\/h2>/,
  `<h2 $1>{currentCake.displayName}</h2>`
);

body = body.replace(
  /<div\b([^>]*id="detail-cake-total-price"[^>]*)>([\s\S]*?)<\/div>/,
  `<div $1>₹{calculatedReadyMadePrice}</div>`
);

body = body.replace(
  /<span\b([^>]*id="detail-cake-rate"[^>]*)>([\s\S]*?)<\/span>/,
  `<span $1>₹{currentCake.pricePerKg}</span>`
);

body = body.replace(
  /<img\b([^>]*id="detail-cake-img"[^>]*)src="[^"]*"([^>]*)\/>/,
  `<img $1src={currentCake.img} alt={currentCake.displayName}$2/>`
);

body = body.replace(
  /<img\b([^>]*id="detail-cake-img-mobile"[^>]*)src="[^"]*"([^>]*)\/>/,
  `<img $1src={currentCake.img} alt={currentCake.displayName}$2/>`
);

// detail weight pills
const weights = [0.5, 1.0, 1.5, 2.0, 3.0];
weights.forEach(wt => {
  const wtRegex = new RegExp(`<button([^>]*onclick="[^"]*setDetailWeight\\(${wt}[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(wtRegex, (m, p1, inner) => {
    return `<button onClick={() => setCurrentWeight(${wt})} className={\`weight-pill px-4 py-2 rounded-full font-semibold text-xs transition-all \${currentWeight === ${wt} ? 'border-2 border-[#5C0302] bg-[#5C0302] text-[#FDF2D8] font-bold shadow-sm' : 'border border-[#CA8B4A]/60 bg-[#F2E4C9] text-[#5C0302] hover:bg-[#E3A04B]/20'}\`}>${inner}</button>`;
  });
});

// Form inputs in Cake Detail Panel
body = body.replace(
  /<select\b([^>]*id="detail-flavour-select"[^>]*)>/,
  `<select $1 value={selectedFlavour} onChange={(e) => setSelectedFlavour(e.target.value)}>`
);

body = body.replace(
  /<select\b([^>]*id="detail-branch-select"[^>]*)>/,
  `<select $1 value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>`
);

body = body.replace(
  /<input\b([^>]*id="detail-cake-message"[^>]*)value="[^"]*"([^>]*)\/>/,
  `<input $1value={cakeMessage} onChange={(e) => setCakeMessage(e.target.value)}$2/>`
);

body = body.replace(
  /<input\b([^>]*id="detail-pickup-time"[^>]*)value="[^"]*"([^>]*)\/>/,
  `<input $1value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}$2/>`
);

// Ready-made WhatsApp order button
body = body.replace(
  /<button\b([^>]*onclick="[^"]*sendReadyMadeWhatsApp[^"]*"[^>]*)>/gi,
  `<button $1 onClick={handleSendReadyMadeWhatsApp}>`
);

// Sticky mobile bottom price & order button
body = body.replace(
  /<div\b([^>]*id="sticky-mobile-price"[^>]*)>([\s\S]*?)<\/div>/,
  `<div $1>₹{calculatedReadyMadePrice}</div>`
);

// 7. Custom Builder
// Shape buttons
const shapes = ['Round', 'Heart', 'Square', 'Tiered'];
shapes.forEach(sh => {
  const shRegex = new RegExp(`<button([^>]*onclick="[^"]*setCustomShape\\('${sh}'[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(shRegex, (m, p1, inner) => {
    return `<button onClick={() => setCustomShape('${sh}')} className={\`custom-shape-btn p-2 rounded-xl text-xs text-center transition-all \${customShape === '${sh}' ? 'border-2 border-[#5C0302] bg-[#5C0302] text-[#FDF2D8] font-bold shadow-sm' : 'border border-[#CA8B4A]/60 bg-[#FDF2D8] text-[#5C0302] font-semibold hover:bg-[#E3A04B]/20'}\`}>${inner}</button>`;
  });
});

// Flavour buttons
const flavours = ['Belgian Chocolate', 'Red velvet', 'Butterscotch', 'Vanilla Berry'];
flavours.forEach(fl => {
  const flRegex = new RegExp(`<button([^>]*onclick="[^"]*setCustomFlavour\\('${fl}'[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(flRegex, (m, p1, inner) => {
    return `<button onClick={() => setCustomFlavour('${fl}')} className={\`custom-flavour-btn p-2 rounded-xl text-xs text-center transition-all \${customFlavour === '${fl}' ? 'border-2 border-[#5C0302] bg-[#5C0302] text-[#FDF2D8] font-bold shadow-sm' : 'border border-[#CA8B4A]/60 bg-[#FDF2D8] text-[#5C0302] font-semibold hover:bg-[#E3A04B]/20'}\`}>${inner}</button>`;
  });
});

// Layers buttons
const layerOptions = ['Single', '2-Tier', '3-Tier'];
layerOptions.forEach(ly => {
  const lyRegex = new RegExp(`<button([^>]*onclick="[^"]*setCustomLayers\\('${ly}'[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(lyRegex, (m, p1, inner) => {
    return `<button onClick={() => setCustomLayers('${ly}')} className={\`custom-layer-btn p-2 rounded-xl text-xs text-center transition-all \${customLayers === '${ly}' ? 'border-2 border-[#5C0302] bg-[#5C0302] text-[#FDF2D8] font-bold shadow-sm' : 'border border-[#CA8B4A]/60 bg-[#FDF2D8] text-[#5C0302] font-semibold hover:bg-[#E3A04B]/20'}\`}>${inner}</button>`;
  });
});

// Size buttons
const sizeOptions = ['0.5 kg', '1.0 kg', '1.5 kg', '2.0 kg+'];
sizeOptions.forEach(sz => {
  const szRegex = new RegExp(`<button([^>]*onclick="[^"]*setCustomSize\\('${sz}'[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(szRegex, (m, p1, inner) => {
    return `<button onClick={() => setCustomSize('${sz}')} className={\`custom-size-btn p-2 rounded-xl text-xs text-center transition-all \${customSize === '${sz}' ? 'border-2 border-[#5C0302] bg-[#5C0302] text-[#FDF2D8] font-bold shadow-sm' : 'border border-[#CA8B4A]/60 bg-[#FDF2D8] text-[#5C0302] font-medium hover:bg-[#E3A04B]/20'}\`}>${inner}</button>`;
  });
});

// Theme swatches
const themeOptions = [
  'Royal Burgundy & Gold',
  'Pastel Blooms',
  'Dark Velvet Noir',
  'Golden Ivory Minimal'
];
themeOptions.forEach(th => {
  const thRegex = new RegExp(`<button([^>]*onclick="[^"]*setCustomTheme\\('${th.replace('&', '&amp;')}'[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(thRegex, (m, p1, inner) => {
    const isSelected = `customTheme === '${th}'`;
    const ringClass = `\${${isSelected} ? 'ring-2 ring-[#9A1C20] ring-offset-2 ring-offset-[#F2E4C9]' : ''}`;
    return `<button onClick={() => setCustomTheme('${th}')} className="theme-swatch p-1 rounded-full transition-transform hover:scale-110 focus:outline-none" title="${th}">
      <span className={\`w-8 h-8 rounded-full flex items-center justify-center text-white ${ringClass}\`}>
        {${isSelected} && <span className="material-symbols-outlined text-sm font-bold">check</span>}
      </span>
    </button>`;
  });
});

// Topper buttons
const topperOptions = [
  'None',
  "Acrylic 'Happy Birthday'",
  'Golden Star Burst',
  'Monogram Initials'
];
topperOptions.forEach(top => {
  const topRegex = new RegExp(`<button([^>]*onclick="[^"]*setCustomTopper\\([^"]*${top.replace(/'/g, '.*')}[^"]*\\)[^"]*"[^>]*)>([\\s\\S]*?)<\\/button>`, 'gi');
  body = body.replace(topRegex, (m, p1, inner) => {
    return `<button onClick={() => setCustomTopper("${top.replace(/"/g, '\\"')}")} className={\`custom-topper-btn p-2 rounded-xl text-xs text-center transition-all \${customTopper === "${top.replace(/"/g, '\\"')}" ? 'border-2 border-[#5C0302] bg-[#5C0302] text-[#FDF2D8] font-bold shadow-sm' : 'border border-[#CA8B4A]/60 bg-[#FDF2D8] text-[#5C0302] font-medium hover:bg-[#E3A04B]/20'}\`}>${inner}</button>`;
  });
});

// Custom message input
body = body.replace(
  /<input\b([^>]*id="custom-message-input"[^>]*)\/>/,
  `<input $1 value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} />`
);

// Preview topper badge
body = body.replace(
  /<div\b([^>]*id="preview-topper-badge"[^>]*)>([\s\S]*?)<\/div>/,
  `<div $1 className={\`absolute top-3 left-3 bg-[#1C050B]/90 backdrop-blur-md text-[#FDF2D8] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#CA8B4A]/50 flex items-center gap-1 shadow-lg \${customTopper === 'None' ? 'hidden' : ''}\`}>
    <span className="material-symbols-outlined text-xs text-[#E3A04B]">celebration</span> {customTopper}
  </div>`
);

// Custom preview image
body = body.replace(
  /<img\b([^>]*id="custom-preview-img"[^>]*)src="[^"]*"([^>]*)\/>/,
  `<img $1src={customFlavourImages[customFlavour] || customFlavourImages['Belgian Chocolate']} alt={customFlavour}$2/>`
);

// Live summary values
body = body.replace(/<span\b([^>]*id="sum-shape"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customShape}</span>`);
body = body.replace(/<span\b([^>]*id="sum-flavour"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customFlavour}</span>`);
body = body.replace(/<span\b([^>]*id="sum-layers"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customLayers}</span>`);
body = body.replace(/<span\b([^>]*id="sum-size"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customSize}</span>`);
body = body.replace(/<span\b([^>]*id="sum-theme"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customTheme}</span>`);
body = body.replace(/<span\b([^>]*id="sum-topper"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customTopper}</span>`);
body = body.replace(/<span\b([^>]*id="sum-message"[^>]*)>([\s\S]*?)<\/span>/, `<span $1>{customMessage.trim() || 'None'}</span>`);

// Custom WhatsApp order button
body = body.replace(
  /<button\b([^>]*onclick="[^"]*sendCustomWhatsApp[^"]*"[^>]*)>/gi,
  `<button $1 onClick={handleSendCustomWhatsApp}>`
);

// 8. Gallery Carousel Ref & Controls
body = body.replace(
  /id="gallery-track"/,
  'id="gallery-track" ref={galleryTrackRef}'
);

body = body.replace(
  /onclick="slideGallery\('prev'\)"/g,
  `onClick={() => handleSlideGallery('prev')}`
);

body = body.replace(
  /onclick="slideGallery\('next'\)"/g,
  `onClick={() => handleSlideGallery('next')}`
);

// Clean any remaining raw onclick
body = body.replace(/\bonclick="[^"]*"/gi, '');

const finalFileContent = `${headerCode}
${body}
    </div>
  );
}
`;

fs.writeFileSync('app/cake-world/page.tsx', finalFileContent);
console.log('Successfully generated app/cake-world/page.tsx!');
