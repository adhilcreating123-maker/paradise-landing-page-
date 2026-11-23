const fs = require('fs');

const upSC = fs.readFileSync('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html', 'utf8');
const wsSC = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html', 'utf8');

// Compare sections and cards in both SC
console.log('--- Number of cake cards in Showcase ---');
const upCakeCards = upSC.match(/class="[^"]*cake-card[^"]*"/g) || upSC.match(/data-cake-id="[^"]*"/g) || [];
const wsCakeCards = wsSC.match(/class="[^"]*cake-card[^"]*"/g) || wsSC.match(/data-cake-id="[^"]*"/g) || [];
console.log('Uploaded cake-cards / cake IDs:', upCakeCards.length);
console.log('Workspace cake-cards / cake IDs:', wsCakeCards.length);

const upCakeIds = Array.from(upSC.matchAll(/data-cake-id="([^"]+)"/g)).map(m => m[1]);
const wsCakeIds = Array.from(wsSC.matchAll(/data-cake-id="([^"]+)"/g)).map(m => m[1]);
console.log('Uploaded Cake IDs:', [...new Set(upCakeIds)]);
console.log('Workspace Cake IDs:', [...new Set(wsCakeIds)]);

// Compare gallery items in Cakes We've Made
const upGalleryImgs = upSC.match(/id="gallery-track"[\s\S]*?<\/div>\s*<\/div>/);
const wsGalleryImgs = wsSC.match(/id="gallery-track"[\s\S]*?<\/div>\s*<\/div>/);
console.log('Uploaded gallery length:', upGalleryImgs ? upGalleryImgs[0].length : 0);
console.log('Workspace gallery length:', wsGalleryImgs ? wsGalleryImgs[0].length : 0);
