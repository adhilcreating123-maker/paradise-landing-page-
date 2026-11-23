const fs = require('fs');

const lines = fs.readFileSync('app/cake-world/page.tsx', 'utf8').split('\n');

[268, 269, 270, 272, 273, 534, 535, 620, 621].forEach(l => {
  console.log(`\nLine ${l}:`);
  console.log(lines[l - 1]);
});
