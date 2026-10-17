// Copies the web app into www/ (Capacitor webDir)
const fs = require('fs');
const path = require('path');
const out = 'www';
const files = ['index.html', 'sw.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'money-pilot-logo.png'];
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const f of files) {
  if (!fs.existsSync(f)) { console.error('Missing file: ' + f); process.exit(1); }
  fs.copyFileSync(f, path.join(out, f));
}
console.log('www ready: ' + files.length + ' files');
