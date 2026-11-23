const fs = require('fs');

const rawHtml = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_fully_loaded_restored/code.html', 'utf8');

const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}

let bodyHtml = bodyMatch[1];

// Remove any inline <script> tags from bodyHtml (we handle interactivity via React)
bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

console.log('Body HTML length without scripts:', bodyHtml.length);
fs.writeFileSync('scratch/lp_body_raw.html', bodyHtml);
