import fs from 'fs';
const files = ['src/App.tsx', 'src/data/blogs.ts'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Revert inverse-bg usage where it made things permanently bright in dark mode
  content = content.replace(/bg-nordic-inverse-bg/g, 'bg-edu-charcoal');
  content = content.replace(/text-nordic-inverse-text/g, 'text-edu-cream');
  fs.writeFileSync(file, content);
}
console.log('done');
