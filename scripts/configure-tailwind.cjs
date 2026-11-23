const fs = require('node:fs');
let available = false;
try { require.resolve('@tailwindcss/postcss'); require.resolve('tailwindcss'); available = true; } catch {}
fs.mkdirSync('styles', { recursive: true });
fs.writeFileSync('styles/tailwind.css', available ? '@import "tailwindcss";\n' : '/* Offline fallback: complete component CSS is in app/globals.css. */\n');
if (!available) console.warn('Tailwind packages unavailable. Using complete component CSS; install optional dependencies to enable Tailwind utilities.');

fs.writeFileSync("postcss.config.mjs", available ? "const config = { plugins: { '@tailwindcss/postcss': {} } };\nexport default config;\n" : "const config = { plugins: {} };\nexport default config;\n");
