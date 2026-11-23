const fs = require('fs');

const uploadedLP = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html';
const uploadedSC = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html';
const wsLP = 'stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/code.html';
const wsSC = 'stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html';

console.log('--- LANDING PAGE COMPARISON ---');
console.log('UPLOADED LP title:', fs.readFileSync(uploadedLP, 'utf8').match(/<title>(.*?)<\/title>/)[1]);
console.log('WORKSPACE LP title:', fs.readFileSync(wsLP, 'utf8').match(/<title>(.*?)<\/title>/)[1]);

console.log('\n--- CAKE SHOWCASE COMPARISON ---');
console.log('UPLOADED SC title:', fs.readFileSync(uploadedSC, 'utf8').match(/<title>(.*?)<\/title>/)[1]);
console.log('WORKSPACE SC title:', fs.readFileSync(wsSC, 'utf8').match(/<title>(.*?)<\/title>/)[1]);

// Let's check why workspace LP is 114k and uploaded is 47k.
// Let's see what is inside workspace LP!
const wsLPContent = fs.readFileSync(wsLP, 'utf8');
const upLPContent = fs.readFileSync(uploadedLP, 'utf8');

console.log('Uploaded LP length:', upLPContent.length);
console.log('Workspace LP length:', wsLPContent.length);

// Compare showcase files
const wsSCContent = fs.readFileSync(wsSC, 'utf8');
const upSCContent = fs.readFileSync(uploadedSC, 'utf8');
console.log('Uploaded SC length:', upSCContent.length);
console.log('Workspace SC length:', wsSCContent.length);
