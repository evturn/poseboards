var app = app || {};

app.Form = Backbone.View.extend({
	el: '.container-login',
	events: {
		'click .btn-login' 		: 'login',
		'click .btn-register' : 'register'
	},
	login: function(e) {
		e.preventDefault();	
		var email = $('#login-email').val();
		var password = $('#login-password').val();

		app.Ref.authWithPassword({
		  email    : email,
		  password : password
		}, function(error, authData) {
			  if (error) {
			    console.log("form.js says: Login Failed!", error);
			  } else {
			    console.log("form.js says: Authenticated successfully with payload:", authData);
			    window.location = '/';
			  }
		});

	},
	register: function(e) {
		e.preventDefault();	
		var email = $('#register-email').val();
		var password = $('#register-password').val();
		var username = $('#register-username').val();
		ref.createUser({
		  email: email,
		  password: password
		}, function(error, userData) {
			$('.register-error').css({color: 'red'});
			$('.register-error').css({fontWeight: 'bold'});
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("form.js says: The new user account cannot be created because the email is already in use.");
		        $('.register-error').text("The new user account cannot be created because the email is already in use.")
		        break;
		      case "INVALID_EMAIL":
		        console.log("form.js says: The specified email is not a valid email.");
		        $('.register-error').text("The specified email is not a valid email.")
		        break;
		      default:
		        console.log("form.js says: Error creating user:", error);
		        $('.register-error').text("Error creating user")
		    }
		  } else {
		    console.log("form.js says: Successfully created user account with uid:", userData.uid);
		    var user = refUsers.push({
		    	username: username,
		    	email: email,
		    	password: password
		    });
		    console.log(user);
		    console.log(user.key());
		    window.location = '/login';
		  }
		});
	},
});