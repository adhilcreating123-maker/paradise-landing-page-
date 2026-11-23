const fs = require('fs');

const upLPPath = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_landing_page_fully_loaded_restored\\code.html';
const wsLPPath = 'stitch_paradise_bakes_website_clone/paradise_bakes_landing_page_with_cake_world_section/code.html';
const upSCPath = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\0033ab6f-13fe-44a2-939c-88735e0740f7\\scratch\\stitch_uploaded\\stitch_paradise_bakes_website_clone\\paradise_bakes_cake_showcase_15_cakes_slider\\code.html';
const wsSCPath = 'stitch_paradise_bakes_website_clone/paradise_bakes_glass_vitrine_cake_showcase_custom_builder/code.html';

function getDetails(pathStr, label) {
  const content = fs.readFileSync(pathStr, 'utf8');
  console.log(`\n=================== ${label} ===================`);
  // Top nav
  const nav = content.match(/<nav[\s\S]*?<\/nav>/i);
  console.log('Nav found:', !!nav, nav ? nav[0].slice(0, 150) : '');
  
  // Header / Announcement
  const header = content.match(/<header[\s\S]*?<\/header>/i);
  console.log('Header found:', !!header);

  // Sections
  const sections = content.match(/<section[\s\S]*?<\/section>/gi) || [];
  console.log('Total sections:', sections.length);
  sections.forEach((sec, idx) => {
    const id = (sec.match(/id="([^"]+)"/) || [])[1] || 'no-id';
    const h = (sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/) || [])[1] || '';
    const cleanH = h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    console.log(`  Section ${idx + 1}: id="${id}", heading="${cleanH.slice(0, 50)}"`);
  });

  // Footer
  const footer = content.match(/<footer[\s\S]*?<\/footer>/i);
  console.log('Footer found:', !!footer);

  // Key interactive elements / components
  const buttons = content.match(/<button[\s\S]*?<\/button>/gi) || [];
  console.log('Button count:', buttons.length);

  // Images
  const imgs = content.match(/<img[^>]+>/gi) || [];
  console.log('Image count:', imgs.length);
}

getDetails(upLPPath, 'UPLOADED ZIP: Landing Page Fully Loaded Restored');
getDetails(wsLPPath, 'WORKSPACE: Landing Page With Cake World Section');
getDetails(upSCPath, 'UPLOADED ZIP: Cake Showcase 15 Cakes Slider');
getDetails(wsSCPath, 'WORKSPACE: Glass Vitrine Cake Showcase Custom Builder');
