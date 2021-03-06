var express = require('express'),
    app = express();
var Firebase = require('firebase');
var ref = new Firebase("https://poseboards.firebaseio.com");
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
  	// if () {
      res.render('users/upload');
    // } else {
    //   res.redirect('/');
    // }
 });

router.post('/api/users/login', urlencodedParser, function(req, res) {
		  if (!req.body) return res.sendStatus(400)
		  var request = req.body;
		  var token = request.token;
		  
		  ref.authWithCustomToken(token, function(error, authData) {
		    if (error) {
		      console.log("Login Failed!", error);
		      return false;
		    } else {
		      console.log("Login Succeeded!", authData);
					res.json(authData);
		    }
		  });
});

router.post('/api/users/auth', urlencodedParser, function(req, res) {
    var request = req.body;
    if (request.auth) {
	    var token = request.token;
		  Auth.authenticate(token);
		  console.log('Client authenticated: ', request.auth);
		  res.json(request.auth);
		} else {
			var authState = '';
			console.log('Server unauthenticated: ', authState);
			res.json(authState);
		}
});
  

module.exports = router;