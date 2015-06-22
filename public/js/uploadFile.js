

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('div.request').addEventListener('click', function() {
        var value = document.querySelector('input[type="text"]').value;

        makeAjaxCall('requestRouter?url=' + encodeURI(value), function(xhr) {
            if(xhr.readyState === 4){
                //var response = JSON.parse(xhr.responseText);
                //console.log(response);
            }
        });
    });
});

var books = [
    'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=best+sellers+2015&rh=n%3A283155%2Ck%3Abest+sellers+2015',
    'http://www.amazon.com/s/ref=sr_pg_2?rh=n%3A283155%2Ck%3Abest+sellers+2015&page=2&keywords=best+sellers+2015&ie=UTF8&qid=1430351187',
    'http://www.amazon.com/s/ref=sr_pg_3?rh=n%3A283155%2Ck%3Abest+sellers+2015&page=3&keywords=best+sellers+2015&ie=UTF8&qid=1430351244'
];

function makeAjaxCall(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4) {
            callback(xhr);
        }
    });

    xhr.send();
}



