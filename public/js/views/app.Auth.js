var app = app || {};

app.Auth = Backbone.View.extend({
	el: '.app-container',
	events: {
		'click .btn-login' 		: 'login',
		'click .btn-register' : 'register'
	},
	register: function(e) {
		e.preventDefault();	
		var email = $('#register-email').val();
		var password = $('#register-password').val();
		var username = $('#register-username').val();
	},
});