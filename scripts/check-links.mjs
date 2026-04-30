import fs from 'node:fs';
import path from 'node:path';

const root = 'dist';
const built = new Set();

function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name === 'index.html') {
      const rel = path.relative(root, d).split(path.sep).join('/');
      built.add('/' + (rel ? rel + '/' : ''));
    }
  }
}
walk(root);

const links = new Map();
function scan(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) scan(p);
    else if (f.name.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      const re = /href="(\/[^"#?]*)"/g;
      let m;
      while ((m = re.exec(html))) {
        if (!links.has(m[1])) links.set(m[1], p);
      }
    }
  }
}
scan(root);

const skipExt = /\.(xml|txt|svg|ico|webp|jpg|jpeg|png|css|js|woff|woff2|json|pdf)$/i;
const missing = [];
for (const [l, src] of links) {
  if (l.startsWith('//') || l.startsWith('/_astro/') || skipExt.test(l)) continue;
  const norm = l.endsWith('/') ? l : l + '/';
  if (!built.has(norm) && !fs.existsSync(path.join(root, l.replace(/^\//, '')))) {
    missing.push({ link: l, src: path.relative(root, src) });
  }
}
console.log('Built pages:', built.size);
console.log('Unique internal links:', links.size);
console.log('Missing:', missing.length);
for (const m of missing.slice(0, 40)) console.log(`  ${m.link}  (in ${m.src})`);
