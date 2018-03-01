const GoogleSearch = require('google-search');
const url = require('url');
const jsdom = require("jsdom");
const request = require('request');
const { JSDOM } = jsdom;

apiArchive3d.prototype.googleSearch = null;
// Constructor
function apiArchive3d(key_google_Api, cx_google_api) {
    apiArchive3d.prototype.googleSearch = new GoogleSearch({
        key: key_google_Api,
        cx: cx_google_api
      });
  }

  var googleSearch = new GoogleSearch({
    key: 'xxxx',
    cx: 'xxxx'
  });
 
apiArchive3d.prototype.getSearch = function getSearch(callback){
googleSearch.build({
  q: "lamp inurl:\"download\"",
  start: 1,
  num: 10,
}, function(error, response) {
    for (let indice in response.items) {
    var q = url.parse(response.items[indice].link, true);
        getImg(function(src){
            callback({id:q.query.id, title:response.items[indice].title, url_img:src});
         }, q.query.id);
    }
});
}

function getImg(callback, id){
   request.get('https://archive3d.net/?a=download&id='+id, function (error, response, body) {
       if (!error && response.statusCode == 200) {
           const dom = new JSDOM(body);
           callback(dom.window.document.querySelector("#prevbig img").src)
       }
   });
}

module.exports = apiArchive3d;