const fs = require('fs');
const files = ['src/App.tsx', 'src/data/blogs.ts'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/bg-\[#2D312E\]/g, 'bg-nordic-inverse-bg');
  content = content.replace(/bg-\[#FAF6F2\]/g, 'bg-edu-cream');
  content = content.replace(/bg-\[#F0F5F2\]/g, 'bg-edu-cream');
  // Also fix bg-[#5F6662]
  content = content.replace(/bg-\[#5F6662\]/g, 'bg-nordic-inverse-bg');
  
  content = content.replace(/text-edu-cream/g, 'text-nordic-inverse-text');
  content = content.replace(/text-white/g, 'text-nordic-inverse-text');
  fs.writeFileSync(file, content);
}
console.log('done');
