const { chromium } = require('playwright');

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=12",
  "https://sanand0.github.io/tdsdata/js_table/?seed=13",
  "https://sanand0.github.io/tdsdata/js_table/?seed=14",
  "https://sanand0.github.io/tdsdata/js_table/?seed=15",
  "https://sanand0.github.io/tdsdata/js_table/?seed=16",
  "https://sanand0.github.io/tdsdata/js_table/?seed=17",
  "https://sanand0.github.io/tdsdata/js_table/?seed=18",
  "https://sanand0.github.io/tdsdata/js_table/?seed=19",
  "https://sanand0.github.io/tdsdata/js_table/?seed=20",
  "https://sanand0.github.io/tdsdata/js_table/?seed=21"
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    // Wait for at least one table to load
    await page.waitForSelector('table');
    // Get all tables, all td values, filter for numbers, sum up
    const sum = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('td'));
      return tds.reduce((acc, td) => {
        const n = parseFloat(td.textContent.replace(/,/g, ''));
        return acc + (!isNaN(n) ? n : 0);
      }, 0);
    });
    totalSum += sum;
  }
  console.log(`TOTAL_SUM=${totalSum}`);
  await browser.close();
})();
