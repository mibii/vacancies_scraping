
//const scrapelinks = require('./scrapePage');
//const scrapeText = require('./scraper');

const scrapePage = require('./scrapePage');

const link = 'http://www.114114.com/board.php?bo_mode=list&bo_table=job&city2=%EB%8B%B9%EC%A7%84%EC%8B%9C&city1=%EC%B6%A9%EB%82%A8&cate1=&cate2=';

scrapePage(link)
  .then(convertedLinks => {
    console.log(convertedLinks);
    // Use the convertedLinks array here as needed
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
