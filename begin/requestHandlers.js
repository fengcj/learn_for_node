var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var util = require("util");

var formidable = require("formidable");



function start(response){
	console.log("Request handler 'start' was called.");

/*	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';*/

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';


    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response,request){
	console.log("Request handler 'upload' was called.");


	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request,function(error,fields,files){
		console.log("parsing done.");

		

		console.log(files.upload.path);  // C:\Users\fengc\AppData\Loacal\Temp\upload_e1fa314bb....
		/* reported error is: EXDEV, cross-device link not permitted */
		//fs.renameSync(files.upload.path,"./tmp/test.png");       because current directory is E:\laboratory\learn_for_node\begin

		var readStream = fs.createReadStream(files.upload.path);
		var writeStream = fs.createWriteStream("./tmp/test.png");
		readStream.pipe(writeStream);

		readStream.on("end",function(){
			console.log("close the readStream");
		});

		writeStream.on("end",function(){
			console.log("close the writeStream");
		});

		/* util.pump() is deprecated.Use readableStream.pipe() instead */
/*		util.pump(readStream,writeStream,function(){
			fs.unlinkSync(files.upload.path);
		});*/

		response.writeHead(200,{"Content-Type" : "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();




	});

/*	response.writeHead(200,{"Content-Type" : "text/plain"});
	console.log(postData);
	response.write("You have send text:" + querystring.parse(postData).text);
	response.end();*/
}


function show(response){
	console.log("Request handler 'show' was called.");
	fs.readFile("./tmp/test.png","binary",function(error,file){

		if(error){
			response.writeHead(500,{"Content-Type" : "text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200,{"Content-Type" : "image/png"});
			response.write(file,"binary");
			response.end();
		}

	});

}


function findAll(response){
	console.log("Request handler 'findAll' was called.")
	exec("find /",
		{ timeout: 100000, maxBuffer: 20000*1024 },  // not effect
		function(error,stdout,stderr){
		response.writeHead(200,{"Content-Type" : "text/plain"});
		response.write(stdout);
		response.end();
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.findAll = findAll;
