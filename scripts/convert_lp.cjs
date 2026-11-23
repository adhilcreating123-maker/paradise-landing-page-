const fs = require('fs');

const rawHtml = fs.readFileSync('scratch/lp_body_raw.html', 'utf8');

// Convert HTML to valid JSX
function htmlToJsx(html) {
  let jsx = html;
  
  // Replace class= with className=
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bclass='/g, "className='");
  
  // Replace for= with htmlFor=
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  
  // Self-close void tags: <img>, <input>, <br>, <hr>
  jsx = jsx.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />');
  jsx = jsx.replace(/<br(?<!\/)>/gi, '<br />');
  jsx = jsx.replace(/<hr(?<!\/)>/gi, '<hr />');
  
  // Replace HTML comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Replace href="#" on links to /cake-world or anchor links
  jsx = jsx.replace(/href="#order"/g, 'href="/cake-world"');
  
  // Replace internal links to Cake World
  jsx = jsx.replace(/href="#cakeworld"/g, 'href="/cake-world"');

  return jsx;
}

const convertedBody = htmlToJsx(rawHtml);
fs.writeFileSync('scratch/lp_jsx_body.txt', convertedBody);
console.log('Converted JSX written to scratch/lp_jsx_body.txt');
