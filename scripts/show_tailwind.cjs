const fs = require('fs');
const upLP = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html', 'utf8');
const wsLP = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/code.html', 'utf8');

const s1 = upLP.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/);
if (s1) console.log('UPLOADED LP tailwind-config:\n', s1[1]);

const s2 = wsLP.match(/<script>([\s\S]*?tailwind\.config[\s\S]*?)<\/script>/);
if (s2) console.log('WORKSPACE LP tailwind-config:\n', s2[1]);
