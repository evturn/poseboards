var express = require('express'),
    app = express();
var Firebase = require('firebase');

module.exports = {


ref: new Firebase("https://poseboards.firebaseio.com"),
authenticate: function() {
        var auth = this.ref.getAuth();
        if (auth) {
          console.log('You got it man!');
        } else {
          console.log('No, you don\'t got it!');
        }
    },
    check: function() {
        this.ref.onAuth(function (authData) {
            if (authData) {
                console.log("Authenticated with uid:", authData.uid);

            } else {
                console.log("Client unauthenticated.");

            }
        });
    }
};

