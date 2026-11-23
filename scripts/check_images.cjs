const fs = require('fs');

function getPngDimensions(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height, size: fs.statSync(filePath).size };
  }
  return null;
}

console.log('UPLOADED LP screen.png:', getPngDimensions('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\screen.png'));
console.log('WORKSPACE LP screen.png:', getPngDimensions('stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/screen.png'));
console.log('UPLOADED SC screen.png:', getPngDimensions('C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\screen.png'));
console.log('WORKSPACE SC screen.png:', getPngDimensions('stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/screen.png'));
