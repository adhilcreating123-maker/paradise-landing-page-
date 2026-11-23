const fs = require('fs');

const rawHtml = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_cake_showcase_15_cakes_slider/code.html', 'utf8');

const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}

let bodyHtml = bodyMatch[1];
// Extract script contents
const scripts = Array.from(bodyHtml.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)).map(m => m[1]);
console.log('Showcase scripts found:', scripts.length);

// Strip scripts from body HTML
bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

fs.writeFileSync('scratch/sc_body_raw.html', bodyHtml);
console.log('Showcase raw body written, length:', bodyHtml.length);
