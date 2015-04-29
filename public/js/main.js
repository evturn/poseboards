var app = app || {};

// firebase
var ref 		 = new Firebase("https://poseboards.firebaseio.com");
var refUsers = new Firebase("https://poseboards.firebaseio.com/users");

// backbone
var auth = new app.Auth();

ref.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with uid:", authData.uid);
  } else {
    console.log("Client unauthenticated.");
    $('.btn-nav-profile').html('Login/Register');
    $('.btn-nav-logout').hide();
    $('.btn-nav-profile').attr('href', '/profile');
  }
});


function checkAuth() {
	var authData = ref.getAuth();
		if (authData) {
		  console.log("Authenticated user with uid:", authData.uid);
		  var username = checkValue(authData.uid);
	    $('.btn-nav-logout').html('Logout');
	    $('.btn-nav-profile').attr('href', '/');
	    $('.btn-nav-logout').show();
		} else {
	    $('.btn-nav-profile').html('Login/Register');
	    $('.btn-nav-logout').hide();
	    $('.btn-nav-profile').attr('href', '/profile');
		}
}

function checkValue(uid) {
	var currentUser = new Firebase("https://poseboards.firebaseio.com/users/" + uid);
	currentUser.on('value', function(dataSnapshot) {
		var user = dataSnapshot.val();
		console.log(user);
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