var app = app || {};

// firebase
app.Ref 		 = new Firebase("https://poseboards.firebaseio.com");
app.refUsers = app.Ref + '/users';

// backbone
app.users = new app.Users();
new app.App({collection: app.users});
new app.Form();


// function authDataCallback(authData) {
//   if (authData) {
//     console.log("main.js says: User " + authData.uid + " is logged in with " + authData.provider);
//   } else {
//     console.log("main.js says: User is logged out");
//   }
// }

// app.Ref.onAuth(authDataCallback);