var express = require('express'),
    app = express();
var Firebase = require('firebase');
var router = express.Router();

/*
 User Routes
 */

router.get('/', function(req, res){
    res.render('pages/jade-templates/auth');
});

/*
 Data Generated
 */
router.get('/profile', function(req, res){
   res.render('pages/jade-templates/userProfile');
});

router.get('/gen', function(req, res){
    res.render('pages/jade-templates/generatedPage');
});

router.get('/browse', function(req, res){
    res.render('pages/jade-templates/filer');
});

router.get('/upload', function(req, res){
    res.render('pages/jade-templates/userUploader');
});

module.exports = router;