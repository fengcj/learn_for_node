var fs = require("fs");


function copy(src,dest){
	
	fs.writeFileSync(dest,fs.readFileSync(src));

/*	var readStream = fs.createReadStream(src);
	var writeStream = fs.createWriteStream(dest);
	readStream.pipe(writeStream);

	readStream.on("end",function(){
		console.log("close the readStream");
	});

	writeStream.on("end",function(){
		console.log("close the writeStream");
	});*/
}

function main(argv){
	copy(argv[0],argv[1]);
}



// process is a gloable var
// argv[0] is the absolute path of the executing program,which is c:\Program Files\nodejs\node.exe
// argv[1] is the absolute path of the main module,which is e:\laboratory\git\learn_for_git\code_pieces\copyfile.js
console.log(process);
console.log(process.argv[0]);
console.log(process.argv[1]);

main(process.argv.slice(2));

