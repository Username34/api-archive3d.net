var archive3d = require('./api_archive3d') 
api_archive_3d = new archive3d('', '');
//console.log(api_archive_3d.getSearch);
archive3d = new archive3d();
//console.log(archive3d);

api_archive_3d.getSearch(function (response){
    console.log (response);
});