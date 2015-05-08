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
    console.log("authData", authData);
	  checkValue(authData.uid);
	  serverToken(authData.token);
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

	function serverToken(token) {
		console.log('TOKEN: ', token);
    $.ajax({
			url: '/api/users',
			type: 'POST',
			dataType: 'json',
			data: {
				token: token
			},
			success: function(data){
				if (data.token === authData.token) {
				}
			}
		});
	}


function checkValue(uid) {
	var currentUser = new Firebase("https://poseboards.firebaseio.com/users/" + uid);
	currentUser.on('value', function(dataSnapshot) {
		var user = dataSnapshot.val();
		var username = user.username;
			$('.btn-nav-profile').text(username);
			$('.user-name').html(username)
		});
}