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

  }
});


function checkAuth() {
	var authData = ref.getAuth();
		if (authData) {
		  console.log("Authenticated user with uid:", authData.uid);
		  var username = 'Tom Jones';
	    $('#user-nav').html(username);
	    $('#user-logout').html('Logout');
	    $('#user-nav').attr('href', '/');
	    $('#user-logout').show();
		} else {
	    $('#user-nav').html('Login/Register');
	    $('#user-logout').hide();
	    $('#user-nav').attr('href', '/login');
		}
}