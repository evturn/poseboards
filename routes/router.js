var express = require('express'),
    app = express();
var Firebase = require('firebase');
var bodyParser          = require('body-parser');
var urlencodedParser    = bodyParser.urlencoded({extended: false});
var Auth  = require('../controllers/authentication.js');
var router = express.Router();

/*
 User Routes
 */

router.get('/', function(req, res){
    res.render('users/authentication');
});

/*
 Data Generated
 */
router.get('/profile', function(req, res){
   res.render('users/profile');
});

router.get('/gen', function(req, res){
    res.render('animations/show');
});

router.get('/browse', function(req, res){
    res.render('animations/browse');
});

 router.get('/upload', function(req, res){
     var authState = Auth.authenticate();
     if (authState) {
         res.render('users/upload');
     } else {
         res.redirect('/');
     }
 });

router.post('/api/users', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400)
    var request = req.body; // to be the params from search filed
    var token = request.token;
    console.log(token);
    Auth.authenticate(token);
});

module.exports = router;