var app = app || {};

app.Auth = Backbone.View.extend({
	el: '.app-container',
	events: {
		'click .btn-register' : 'register'
	},
	register: function(e) {
		e.preventDefault();	
		var email 	 = $('#register-email').val();
		var password = $('#register-password').val();
		var user = ref.createUser({
			email: email,
			password: password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        $('.register-error').text("The new user account cannot be created because the email is already in use.")
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        $('.register-error').text("The specified email is not a valid email.")
		        break;
		      default:
		        console.log("Error creating user:", error);
		        $('.register-error').text("Error creating user")
		    }
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    var username = $('#register-username').val();
		    var ref = new Firebase("https://poseboards.firebaseio.com/users/" + username);
		    var user = ref.push({
		    	email: email,
		    	password: password,
		    	uid: userData.uid
		    });
		    
		    console.log(user.key());
		    // window.location = '/login';
		  }
		})
	},
});