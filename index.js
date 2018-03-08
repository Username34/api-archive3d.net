const GoogleSearch = require('google-search');
const url = require('url');
const jsdom = require("jsdom");
const request = require('request');
const parse = require('papaparse');
const {
    JSDOM
} = jsdom;

// Constructor
let googleSearch = null;
let test = '';

function apiArchive3d(key_google_Api, cx_google_api) {
    googleSearch = new GoogleSearch({
        key: key_google_Api,
        cx: cx_google_api
    });
}

apiArchive3d.prototype.getSearch = function getSearch(callback, query, page = 1) {
    let start_page = 0;
    if (page == 1) {
        start_page = 1;
    } else if (page > 1) {
        start_page = (page * 10) - 9;
    }
    googleSearch.build({
        q: query + " inurl:\"download\"",
        start: start_page,
        num: 10,
    }, function(error, response) {
        if (typeof response.kind !== 'undefined') {
            callback({
                totalResult: response.searchInformation.totalResults,
                totalPage: Math.ceil(response.searchInformation.totalResults / 10),
                actualPage: page
            });
            for (let indice in response.items) {
                var q = url.parse(response.items[indice].link, true);
                getImg(function(src) {
                    callback({
                        id: url.parse(response.items[indice].link, true).query.id,
                        title: response.items[indice].title,
                        image: src.Image,
                        author: src.Author,
                        size: src.Size
                    });
                }, q.query.id);
            }
        } else {
            callback(response);
        }
    });
}

function getImg(callback, id) {
    request.get('https://archive3d.net/?a=download&id=' + id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const dom = new JSDOM(body);
            author = dom.window.document.querySelector("#info p:nth-child(5)").textContent.trim().replace('Added by: ', '');
            size = dom.window.document.querySelector("#info p:nth-child(3)").textContent.trim().replace('Size: ', '')
            callback({
                Image: dom.window.document.querySelector("#prevbig img").src,
                Author: author,
                Size: size
            })
        }
    });
}

apiArchive3d.prototype.getInfoFile = function getInfoFile(callback, id) {
    request.get('https://archive3d.net/?a=download&id=' + id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const dom = new JSDOM(body);
            author = dom.window.document.querySelector("#info p:nth-child(5)").textContent.trim().replace('Added by: ', '');
            size = dom.window.document.querySelector("#info p:nth-child(3)").textContent.trim().replace('Size: ', '');
            category = dom.window.document.querySelector("#info p:nth-child(2)").textContent.trim().replace('Category: ', '');
            tag = dom.window.document.querySelector("#info p:nth-child(8)").textContent.trim().replace('Tags: ', '');
            tags = [];
            tag = parse.parse(tag);
            for (let element in tag.data[0]) {
                tags.push(tag.data[0][element]);
            }
            callback({
                Image: dom.window.document.querySelector("#prevbig img").src,
                Author: author,
                Size: size,
                Category: category,
                Tags: tags
            })
        }
    });
}

apiArchive3d.prototype.downloadFile = function downloadFile(id, res) {
    request('https://archive3d.net/?a=download&do=get&id=' + id).pipe(res);
}

module.exports = apiArchive3d;