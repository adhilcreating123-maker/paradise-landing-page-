const fs = require('fs');
const path = require('path');

function analyzeFile(filePath, label) {
  console.log(`\n=============================`);
  console.log(`=== ${label} ===`);
  console.log(`File: ${filePath}`);
  if (!fs.existsSync(filePath)) {
    console.log('File does NOT exist!');
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`Size: ${content.length} bytes`);

  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  console.log(`Title: ${titleMatch ? titleMatch[1].trim() : 'N/A'}`);

  // Headings
  const headings = [];
  const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = hRegex.exec(content)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    headings.push(`${match[1].toUpperCase()}: ${text}`);
  }
  console.log(`Headings count: ${headings.length}`);
  headings.forEach(h => console.log(`  ${h}`));

  // Sections
  const sectionRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let secIndex = 1;
  while ((match = sectionRegex.exec(content)) !== null) {
    const attrs = match[1];
    const idMatch = attrs.match(/id=["']([^"']+)["']/i);
    const classMatch = attrs.match(/class=["']([^"']+)["']/i);
    const secContent = match[2];
    const secH = secContent.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
    const hText = secH ? secH[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'No heading';
    console.log(`  Section ${secIndex++}: id="${idMatch ? idMatch[1] : ''}" | class="${classMatch ? classMatch[1].slice(0, 40) : ''}" | Heading="${hText.slice(0, 60)}"`);
  }

  // Images
  const imgRegex = /<img\b([^>]*)>/gi;
  const imgs = [];
  while ((match = imgRegex.exec(content)) !== null) {
    const attrs = match[1];
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']+)["']/i);
    imgs.push({
      src: srcMatch ? srcMatch[1] : '',
      alt: altMatch ? altMatch[1] : ''
    });
  }
  console.log(`Total images: ${imgs.length}`);
  imgs.forEach((img, idx) => {
    console.log(`  [img ${idx + 1}] src="${img.src.slice(0, 80)}" alt="${img.alt}"`);
  });

  // Fonts & styles
  const fontMatches = content.match(/fonts\.googleapis\.com\/css2\?[^"']+/g) || [];
  console.log('Fonts:', fontMatches);

  // Tailwind / inline styles / script tags
  const scripts = content.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  console.log(`Scripts count: ${scripts.length}`);
  scripts.forEach((s, i) => {
    const src = s.match(/src=["']([^"']+)["']/i);
    console.log(`  Script ${i + 1}: ${src ? 'External: ' + src[1] : 'Inline code (' + s.length + ' chars)'}`);
  });
}

const uploadedLP = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html';
const uploadedSC = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html';
const wsLP = 'stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/code.html';
const wsSC = 'stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html';

analyzeFile(uploadedLP, 'UPLOADED ZIP - Landing Page');
analyzeFile(wsLP, 'WORKSPACE - Landing Page');
analyzeFile(uploadedSC, 'UPLOADED ZIP - Cake Showcase');
analyzeFile(wsSC, 'WORKSPACE - Cake Showcase');
