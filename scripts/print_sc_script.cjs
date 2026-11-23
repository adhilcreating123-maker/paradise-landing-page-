const fs = require('fs');
const upSC = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html', 'utf8');

const s2 = upSC.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)[1];
console.log('Script 2 in UPLOADED SC:');
console.log(s2);
