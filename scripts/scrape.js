var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function () {
  // Scrape the NYTimes website
  return axios.get("https://www.nytimes.com").then(function (response) {

    var $ = cheerio.load(response.data);

    var articles = [];

    $("article").each(function (i, element) {
      var title = $(element).find("h2").text();
      var http = "https://www.nytimes.com"
      var link = $(element).find("a").attr("href");
      var ul = $(element).find("ul").children("li").text();
      var text = $(element).find("p").text();

      //Filter results with Title and content
      if (ul === "" && text === "") {
        var store = false;
      } else {
        if (ul !== "" && text === "") {
          var content = ul;
        } else {
          var content = text;
        };
        // Save these articles in an object that we'll push into the results array we defined earlier
        articles.push({
          headline: title,
          summary: content,
          url: http + link
        });
      };
    });
return articles;
  });
 
};


scrape();
module.exports = scrape;