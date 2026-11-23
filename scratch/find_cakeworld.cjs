const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('cakeworld') || l.includes('Cake World') || l.includes('Step into')) {
    console.log(`Line ${i + 1}: ${l.slice(0, 120)}`);
  }
});
