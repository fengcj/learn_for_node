var fs = require("fs");

// sync
var fileNames = fs.readdirSync(".");
for(var i=0; i<fileNames.length;i++){
	console.log(fileNames[i]);
}
// console.log("Current Uid: " + process.getuid());  getuid function is only available on POSIX platform.
console.log("Current Pid: " + process.pid);


// async
fs.readdir(".",function(err,fileNames){
	for(var i=0; i<fileNames.length;i++){
		console.log(fileNames[i]);
	}
});
console.log("Current Pid: " + process.pid);