const fs = require('fs');
const upSC = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html', 'utf8');
const wsSC = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html', 'utf8');

const s1 = upSC.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/) || upSC.match(/<script>([\s\S]*?tailwind\.config[\s\S]*?)<\/script>/);
if (s1) console.log('UPLOADED SC tailwind-config:\n', s1[1].slice(0, 500));

const s2 = wsSC.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/) || wsSC.match(/<script>([\s\S]*?tailwind\.config[\s\S]*?)<\/script>/);
if (s2) console.log('WORKSPACE SC tailwind-config:\n', s2[1].slice(0, 500));
