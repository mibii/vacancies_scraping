const axios = require('axios');
const cheerio = require('cheerio');
const translate  = require('translate-google');

const translateArray = async (array, sourceLang, targetLang) => {
    try {
      const translations = [];
      for (const item of array) {
        const text  = await translate(item, { from: sourceLang, to: targetLang });
        // const translatedContent = await translate(content, { from: 'ko', to: 'ru' });
        translations.push(text);
      }
      return translations;
    } catch (error) {
      throw error;
    }
  };

const scraper = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(async response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const articleTitles = [];
        const articleMeta = [];
        const articleDetails = [];
        
        // Exclude script tags from parsing
        $('script').remove();

        $('.article-title').each((index, element) => {
          const title = $(element).text().trim().replace(/\n/g, '');
          if (title) {
            articleTitles.push(title);
          }
        });


        $('.article-meta').each((index, element) => {
            const meta = $(element).text().trim().replace(/\n/g, '');
            if (meta) {
                const result=meta.slice(0,16);
              articleMeta.push(result);
            }
          });
          

      $('.article-detail').each((index, element) => {
        const detail = $(element).html().replace(/<br>114114에서 보았다고 말씀하세요.<br>/g, '').replace(/<br>/g, '\n').trim();
        if (detail && detail.length > 0) {
          articleDetails.push(detail);
        }
      });
      
      

      //  const translations = await Promise.all([
      ////      translateArray(articleTitles, 'ko', 'ru'),
      //      translateArray(articleMeta, 'ko', 'ru'),
     //       translateArray(articleDetails, 'ko', 'ru')
     //     ]);
      
      //    const translatedArticleTitles = translations[0];
       //   const translatedArticleMeta = translations[1];
      //    const translatedArticleDetails = translations[2];
      
           
       // resolve({ translatedArticleTitles, translatedArticleMeta, translatedArticleDetails });
       //console.log(articleTitles);
       //console.log(articleMeta);
       //console.log(articleDetails);
         resolve({ articleTitles, articleMeta, articleDetails });

      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = scraper;
