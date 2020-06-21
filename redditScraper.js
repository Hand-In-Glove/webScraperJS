const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const url = "https://www.reddit.com/r/news";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const html = await page.content();

  const $ = cheerio.load(html);
  const titleData = [];

  try {
    $('a[href*="/r/news/comments"] h3').each((index, elem) => {
      const title = $(elem).text();
      titleData.push({ title });
    });
    console.log(titleData);
  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();
