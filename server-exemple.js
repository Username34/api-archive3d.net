var archive3d = require('./api_archive3d')
var express = require('express');
var app = express();

const nbrResultQuery = 10;

api_archive_3d = new archive3d('key token', 'cx token');

app.get('/search', function(req, res) {
    let responses = [];
    let indice = 0;
    let totalResult = nbrResultQuery;
    api_archive_3d.getSearch(function(response) {
        responses.push(response);
        if (typeof response.error !== 'undefined' || response == null) {
            res.send(response);
        }
        if (typeof response.totalResult !== 'undefined') {
            if (response.totalResult < nbrResultQuery) {
                totalResult = response.totalResult;
                if (totalResult == 0) {
                    res.json(responses);
                }
            }
        } else {
            indice++;
            if (indice == totalResult) {
                res.json(responses);
            }
        }
    }, req.query.query, req.query.page);
});

app.get('/getInfo', function(req, res) {
    api_archive_3d.getInfoFile(function(response) {
        res.json(response);
    }, req.query.id);
});

app.get('/download', function(req, res) {
    api_archive_3d.downloadFile(req.query.id, res);
});
app.listen(3000);