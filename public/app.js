var express = require('express');
var app = express();
var jade = require('jade');

app.set('views', __dirname + '/views');
app.engine('html', require('jade').renderFile);

app.set('view engine', 'jade');


app.get('/', function(req, res){
   res.render('layout.jade');
});

app.listen(3000, function(){
   console.log("Server listening on port 3000");
});