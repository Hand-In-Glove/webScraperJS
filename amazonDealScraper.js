const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const url = "https://www.amazon.co.uk/gp/deals?ref_=nav_cs_gb";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const html = await page.content();

  const $ = cheerio.load(html);
  const dealData = [];

  try {
    $("#dealTitle > span")
      .slice(0, 10)
      .each((index, element) => {
        const deal = $(element).text().replace(/\n/g, "").trim();
        dealData.push({ deal });
      });

    $(
      'span[class="gb-font-size-medium inlineBlock unitLineHeight dealPriceText"]'
    )
      .slice(0, 10)
      .each((index, element) => {
        const price = $(element).text();
        dealData[index] = { ...dealData[index], price };
      });
    console.log(dealData);
  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();
