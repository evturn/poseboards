var express = require('express'),
    app = express();
var router = express.Router();

router.get('/', function(req, res){
    res.render('pages/index');
});

router.get('/login', function(req, res){
    res.render('pages/login');
});

router.get('/register', function(req, res){
    res.render('pages/register');
});

module.exports = router;