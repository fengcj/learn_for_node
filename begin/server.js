var http = require("http");
var url = require("url");

var PORT = 8888;


function start(route /*route is a function as router*/,handle){

	http.createServer(function(request,response){

	var postData = "";

	console.log(request.url);
	var pathName = url.parse(request.url).pathname;
	console.log("request from: " + pathName + " received");

	route(handle,pathName,response,request);


/*	request.setEncoding("utf-8");
	request.addListener("data",function(postDataChunk){
		postData += postDataChunk;
		console.log("Recevied POST data chunk: " + postDataChunk);
	});

	request.addListener("end",function(){
		route(handle,pathName,response,postData);	
	})*/

	

/*	response.writeHead(200,{"Content-Type" : "text/plain"});
	response.write("Hello World");
	response.end();*/


	}).listen(PORT);

	console.log("Server start work!");

}

// export the start function
exports.start = start;