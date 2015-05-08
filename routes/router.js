var express = require('express'),
    app = express();
var Firebase = require('firebase');
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
    res.render('users/upload');
});

module.exports = router;