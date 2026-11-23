const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const hrefs = Array.from(content.matchAll(/href="([^"]+)"/g)).map(m => m[1]);
console.log('Unique hrefs in app/page.tsx:');
console.log([...new Set(hrefs)]);
