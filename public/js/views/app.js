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
		    $('#user-logout').hide();
		    $('#user-nav').attr('href', '/login');
		  }
		}.bind(this));
	},
	events: {
		'click #user-nav' 		: 'renderForm',
		'click #user-logout'	: 'logout'
	},
	setClient: function() {
		app.Ref.on("value", function(snapshot) {
  		console.log(snapshot.val());
  		var snapshot = snapshot.val();
		}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
		});
		var username = 'Tom Jones';
    $('#user-nav').html(username);
    $('#user-logout').html('Logout');
    $('#user-nav').attr('href', '/');
    $('#user-logout').show();
	},
	renderForm: function() {
		new app.Form();
	},
	logout: function() {
		app.Ref.unauth();
	},
});