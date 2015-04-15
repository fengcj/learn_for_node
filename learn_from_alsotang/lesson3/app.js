var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");


var app = express();


app.get("/",function(req,res,next){
	// using cnodejs get an error about "connect ECONNREFUSED", so I change the origin program
	superagent.get("https://www.google.com/")  // https://cnodejs.org/
	.end(function(err,sres){
		if (err){
			return next(err);
		}
			// console.log(sres.text);
			var $ = cheerio.load(sres.text);
			var items = [];
			$("#xjsi").each(function(idx,element){
				var $element = $(element);
				items.push({
					title : $element.attr("title"),
					href : $element.attr("href"),
					"data-jiis" : $element.attr("data-jiis")
				});
			});

			res.send(items);
		});
});



app.listen(6776,function(req,res){
	console.log("Listening port 6776");
});