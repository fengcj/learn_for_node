var fs = require("fs");



// sync
var fileNames = fs.readdirSync(".");
var totalBytes = 0;
for(var i=0;i<fileNames.length;i++){
	var stats = fs.statSync("./" + fileNames[i]);
	totalBytes += stats.size;
}
console.log("All files have " + totalBytes + " Bytes");

// async
totalBytes = 0;
fs.readdir(".",function(err,fileNames){

	for(var i=0;i<fileNames.length;i++){
		// must use count to print the final totalBytes
		var count = fileNames.length;
		fs.stat("./" + fileNames[i],function(err,stats){
			totalBytes += stats.size;
			count--;
			if(count == 0){
				console.log("All files have " + totalBytes + " Bytes");	
			}
			//  console.log("All files have " + totalBytes + " Bytes");
		})
	}

})
