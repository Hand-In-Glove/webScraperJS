const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1";

axios(url)
  .then(respsonse => {
    const html = respsonse.data;
    const $ = cheerio.load(html);
    const statsTable = $(".statsTableContainer > tr");
    const playerData = [];

    statsTable.each(function(index) {
      const rank = $(this)
        .find(".rank > strong")
        .text();

      const name = $(this)
        .find(".playerName > strong")
        .text();

      const nationality = $(this)
        .find(".playerCountry")
        .text();
      const goals = $(this)
        .find(".mainStat")
        .text();

      playerData.push({ rank, name, nationality, goals });
      console.log(playerData);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
