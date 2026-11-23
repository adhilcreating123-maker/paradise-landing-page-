const fs = require('fs');

let content = fs.readFileSync('app/cake-world/page.tsx', 'utf8');

content = content.replace(
  /<span className="[^"]*" id="toggle-thumb" className=\{`([^`]*)`\}><\/span>/,
  '<span id="toggle-thumb" className={`$1`}></span>'
);

fs.writeFileSync('app/cake-world/page.tsx', content);
console.log('Fixed toggle-thumb duplicate className!');
