const fs = require('fs');

const lines = fs.readFileSync('app/cake-world/page.tsx', 'utf8').split('\n');
const l613 = lines[612];
console.log('Line 613 length:', l613.length);

[1378, 1753, 2132].forEach(pos => {
  console.log(`\nAround position ${pos}:`);
  console.log(l613.slice(Math.max(0, pos - 80), Math.min(l613.length, pos + 80)));
});
