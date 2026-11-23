const fs = require('fs');
const https = require('https');
const http = require('http');

const upLPPath = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html';
const upSCPath = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html';

const lpContent = fs.readFileSync(upLPPath, 'utf8');
const scContent = fs.readFileSync(upSCPath, 'utf8');

function extractImages(content) {
  const matches = content.matchAll(/src=["'](https?:\/\/[^"']+)["']/g);
  return [...new Set(Array.from(matches).map(m => m[1]))];
}

const lpImages = extractImages(lpContent);
const scImages = extractImages(scContent);

console.log(`Unique image URLs in Landing Page: ${lpImages.length}`);
console.log(`Unique image URLs in Showcase: ${scImages.length}`);

const allImages = [...new Set([...lpImages, ...scImages])];
console.log(`Total unique image URLs across both: ${allImages.length}`);

// Test fetching headers of first 5 to see network status
async function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url: url.slice(0, 60), status: res.statusCode });
      });
      req.on('error', (e) => resolve({ url: url.slice(0, 60), error: e.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url: url.slice(0, 60), error: 'Timeout' }); });
      req.end();
    } catch (err) {
      resolve({ url: url.slice(0, 60), error: err.message });
    }
  });
}

(async () => {
  console.log('Testing connectivity for first 5 images:');
  for (let i = 0; i < Math.min(5, allImages.length); i++) {
    const res = await checkUrl(allImages[i]);
    console.log(res);
  }
})();
