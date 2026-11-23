const fs = require('fs');
const upLP = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html', 'utf8');

const scripts = upLP.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
console.log('Scripts count in Uploaded LP:', scripts.length);
scripts.forEach((s, idx) => {
  console.log(`\n--- Script ${idx + 1} (${s.length} chars) ---`);
  console.log(s);
});
