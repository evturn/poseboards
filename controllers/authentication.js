var express = require('express'),
    app = express();
var Firebase = require('firebase');


var ref = new Firebase("https://poseboards.firebaseio.com");

module.exports = {

  authenticate: function(token) { 
    var token = token;
    ref.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        
      } else {
        console.log("Login Succeeded!", authData);
        
      }
    });
  }

};