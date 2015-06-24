var express = require('express');
var port = process.env.PORT || 3000;
var app = express();



app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);


console.log('webmoive started!!!');


app.get('/index',function(req,res){
	res.render('index',{
		title: 'web moive'
	})
})

app.get('/detail',function(req,res){
	res.render('detail',{
		title: 'web detail'
	})
})

app.get('/admin',function(req,res){
	res.render('admin',{
		title: 'web admin'
	})
})

app.get('/list',function(req,res){
	res.render('list',{
		title: 'web list'
	})
})