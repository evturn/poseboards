var app = app || {};

app.App = Backbone.View.extend({
	el: '.app-container',
	initialize: function() {
		app.Ref.onAuth(function(authData) {
		  if (authData) {
		    console.log("app.js says: Authenticated with uid:", authData.uid);
		    this.setClient();	
		  } else {
		    console.log("app.js says: Client unauthenticated.")
		    $('#user-nav').html('Login/Register');
		    $('#user-nav').attr('href', '/login');
		  }
		}.bind(this));
	},
	events: {
		'click #user-nav' : 'renderForm'
	},
	setClient: function() {
		var username = 'Tom Jones';
    $('#user-nav').html(username);
    $('#user-nav').attr('href', '/');
	},
	renderForm: function() {
		new app.Form();
	},
});