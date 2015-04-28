var express = require('express');
var app = express();
var jade = require('jade');


app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', function(req, res){
   res.render("pages/index");
});

app.use('/public', express.static('public'));

app.listen(3000, function(){
   console.log("SERVER");
})