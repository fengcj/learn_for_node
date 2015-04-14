var express = require("express");
var utility = require("utility");



var app = express();


app.get("/",function(req,res){
	var q = req.query.q;

	var md5Value = utility.md5(q);

	res.send(md5Value);
});


app.listen(6776,function(req,res){
	console.log("Listening 6776 port");
});