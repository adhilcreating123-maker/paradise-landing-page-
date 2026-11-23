const fs = require('fs');

const rawHtml = fs.readFileSync('stitch_paradise_bakes_website_clone/paradise_bakes_cake_showcase_15_cakes_slider/code.html', 'utf8');

// Let's inspect the exact lines between body tags
const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let body = bodyMatch[1];

// Remove scripts from body
body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

// Clean void tags and attributes for JSX
body = body.replace(/\bclass="/g, 'className="');
body = body.replace(/\bclass='/g, "className='");
body = body.replace(/\bfor="/g, 'htmlFor="');
body = body.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');
body = body.replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />');
body = body.replace(/<br(?<!\/)>/gi, '<br />');
body = body.replace(/<hr(?<!\/)>/gi, '<hr />');

// Convert inline styles
body = body.replace(/style="([^"]*)"/gi, (match, p1) => {
  const rules = p1.split(';').filter(r => r.trim());
  const obj = {};
  rules.forEach(r => {
    const [k, v] = r.split(':');
    if (k && v) {
      const camelK = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      obj[camelK] = v.trim();
    }
  });
  return `style={${JSON.stringify(obj)}}`;
});

// HTML comments to JSX
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Replace top nav links
body = body.replace(/href="#"(\s*>Home<\/a>)/g, 'href="/"$1');
body = body.replace(/href="#"(\s*>Cakes<\/a>)/g, 'href="/cake-world"$1');
body = body.replace(/href="#"(\s*>CUSTOM<\/a>)/g, 'href="#custom-builder"$1');
body = body.replace(/href="#"(\s*>MADE<\/a>)/g, 'href="#cakes-we-have-made"$1');
body = body.replace(/href="#"(\s*className="[^"]*hover:text-\[#5C0302\][^"]*">\s*<span className="material-symbols-outlined[^"]*">arrow_back<\/span>\s*Back to Home<\/a>)/g, 'href="/"$1');

fs.writeFileSync('scratch/sc_clean_body.jsx', body);
console.log('Clean JSX written to scratch/sc_clean_body.jsx, size:', body.length);
