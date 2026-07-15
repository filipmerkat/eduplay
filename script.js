import fs from 'fs';
['src/App.tsx', 'src/pages/BlogPage.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/font-serif /g, '');
  content = content.replace(/ font-serif/g, '');
  content = content.replace(/prose-headings:font-serif /g, '');
  fs.writeFileSync(file, content);
});
console.log('Replaced font-serif in App.tsx and BlogPage.tsx');
