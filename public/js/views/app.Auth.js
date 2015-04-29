var app = app || {};

app.Auth = Backbone.View.extend({
	el: '.app-container',
	loginTemplate: _.template($('#form-login-template').html()),
	registerTemplate: _.template($('#form-register-template').html()),
	initialize: function() {
		checkAuth();
		this.registerForm();
	},
	events: {
		'click .btn-register' 	: 'register',
		'click .btn-login'			: 'login',
		'click .btn-nav-logout'	: 'logout'
	},
	registerForm: function() {
		$('.container-form').html(this.registerTemplate());
		return this;
	},
	loginForm: function() {
		$('.container-form').html(this.loginTemplate());
		return this;
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
		    var ref = new Firebase("https://poseboards.firebaseio.com/users/" + userData.uid);
		    var user = ref.push({
		    	username: username,
		    	email: email,
		    	password: password
		    });
		    console.log(user.key());
		    this.loginForm();
		  }
		}.bind(this))
	},
	login: function(e) {
		e.preventDefault();	
		var email 	 = $('#login-email').val();
		var password = $('#login-password').val();

		var user = ref.authWithPassword({
		  email    : email,
		  password : password
		}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			    $('.register-error').text("Incorrect email or password");
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			 		console.log(authData.uid);
			 		console.log(authData.token);
			   this.findUser(authData.uid);
			  }
		}.bind(this));
	},
	findUser: function(id) {
		console.log(id);
		var ref = new Firebase("https://poseboards.firebaseio.com/users");
		ref.on('value', function(dataSnapshot) {
			var currentUser = dataSnapshot.val();
		});
		window.location = '/profile';
	},
	logout: function() {
		ref.unauth();
		window.location = '/';
	},
});