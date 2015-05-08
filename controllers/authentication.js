var express = require('express'),
    app = express();
var Firebase = require('firebase');

module.exports = {


    ref: new Firebase("https://poseboards.firebaseio.com"),
    authenticate: function() {
        this.ref.onAuth(function (authData) {
            if (authData) {
                console.log("Authenticated with uid:", authData.uid);
                return true;
            } else {
                console.log("Client unauthenticated.");
                return false;
            }
        });
    }
};

