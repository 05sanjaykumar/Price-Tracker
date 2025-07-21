// backend/Routes/GetPrice.js
// This is just for education purposes and should not be used in production. 
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const isDocker = process.env.IS_DOCKER === 'true';

if (!isDocker) {
  const dotenv = require('dotenv');
  const path = require('path');
  dotenv.config({ path: path.join(__dirname, '../../.env.local') });
}

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ],
    defaultViewport: null,
  });

//   const context = await browser.createIncognitoBrowserContext();
  const page = await browser.newPage();

  try {
    // Anti-detection setup
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.bing.com/',
    });

    await page.setViewport({
      width: 1371 + Math.floor(Math.random() * 10),
      height: 768,
    });

    // Clear session/local storage
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      localStorage.clear();
      sessionStorage.clear();
    });

    const bingUrl = `https://www.bing.com/shop?q=${encodeURIComponent(name)}`;
    await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 0 });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Scroll a bit
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight / 2);
    });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Save debug screenshot + HTML
    // await page.screenshot({ path: 'bing_shopping.png', fullPage: true });
    // const html = await page.content();
    // require('fs').writeFileSync('bing-debug.html', html);

    await page.waitForSelector('ol.br-itemsCnt', { timeout: 5000 });
    const bingItems = await page.evaluate(() => {
      const results = [];
      const cards = document.querySelectorAll('li.br-item');

      cards.forEach(card => {
        const titleEl = card.querySelector('div.br-title span');
        const priceEl = card.querySelector('div.pd-price.br-standardPrice.promoted div');
        const storeEl = card.querySelector('div.br-sellerNameWithTb');
        const linkEl = card.querySelector('a.br-titlelink');

        const title = titleEl?.innerText.trim() || null;
        const price = priceEl?.innerText.trim() || null;
        const store = storeEl?.innerText.trim() || null;
        const link = linkEl?.href
          ? 'https://www.bing.com' + linkEl.getAttribute('href')
          : null;

        if (title && price && link) {
          results.push({ title, price, store, link });
        }
      });

      return results;
    });

    const items = bingItems.length > 0
      ? bingItems.slice(0, 30)
      : [{ error: 'No items found on Bing Shopping' }];

    await browser.close();
    res.json({ products: items });
  } catch (err) {
    console.error('Scraping failed:', err.message);
    await browser.close();
    res.status(500).json({ error: 'Something went wrong while scraping Bing.' });
  }
});

module.exports = router;
