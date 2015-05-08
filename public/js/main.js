var app = app || {};

// firebase
var ref 		 = new Firebase("https://poseboards.firebaseio.com");
var refUsers = new Firebase("https://poseboards.firebaseio.com/users");

// backbone
auth = new app.Auth();

var router = new app.Router();
Backbone.history.start();


ref.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with uid:", authData.uid);
	  var username = checkValue(authData.uid);
    $('.btn-nav-logout').text('Logout');
    $('.btn-nav-profile').show();
    $('.btn-nav-register').text('');
    $('.btn-nav-login').text('');
  } else {
    console.log("Client unauthenticated.");
	  $('.btn-nav-logout').text('');
	  $('.btn-nav-profile').hide();
  	$('.btn-nav-login').text('Login');
		$('.btn-nav-register').text('Register');
  }
});

function checkValue(uid) {
	var currentUser = new Firebase("https://poseboards.firebaseio.com/users/" + uid);
	currentUser.on('value', function(dataSnapshot) {
		var user = dataSnapshot.val();
		for (var prop in user) {
  		var key = prop;
  	}
  	console.log(key);
	  var generatedUser = new Firebase("https://poseboards.firebaseio.com/users/" + uid + '/' + key + '/');
	  generatedUser.on('value', function(dataSnapshot) {
			var user = dataSnapshot.val();
			$('.btn-nav-profile').html(user.username);
		});
	});
}