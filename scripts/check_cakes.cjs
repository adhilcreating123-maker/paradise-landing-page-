const fs = require('fs');

const upSC = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html', 'utf8');

// Find all onclick="selectCake('...')"
const selectCakeMatches = Array.from(upSC.matchAll(/selectCake\(['"]([^'"]+)['"]\)/g)).map(m => m[1]);
console.log('Uploaded selectCake calls:', selectCakeMatches);

// Find showcaseCakes keys
const showcaseCakesObjMatch = upSC.match(/const showcaseCakes = \{([\s\S]*?)\n\s*\};/);
if (showcaseCakesObjMatch) {
  const keys = Array.from(showcaseCakesObjMatch[1].matchAll(/['"]([^'"]+)['"]:\s*\{/g)).map(m => m[1]);
  console.log('showcaseCakes keys:', keys);
}
