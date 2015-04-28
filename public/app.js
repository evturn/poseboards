var express = require('express');
var app = express();
var jade = require('jade');
var routes = require('./routes/router.js');

/*
View Engine
 */
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

/*
Routes
 */
app.use('/', routes);
app.use('/login', routes);
/*
Access public directory
 */
app.use('/public', express.static('public'));
/**
 * Log server
 */
app.listen(3000, function(){
   console.log("SERVER");
})