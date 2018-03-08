Api archive 3d
========================================
- Easy to use
- Search your file
- View info about file
- Download file


Description
====

archive3d is an API of the website: archive3d.net

Install
======

npm install archive3d

Usage
====

```javascript
//call module
var archive3d = require('archive3d')

// insert key google search token and cx tokin (website : archive3d.net)
//create your cx here : https://cse.google.com/cse/manage/all
api_archive_3d = new archive3d('key token', 'cx token');

//search a lamp :
api_archive_3d.getSearch (function (response){
    console.log (response); // <= return id, author etc in json format
}, 'lamp', 1); // <= search all lamp in first page

//show all info a file with id
api_archive_3d.getInfoFile(function(response) {
    console.log(response);
}, '4d804c68');

//download a file with id
//route "/download" in you browser
var express = require('express');
var app = express();

app.get('/download', function(req, res) {
    api_archive_3d.downloadFile('4d804c68', res);
});

app.listen(3000);
```

