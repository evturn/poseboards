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
    $('.btn-nav-logout').show();
    $('.btn-nav-profile').show();
    $('.btn-nav-register').hide();
    $('.btn-nav-login').hide();
  } else {
    console.log("Client unauthenticated.");
    $('.btn-nav-profile').hide();
    $('.btn-nav-logout').hide();
    $('.btn-nav-login').show();
    $('.btn-nav-register').show();
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