var express = require("express");


var app = express();

app.get("/",function(req,res){
	res.send("Using Express~");
})

app.listen(6776,function(){
	console.log("listening port 6776");
});