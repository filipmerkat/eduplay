const fs = require('fs');
const esbuild = require('esbuild');

async function test() {
  const code = fs.readFileSync('src/App.tsx', 'utf8');
  try {
    await esbuild.transform(code, { loader: 'tsx' });
    console.log("Success");
  } catch (e) {
    console.error(e.message);
  }
}
test();
