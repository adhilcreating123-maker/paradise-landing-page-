const fs = require('fs');

const rawHtml = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_cake_showcase_15_cakes_slider/code.html', 'utf8');

const fullViewMatch = rawHtml.match(/id="vitrine-full-view"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
if (fullViewMatch) {
  console.log('Full view found, length:', fullViewMatch[0].length);
  const titles = Array.from(fullViewMatch[0].matchAll(/<h[3-5][^>]*>(.*?)<\/h[3-5]>/g)).map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Titles in full view:', titles);
} else {
  console.log('Full view match not found');
}

// Find all cake titles in the entire file
const allH3H4 = Array.from(rawHtml.matchAll(/<(h3|h4)\b[^>]*>(.*?)<\/\1>/gi)).map(m => m[2].replace(/<[^>]+>/g, '').trim());
console.log('All H3/H4 in file:', allH3H4);
