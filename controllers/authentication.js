var express = require('express'),
    app = express();
var Firebase = require('firebase');


var ref = new Firebase("https://poseboards.firebaseio.com");

module.exports = {

  authenticate: function(token) { 
    var token = token;
    ref.authWithCustomToken(token, function(error, authData) {
      if (error) {
        console.log("Server unauthenticated", error);
        
      } else {
        console.log("Server authenticated", authData);
        return authData;
        
      }
    });
  }

};