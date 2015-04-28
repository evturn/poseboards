var express = require('express');
var app = express();
var jade = require('jade');
var routes = require('./routes/router.js');

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

//app.get('/', function(req, res){
//   res.render("pages/index");
//});

app.use('/', routes);
app.use('/login', routes);

app.use('/public', express.static('public'));
//
app.listen(3000, function(){
   console.log("SERVER");
})