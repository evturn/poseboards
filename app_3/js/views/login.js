var app = app || {};

app.ref = new Firebase("https://poseboards.firebaseio.com");

app.Login = Backbone.View.extend({
	el: '.container-login',
	initialize: function() {
		app.ref.onAuth(function(authData) {
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
		var email = $('#login-email').val();
		var password = $('#login-password').val();

		app.ref.authWithPassword({
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