var app = app || {};

app.Login = Backbone.View.extend({
	el: '.container-login',
	initialize: function() {
		var ref = new Firebase("https://poseboards.firebaseio.com");
		ref.onAuth(function(authData) {
		  if (authData) {
		    console.log("Authenticated with uid:", authData.uid);
		  } else {
		    console.log("Client unauthenticated.")
		  }
		});
	},
	events: {
		'click .btn-login' : 'login'
	},
	login: function(e) {
		e.preventDefault();
		var ref = new Firebase("https://poseboards.firebaseio.com");
		var email = $('#login-email').val();
		var password = $('#login-password').val();

		ref.authWithPassword({
		  email    : email,
		  password : password
		}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			  }
		});

	},
});

new app.Login();