var async = require("async");

var concurrencyCount = 0;

var urls = [];
for(var i=0; i<30;i++){
	urls.push("http://localhost:100000/"+ i + ".html");
}

var fetchUrl = function(url,callback){
	var delay = parseInt((Math.random() * 10000000) % 2000,10);
	concurrencyCount++;
	console.log("Now the concurrent number is " + concurrencyCount + " and is getting the content of " + url + " will cost " + delay + " ms");
	setTimeout(function(){
		concurrencyCount--;
		callback(null,url + " content");  // about this callback,you can get more from https://github.com/caolan/async#mapLimit

	});
}

async.mapLimit(urls,5,function(url,callback){
	fetchUrl(url,callback);
},function(err,result){
	if(err){
		console.log("err is " + err);
	}else{
		console.log("final");
		console.log(result);	
	}
	
});