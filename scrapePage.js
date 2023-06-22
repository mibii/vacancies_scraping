const axios = require('axios');
const cheerio = require('cheerio');

function scrapePage(link) {
  return new Promise((resolve, reject) => {
    //const link = '';

    // Make a GET request to the webpage
    axios.get(link)
      .then(response => {
        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Extract all href links
        const links = [];

        $('a').each((index, element) => {
          const href = $(element).attr('href');
          if (href && !href.startsWith('http://www.114114.com/')) {
            links.push('http://www.114114.com/' + href);
          }
        });

        const trimmedLinks = links.slice(8, -4);

        const convertedLinks = trimmedLinks.map(link => {
          const address = link;
          const city1 = decodeURIComponent(link.match(/city1=([^&]+)/)[1]);
          const city2 = decodeURIComponent(link.match(/city2=([^&]+)/)[1]);
          const base = link.split('=')[3];
          const page = parseInt(link.match(/page=(\d+)/)[1]);
          return { address, city1, city2, base, page };
        });

        resolve(convertedLinks);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = scrapePage;
