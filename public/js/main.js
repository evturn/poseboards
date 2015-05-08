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
    console.log("Client authenticated: ", authData.uid);
	  currentUser(authData.uid);
	  authenticateServer(authData.token);
		$('.btn-nav-logout').text('Logout');
		$('.btn-nav-profile').show();
		$('.btn-nav-register').text('');
		$('.btn-nav-login').text('');
  } else {
    console.log("Client unauthenticated");
    unauthenticateServer();
	  $('.btn-nav-logout').text('');
	  $('.btn-nav-profile').hide();
  	$('.btn-nav-login').text('Login');
		$('.btn-nav-register').text('Register');
  }
});


	function unauthenticateServer() {
    $.ajax({
			url: '/api/users/auth',
			type: 'POST',
			dataType: 'json',
			data: {
				token: null,
				auth: false
			},
			success: function(data){
				console.log('Server unauthenticated ', data);
			}
		});
	}

	function authenticateServer(token) {
    $.ajax({
			url: '/api/users/auth',
			type: 'POST',
			dataType: 'json',
			data: {
				token: token,
				auth: true
			},
			success: function(data){
				console.log('Server authenticated: ', data);
			}
		});
	}


function currentUser(uid) {
	var currentUser = new Firebase("https://poseboards.firebaseio.com/users/" + uid);
	currentUser.on('value', function(dataSnapshot) {
		var user = dataSnapshot.val();
		var username = user.username;
			$('.btn-nav-profile').text(username);
			$('.user-name').html(username)
		});
}