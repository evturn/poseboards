var app = app || {};

// firebase
app.Ref 		 = new Firebase("https://poseboards.firebaseio.com");
app.RefUsers = new Firebase("https://poseboards.firebaseio.com/users");

// backbone
new app.App();
new app.Form();