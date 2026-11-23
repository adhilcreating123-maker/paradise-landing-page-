const fs = require('fs');

let content = fs.readFileSync('app/cake-world/page.tsx', 'utf8');

// Fix btn-view-shelf: remove duplicate className
content = content.replace(
  /<button\s+className="[^"]*"\s+id="btn-view-shelf"\s+type="button"\s+onClick=\{\(\) => setViewMode\('shelf'\)\}\s+className=\{`([^`]*)`\}>/g,
  '<button id="btn-view-shelf" type="button" onClick={() => setViewMode(\'shelf\')} className={`flex-1 px-2.5 py-1 rounded-full text-[11px] tracking-wide transition-all flex items-center justify-center gap-1 ${viewMode === \'shelf\' ? \'bg-[#E3A04B] text-[#5C0302] font-bold shadow-sm\' : \'text-[#FDF2D8] font-medium hover:text-[#E3A04B]\'}`>'
);

// Fix btn-view-full: remove duplicate className
content = content.replace(
  /<button\s+className="[^"]*"\s+id="btn-view-full"\s+type="button"\s+onClick=\{\(\) => setViewMode\('full'\)\}\s+className=\{`([^`]*)`\}>/g,
  '<button id="btn-view-full" type="button" onClick={() => setViewMode(\'full\')} className={`flex-1 px-2.5 py-1 rounded-full text-[11px] tracking-wide transition-all flex items-center justify-center gap-1 ${viewMode === \'full\' ? \'bg-[#E3A04B] text-[#5C0302] font-bold shadow-sm\' : \'text-[#FDF2D8] font-medium hover:text-[#E3A04B]\'}`>'
);

// Fix instock-toggle: remove duplicate className
content = content.replace(
  /<button\s+aria-pressed="false"\s+className="[^"]*"\s+id="instock-toggle"\s+type="button"\s+onClick=\{\(\) => setInStockOnly\(!inStockOnly\)\}\s+className=\{`([^`]*)`\}>/g,
  '<button aria-pressed={inStockOnly} id="instock-toggle" type="button" onClick={() => setInStockOnly(!inStockOnly)} className={`w-9 h-5 rounded-full border border-[#CA8B4A]/60 flex items-center p-0.5 transition-colors focus:outline-none ${inStockOnly ? \'bg-[#E3A04B]\' : \'bg-[#240000]/80\'}`}>\n<span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${inStockOnly ? \'translate-x-4 bg-[#5C0302]\' : \'translate-x-0\'}`} />\n</button>'
);

// Fix detail-cake-img-mobile: remove duplicate alt
content = content.replace(
  /<img\s+alt="[^"]*"\s+className="([^"]*)"\s+id="detail-cake-img-mobile"\s+src=\{currentCake\.img\}\s+alt=\{currentCake\.displayName\}\s*\/>/g,
  '<img id="detail-cake-img-mobile" className="$1" src={currentCake.img} alt={currentCake.displayName} />'
);

// Fix detail-cake-img: remove duplicate alt
content = content.replace(
  /<img\s+alt="[^"]*"\s+className="([^"]*)"\s+id="detail-cake-img"\s+src=\{currentCake\.img\}\s+alt=\{currentCake\.displayName\}\s*\/>/g,
  '<img id="detail-cake-img" className="$1" src={currentCake.img} alt={currentCake.displayName} />'
);

// Fix custom-preview-img: remove duplicate alt
content = content.replace(
  /<img\s+alt="[^"]*"\s+className="([^"]*)"\s+id="custom-preview-img"\s+src=\{([^}]+)\}\s+alt=\{customFlavour\}\s*\/>/g,
  '<img id="custom-preview-img" className="$1" src={$2} alt={customFlavour} />'
);

// Fix any inputs with duplicate value
content = content.replace(
  /<input\b([^>]*id="custom-message-input"[^>]*)value="[^"]*"([^>]*)\/>/g,
  '<input $1$2 />'
);

// Check if any tag still has duplicate attributes
function removeDuplicateAttrs(str) {
  return str.replace(/<([a-zA-Z0-9_-]+)\s+([^>]+)>/g, (full, tag, attrsStr) => {
    // Only parse if not closed tag
    if (full.endsWith('/>')) {
      const inner = attrsStr.slice(0, -1); // remove trailing /
      const parts = inner.match(/([a-zA-Z0-9_-]+)(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}|[^\s>]+))?/g) || [];
      const seen = new Set();
      const unique = [];
      for (let i = parts.length - 1; i >= 0; i--) {
        const attrName = parts[i].split('=')[0];
        if (!seen.has(attrName)) {
          seen.add(attrName);
          unique.unshift(parts[i]);
        }
      }
      return `<${tag} ${unique.join(' ')} />`;
    } else {
      const parts = attrsStr.match(/([a-zA-Z0-9_-]+)(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}|[^\s>]+))?/g) || [];
      const seen = new Set();
      const unique = [];
      for (let i = parts.length - 1; i >= 0; i--) {
        const attrName = parts[i].split('=')[0];
        if (!seen.has(attrName)) {
          seen.add(attrName);
          unique.unshift(parts[i]);
        }
      }
      return `<${tag} ${unique.join(' ')}>`;
    }
  });
}

content = removeDuplicateAttrs(content);

fs.writeFileSync('app/cake-world/page.tsx', content);
console.log('Cleaned duplicate attributes in app/cake-world/page.tsx!');
