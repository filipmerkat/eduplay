const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  await page.goto('https://share.google/jERgqw475DveRqvY3', { waitUntil: 'networkidle2' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text);
  await browser.close();
})();
