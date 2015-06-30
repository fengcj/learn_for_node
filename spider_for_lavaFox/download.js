var fs = require('fs');
var http = require('http');


var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

var host =  'http://www.lavafox.com/';
var srcs = ["images/mp3/recognize.mp3", "images/sound/ac3df6e7-f641-4eda-b49d-deb10b740645.mp3", "images/mp3/lip.mp3", "images/sound/ac3df6e7-f641-4eda-b49d-deb10b740645.mp3", "images/mp3/boob.mp3", "images/sound/ac3df6e7-f641-4eda-b49d-deb10b740645.mp3", "images/mp3/e41c942a-b67a-4f55-836a-224b26607287.mp3", "images/sound/ac3df6e7-f641-4eda-b49d-deb10b740645.mp3", "images/mp3/1a88ce1e-4066-43e5-b59a-58d5994de9dc.mp3", "images/sound/3d801db3-580b-4fc0-b75e-819fe9bddeb1.mp3", "images/mp3/c924c22f-a1ef-4208-923d-c8b5220be3fd.mp3", "images/sound/5ca6165a-d32c-48d7-a521-da7f40e2986e.mp3", "images/mp3/83ca2db6-6a3c-4974-abde-be5e6ca6804a.mp3", "images/sound/dcd87114-25aa-4c68-800a-c21a9082722a.mp3", "images/mp3/awkward.mp3", "images/sound/625bbfff-7b75-4851-89ab-28fb4f5c7430.mp3", "images/sound/6735c98e-6676-4bc3-8189-9cd9be2cad45.mp3"];

for(var i=0;i<srcs.length;i++){
	var url = host + srcs[i];
	download(url,'mp3'+ url.substr(url.lastIndexOf('/')),function(msg){
		console.log(msg);
	})
}

// url =  'http://www.lavafox.com/' + 'images/mp3/recognize.mp3';

// download(url,'mp3'+ url.substr(url.lastIndexOf('/')),function(msg){
// 	console.log(msg);
// })






// var audios = $('audio');
// var src = [];
// for(var i=0;i<audios.length;i++){
// 	src.push($(audios[i]).children('source').attr('src'));
// }
