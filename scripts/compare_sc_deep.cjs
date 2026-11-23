const fs = require('fs');

const uploadedSC = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html', 'utf8');
const wsSC = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html', 'utf8');

console.log('=== UPLOADED SC ID & SECTIONS ===');
const upIds = uploadedSC.match(/id="[^"]+"/g);
console.log(upIds ? upIds.slice(0, 30) : null);

console.log('\n=== WORKSPACE SC ID & SECTIONS ===');
const wsIds = wsSC.match(/id="[^"]+"/g);
console.log(wsIds ? wsIds.slice(0, 30) : null);

console.log('\n=== UPLOADED SC SCRIPT TAGS ===');
const upScripts = uploadedSC.match(/<script[\s\S]*?<\/script>/g);
upScripts && upScripts.forEach((s, i) => console.log(`[Script ${i}] length ${s.length}:`, s.slice(0, 150)));

console.log('\n=== WORKSPACE SC SCRIPT TAGS ===');
const wsScripts = wsSC.match(/<script[\s\S]*?<\/script>/g);
wsScripts && wsScripts.forEach((s, i) => console.log(`[Script ${i}] length ${s.length}:`, s.slice(0, 150)));
