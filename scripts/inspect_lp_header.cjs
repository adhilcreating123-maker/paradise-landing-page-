const fs = require('fs');
const upLP = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html', 'utf8');

const header = upLP.match(/<header[\s\S]*?<\/header>/i);
console.log('--- HEADER ---');
console.log(header ? header[0] : 'None');
