const sharp = require('sharp');
const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><circle cx="100" cy="100" r="80" fill="#E3A04B" /></svg>');
sharp(svg).png().toBuffer().then(buf => console.log('Generated PNG bytes:', buf.length));
