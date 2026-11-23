const fs = require('fs');

const upLP = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html', 'utf8');
const wsLP = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/code.html', 'utf8');

console.log('=== UPLOADED LP: Colors & Classes ===');
const upTailwind = upLP.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\});/);
if (upTailwind) console.log(upTailwind[1]);

console.log('=== WORKSPACE LP: Colors & Classes ===');
const wsTailwind = wsLP.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\});/);
if (wsTailwind) console.log(wsTailwind[1]);
