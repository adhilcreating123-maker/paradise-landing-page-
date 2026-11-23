const fs = require('fs');

const upSC = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html', 'utf8');
const wsSC = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html', 'utf8');

console.log('Lengths:', upSC.length, wsSC.length);
// Check if they are identical or what diff exists
if (upSC === wsSC) {
  console.log('THEY ARE IDENTICAL!');
} else {
  console.log('They differ.');
  // Find where they differ
  let diffStart = 0;
  while (diffStart < upSC.length && diffStart < wsSC.length && upSC[diffStart] === wsSC[diffStart]) {
    diffStart++;
  }
  console.log(`First difference at character index: ${diffStart}`);
  console.log('Uploaded SC near diff:\n', upSC.slice(diffStart - 50, diffStart + 150));
  console.log('\nWorkspace SC near diff:\n', wsSC.slice(diffStart - 50, diffStart + 150));
}
