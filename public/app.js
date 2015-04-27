var express = require('express');
var app = express();
var ejs = require('ejs');


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');


app.get('/', function(req, res){
   res.render('layout.ejs');
});

app.listen(3000, function(){
   console.log("Server listening on port 3000");
});