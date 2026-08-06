const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace('<a href="#" className="hover:text-edu-cream transition-colors">Opći uvjeti</a>', '<a href="#" className="hover:text-edu-cream transition-colors">Opći uvjeti</a>\n              <a href="/kucni-red.html" className="hover:text-edu-cream transition-colors">Kućni red</a>');
fs.writeFileSync('src/App.tsx', content);
