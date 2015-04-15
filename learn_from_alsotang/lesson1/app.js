var express = require("express");


var app = express();
// visit http://localhost:6776/
app.get("/",function(req,res){
	res.send("Using Express~");
})

app.listen(6776,function(){
	console.log("listening port 6776");
});