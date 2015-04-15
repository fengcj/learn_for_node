var http = require("http");
var https = require("https");
var fs = require("fs");


function downWebpage(url,fileName){

	var handler = function(res){

		var chunks = [];
		var size = 0;
		res.on("data",function(chunk){
			size += chunk.length;
			chunks.push(chunk);
		});
		res.on("end",function(){
			var data = Buffer.concat(chunks,size);
			fs.writeFile(fileName,data,function(err){
				if(err){
					console.log("write file error:" + err);
				}else{
					console.log("downWebpage done " + fileName);
				}
			})
		});
	}

	if(url.indexOf("https") >= 0){		
		var options = require('url').parse( /**String*/ url );
		options.rejectUnauthorized = false;
		options.agent = new https.Agent(options);
		https.get(options,handler).on("error",function(e){
			console.log("https error: " + e);
		});

	}else{		
		http.get(url,handler).on("error",function(e){
			console.log("http error: " + e);
		});
	}


}

downWebpage("http://www.google.com/index.html","google_http.html");

downWebpage("https://encrypted.google.com/","google_https.html");

// downWebpage("https://cnodejs.org/","cnodejs.html");

downWebpage("www.baidu.com","baidu.com");