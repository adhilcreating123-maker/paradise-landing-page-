const fs = require('fs');

const rawHtml = fs.readFileSync('scratch/sc_body_raw.html', 'utf8');

function htmlToJsx(html) {
  let jsx = html;
  
  // class to className
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bclass='/g, "className='");
  
  // for to htmlFor
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  
  // Self-closing void tags
  jsx = jsx.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />');
  jsx = jsx.replace(/<br(?<!\/)>/gi, '<br />');
  jsx = jsx.replace(/<hr(?<!\/)>/gi, '<hr />');

  // Replace style attributes
  jsx = jsx.replace(/style="([^"]*)"/gi, (match, p1) => {
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

  // Comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // onclick to onClick (clean up inline strings if any)
  jsx = jsx.replace(/onclick="([^"]*)"/gi, '/* inline-onclick: $1 */');

  return jsx;
}

const converted = htmlToJsx(rawHtml);
fs.writeFileSync('scratch/sc_jsx_body.txt', converted);
console.log('Converted Showcase JSX written to scratch/sc_jsx_body.txt');
