const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const lines = content.split('\n');

let navIndex1 = lines.findIndex(l => l.includes('href="#philosophy" className="text-sm font-medium'));
if (navIndex1 !== -1) {
  lines.splice(navIndex1, 1);
}

let navIndex2 = lines.findIndex(l => l.includes('href="#philosophy" onClick={() => setIsMobileMenuOpen(false)}'));
if (navIndex2 !== -1) {
  lines.splice(navIndex2, 1);
}

const philosophyStart = lines.findIndex(l => l.includes('SECTION: BRAND MANIFESTO & PHILOSOPHY'));
let philosophyEnd = -1;
for (let i = philosophyStart; i < lines.length; i++) {
  if (lines[i].includes('</section>') && i > philosophyStart + 10) {
    philosophyEnd = i;
    break;
  }
}

const philosophyLines = lines.splice(philosophyStart, philosophyEnd - philosophyStart + 1);

const aboutEnd = lines.findIndex((l, index) => l.includes('</section>') && lines.slice(index - 20, index).some(prevLine => prevLine.includes('ABOUT TEASER - TETA TEA')));

lines.splice(aboutEnd + 1, 0, ...philosophyLines);

fs.writeFileSync('src/App.tsx', lines.join('\n'));
