var app = app || {};

app.ref = new Firebase("https://poseboards.firebaseio.com");
app.refUsers = app.ref + '/users';
var usersCollection = new app.Users();
usersCollection.fetch();
console.log(usersCollection);

app.Form = Backbone.View.extend({
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
		'click .btn-login' : 'login',
		'click .btn-register' : 'register'
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
	register: function(e) {
		e.preventDefault();	
		console.log('User has registered!');
		var email = $('#register-email').val();
		var password = $('#register-password').val();
		
		app.ref.createUser({
		  email: email,
		  password: password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        break;
		      default:
		        console.log("Error creating user:", error);
		    }
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    usersCollection.push({
		    	email: email,
		    	password: password,
		    	refId: userData.uid
		    })
		  	
		  }
		  
		});
	},
});

new app.Form();