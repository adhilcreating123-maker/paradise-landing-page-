const fs = require('fs');

const rawHtml = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_cake_showcase_15_cakes_slider/code.html', 'utf8');

const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}

const bodyHtml = bodyMatch[1];
console.log('Showcase body length:', bodyHtml.length);

// Check sections
const sections = Array.from(bodyHtml.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi));
console.log('Sections found:', sections.length);
sections.forEach((s, i) => {
  const id = (s[1].match(/id="([^"]+)"/) || [])[1];
  console.log(`  Section ${i + 1}: id="${id}" (length ${s[2].length})`);
});
