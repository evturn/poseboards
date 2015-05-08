var express = require('express'),
    app = express();
var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("poseieboardies");


var ref = new Firebase("https://poseboards.firebaseio.com");

module.exports = {

  authenticate: function(token) { 
    var token = token;
    ref.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        return true;
      } else {
        console.log("Login Succeeded!", authData);
        return false;
      }
    });
  }

};