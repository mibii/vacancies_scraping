
//const scrapelinks = require('./scrapePage');
//const scrapeText = require('./scraper');

const scrapePage = require('./scrapePage');

scrapePage()
  .then(convertedLinks => {
    console.log(convertedLinks);
    // Use the convertedLinks array here as needed
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
