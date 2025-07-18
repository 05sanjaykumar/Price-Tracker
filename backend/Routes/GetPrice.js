// backend/Routes/GetPrice.js

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
        headless: 'new',
        args: isDocker ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
    });

    const page = await browser.newPage();
    let items = [];

    try {
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        );
        await page.setViewport({ width: 1366, height: 768 });

        const bingUrl = `https://www.bing.com/shop?q=${encodeURIComponent(name)}`;
        await page.goto(bingUrl, { waitUntil: 'networkidle2', timeout: 0 });

        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.screenshot({ path: 'bing_shopping.png', fullPage: true });

        await page.waitForSelector('ol.br-itemsCnt');
        // const html = await page.content();
        // require('fs').writeFileSync('bing-debug.html', html);
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



        if (bingItems.length > 0) {
            items.push(...bingItems.slice(0, 30)); // Only top 5 results
        } else {
            items.push({ error: "No items found on Bing Shopping" });
        }

        await browser.close();
        res.json({ products: items });
    } catch (err) {
        console.error('Scraping failed:', err.message);
        await browser.close();
        res.status(500).json({ error: 'Something went wrong while scraping Bing.' });
    }
});

module.exports = router;
