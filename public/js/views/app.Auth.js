var app = app || {};

app.Auth = Backbone.View.extend({
	el: '.app-container',
	loginTemplate: _.template($('#form-login-template').html()),
	registerTemplate: _.template($('#form-register-template').html()),
	homeTemplate: _.template($('#home-template').html()),
	events: {
		'click .btn-form-register': 'register',
		'click .btn-form-login'		: 'login',
		'click .btn-nav-login'		: 'loginForm',
		'click .btn-nav-register'	: 'registerForm',
		'click .btn-nav-logout'		: 'logout',
		'click .btn-nav-home'			: 'home'
	},
	home: function() {
		router.navigate('', {trigger: true});
		$('.authentication-container').html(this.homeTemplate());
		return this;
	},
	registerForm: function() {
		router.navigate('register', {trigger: true});
		$('.authentication-container').html(this.registerTemplate());
		return this;
	},
	loginForm: function() {
		router.navigate('login', {trigger: true});
		$('.authentication-container').html(this.loginTemplate());
		return this;
	},
	register: function(e) {
		e.preventDefault();	
		var email 	 = $('#register-email').val();
		var password = $('#register-password').val();
		var $error   = $('.register-error');
		var user = ref.createUser({
			email: email,
			password: password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        $error.text("The new user account cannot be created because the email is already in use.")
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
				  $error.text("The specified email is not a valid email.")
		        break;
		      default:
		        console.log("Error creating user:", error);
				  $error.text("Error creating user")
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
		console.log('you see me?');
		ref.unauth();
		window.location = '/';
	},
});