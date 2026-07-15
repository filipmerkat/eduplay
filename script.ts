import fs from 'fs';

function replaceInFile(file: string) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/font-serif /g, '');
  content = content.replace(/ font-serif/g, '');
  content = content.replace(/prose-headings:font-serif /g, '');
  fs.writeFileSync(file, content);
}

replaceInFile('src/App.tsx');
replaceInFile('src/pages/BlogPage.tsx');
console.log('Done!');
