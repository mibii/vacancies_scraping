const geturls =   require('./scrapePage.js')
const scrapePage = require('./scraper');
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

let vocansys=[];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public', 'index.html'));
    //res.json(vocansys)
})

app.get('/api', (req, res) => {
    const link = 'http://www.114114.com/board.php?bo_mode=list&bo_table=job&city2=%EB%8B%B9%EC%A7%84%EC%8B%9C&city1=%EC%B6%A9%EB%82%A8&cate1=&cate2=';

    geturls(link)
       .then(convertedLinks => {
        // Use the convertedLinks array here as needed
        convertedLinks.forEach(url => { 
            scrapePage(url.address)
                .then(({ articleTitles, articleMeta, articleDetails }) => {
        
                    const vocansy= {Title: [], City1:'', City2:'', Date: [],  Descr: [] }
        
                        vocansy.Title= articleTitles;
                        vocansy.Date=articleMeta;
                        vocansy.Descr=articleDetails;
                        vocansy.City1=url.city1;
                        vocansy.City2=url.city2;
        
                        vocansys.push({vocansy})
                   
        
                })
        })
        
            
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    
      res.json(vocansys);
      vocansys=[];
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
