const fs = require('fs');

const uploadedLP = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html', 'utf8');
const wsLP = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/code.html', 'utf8');

console.log('=== UPLOADED LP ID & SECTIONS ===');
const upIds = uploadedLP.match(/id="[^"]+"/g);
console.log(upIds);

console.log('\n=== WORKSPACE LP ID & SECTIONS ===');
const wsIds = wsLP.match(/id="[^"]+"/g);
console.log(wsIds);

console.log('\n=== UPLOADED LP SCRIPT TAGS ===');
const upScripts = uploadedLP.match(/<script[\s\S]*?<\/script>/g);
upScripts && upScripts.forEach((s, i) => console.log(`[Script ${i}] length ${s.length}:`, s.slice(0, 200)));

console.log('\n=== WORKSPACE LP SCRIPT TAGS ===');
const wsScripts = wsLP.match(/<script[\s\S]*?<\/script>/g);
wsScripts && wsScripts.forEach((s, i) => console.log(`[Script ${i}] length ${s.length}:`, s.slice(0, 200)));
