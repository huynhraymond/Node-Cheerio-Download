
//var express = require('express');
//var router = express.Router();

var router = require('express').Router();
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var uuid = require('uuid');

router.get('/', function(req, res) {
    var url = req.query.url;

    // using request for download resource
    request(url, function (error, response, body) {
        if ( !error && response.statusCode === 200 ) {

            // using cheerio to parse resource
            $ = cheerio.load(body);

            downloadBooks($);

            /*
            var images = Array.prototype.slice.call($('img'));
            images = images.map(function(image) {
               return image.attribs.src;
            });

            //console.log(images);

            async.parallelLimit( images.map(function(url) {
                return downloadFile.bind(null, url);
            }), 4, function(err, results) {
                if (err) console.log('Something broke');
                else console.log('success using async parallel limit');
            });  */

        }
    });

    res.status(200).json({message: 'success'});
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

function downloadFile(url, callback) {
    var ext = path.extname(url);
    var id = uuid.v4();
    var filename = './public/images/' + id + ext;

    // callback is invoked after reading the image, or writing the image is complete
    var stream_r = request(url);
    var stream_w = fs.createWriteStream(filename);
    /*
    stream_r.on('end', function () {
        console.log('finished reading ' + url + ' from http');
    });  */

    stream_w.on('finish', function () {
        callback(null, url);
    });

    stream_r.pipe(stream_w);
}

module.exports = router;
