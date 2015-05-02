var app = app || {};

app.Router = Backbone.Router.extend({
	routes: {
		'' 				 : 'index',
		'login' 	 : 'login',
		'register' : 'register'
	},
	index: function() {
		auth.home();
	},
	login: function() {
		auth.loginForm();
	},
	register: function() {
		auth.registerForm();
	},
});