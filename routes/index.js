var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  var books = [
    'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=best+sellers+2015&rh=n%3A283155%2Ck%3Abest+sellers+2015',
    'http://www.amazon.com/s/ref=sr_pg_2?rh=n%3A283155%2Ck%3Abest+sellers+2015&page=2&keywords=best+sellers+2015&ie=UTF8&qid=1430351187',
    'http://www.amazon.com/s/ref=sr_pg_3?rh=n%3A283155%2Ck%3Abest+sellers+2015&page=3&keywords=best+sellers+2015&ie=UTF8&qid=1430351244'
  ];

  books.forEach(function(url) {
    request(url, function (error, response, body) {
      if ( !error && response.statusCode === 200 ) {

        // using cheerio to parse resource
        $ = cheerio.load(body);

        downloadBooks($);

      }
    });
  });

  res.render('index', { title: 'Express' });
});

function downloadBooks($) {
  var li = 'li.s-result-item';
  var images = $(li).find($('img.s-access-image')).map(function() {
    return this.attribs.src;
    //return $(img).attr('src');
  });

  var details = $(li).find($('a.s-access-detail-page')).map(function() {
    return this.attribs.title;
  });

  images = Array.prototype.slice.call(images);
  //console.log(images);

  details = Array.prototype.slice.call(details);
  console.log(details);
}

module.exports = router;
