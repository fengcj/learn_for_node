var http = require('http');
var querystring = require('querystring');
var cheerio = require('cheerio');


var fs = require('fs');

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



var URL = "http://www.lavafox.com/study-words.aspx?Mid=80&&Sid=908";
var localURL = "http://localhost/PlantsVsZombies/node_spider_test.html";



var host = "http://www.lavafox.com/";

var postData = querystring.stringify({
	'msg': 'Hello World!'
});

/*var options = {
  hostname: localURL,
  port: 80,
  path: '/upload',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};*/

var req = http.request(localURL, function(res) {
	// console.log('STATUS: ' + res.statusCode);
	// console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	var content = '';
	res.on('data', function(chunk) {
		// console.log('BODY: ' + chunk);
		content += chunk;
	});
	res.on('end', function() {

		// Todo: use Reg to find url of mp3



		var index = content.indexOf('<html');
		content = content.substr(index);

		$ = cheerio.load(content);
		var mp3_urls = [];
		var audio_sources = $("audio > source");
		audio_sources.each(function(index, element) {
			var $element = $(element);
			mp3_urls.push(host + $element.attr("src"));
			//  console.log($element.attr("src"));
		})

		mp3_urls.forEach(function(url,index){


			download(url,"./mp3/" + url.substr(url.lastIndexOf('/')),function(msg){
				console.log(msg);
			});
			console.log(url);

		});

	})

});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);

});

// write data to request body
// req.write(postData);
req.end();