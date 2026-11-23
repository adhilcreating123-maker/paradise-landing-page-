const fs = require('fs');

const lines = fs.readFileSync('app/cake-world/page.tsx', 'utf8').split('\n');

[259, 519, 577, 582, 605].forEach(l => {
  console.log(`\nLine ${l}:`);
  console.log(lines[l - 1]);
});

console.log('\nLine 613 around 8934:');
console.log(lines[612].slice(8934 - 100, 8934 + 100));
