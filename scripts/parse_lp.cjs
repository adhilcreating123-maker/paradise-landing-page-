const fs = require('fs');

const lp = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_fully_loaded_restored/code.html', 'utf8');

// List all major containers inside <body>
const bodyMatch = lp.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body match');
  process.exit(1);
}
const body = bodyMatch[1];

// Find direct child elements or sections
console.log('Body length:', body.length);

// Let's print the top level tags
const topLevelRegex = /<(header|nav|section|footer|div|main)[^>]*>/gi;
let match;
while ((match = topLevelRegex.exec(body)) !== null) {
  console.log(match[0].slice(0, 100));
}
