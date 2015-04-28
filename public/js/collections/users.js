var app = app || {};

app.Users = Backbone.Firebase.Collection.extend({
	model: app.User,
	url: 'https://poseboards.firebaseio.com/users'
});