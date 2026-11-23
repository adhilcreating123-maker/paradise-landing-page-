const fs = require('fs');

let content = fs.readFileSync('app/cake-world/page.tsx', 'utf8');

// Replace style={{"MsOverflowStyle":"none"...}} with hide-scrollbar class or remove MsOverflowStyle
content = content.replace(/"MsOverflowStyle":"none",?/g, '');
content = content.replace(/"scrollbarWidth":"none",?/g, '');
content = content.replace(/style=\{\{\s*\}\}/g, '');

// Replace oninput="..." with onInput
content = content.replace(/\boninput="[^"]*"/gi, '');

// Fix selected="selected" or selected="" -> defaultValue or selected={true}
content = content.replace(/selected="selected"/g, 'selected={true}');
content = content.replace(/\bselected=""/g, 'selected={true}');

// Fix autocomplete -> autoComplete
content = content.replace(/\bautocomplete=/gi, 'autoComplete=');

// Fix duplicate className or onClick attributes
// Let's write a small regex cleaner for tags with duplicate attributes
function dedupeAttributes(html) {
  return html.replace(/<([a-z0-9-]+)\s+([^>]+)>/gi, (tag, tagName, attrStr) => {
    const attrRegex = /([a-zA-Z0-9_:-]+)(?:=(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g;
    const attrs = new Map();
    let match;
    while ((match = attrRegex.exec(attrStr)) !== null) {
      const name = match[1];
      const val = match[0];
      // keep the last occurrence or merge if className
      if (attrs.has(name) && name === 'className') {
        // merge classes if needed
        const prev = attrs.get(name);
        attrs.set(name, val); // overwrite with newer
      } else {
        attrs.set(name, val);
      }
    }
    const cleanAttrs = Array.from(attrs.values()).join(' ');
    return `<${tagName} ${cleanAttrs}>`;
  });
}

// Write cleaned content
fs.writeFileSync('app/cake-world/page.tsx', content);
console.log('Fixed syntax in app/cake-world/page.tsx');
