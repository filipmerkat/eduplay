import { Jimp } from 'jimp';

async function run() {
  const image = await Jimp.read('public/Eduplaylogo2.png');
  const colors = {};
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const hex = image.getPixelColor(x, y).toString(16).padStart(8, '0');
      // format is rrggbbaa
      const a = parseInt(hex.slice(6, 8), 16);
      if (a > 100) {
        const c = '#' + hex.slice(0, 6);
        colors[c] = (colors[c] || 0) + 1;
      }
    }
  }
  const sorted = Object.entries(colors).sort((a,b)=>b[1]-a[1]).slice(0, 20);
  console.log(sorted);
}

run().catch(console.error);
