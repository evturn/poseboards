var app = app || {};

// firebase
var ref 		 = new Firebase("https://poseboards.firebaseio.com");
var refUsers = new Firebase("https://poseboards.firebaseio.com/users");

// backbone
auth = new app.Auth();

var router = new app.Router();
Backbone.history.start();


var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


addImage();


	function addImage() {
		var authData = ref.getAuth();
		var uid = authData.uid;
		var location = new Firebase("https://poseboards.firebaseio.com/users/" + uid + '/animations');
		var string = 'Dudeman Jones';
		var encodedString = Base64.encode(string);
		console.log(encodedString);
		location.push({
			fps: 26,
			height: '100px',
			widht: '400px',
			name: 'Pig Walk',
			image: encodedString
		});
		var decodedString = Base64.decode(encodedString);
		console.log(decodedString);

	}




ref.onAuth(function(authData) {
  if (authData) {
    console.log("Client authenticated: ", authData.uid);
	  currentUser(authData.uid);
	  authenticateServer(authData.token);
		$('.btn-nav-logout').text('Logout');
		$('.btn-nav-profile').show();
		$('.btn-nav-register').text('');
		$('.btn-nav-login').text('');
  } else {
    console.log("Client unauthenticated");
    unauthenticateServer();
	  $('.btn-nav-logout').text('');
	  $('.btn-nav-profile').hide();
  	$('.btn-nav-login').text('Login');
		$('.btn-nav-register').text('Register');
  }
});

function unauthenticateServer() {
  $.ajax({
		url: '/api/users/auth',
		type: 'POST',
		dataType: 'json',
		data: {
			token: null,
			auth: false
		},
		success: function(data){
			console.log('Server unauthenticated ', data);
		}
	});
}

function authenticateServer(token) {
  $.ajax({
		url: '/api/users/auth',
		type: 'POST',
		dataType: 'json',
		data: {
			token: token,
			auth: true
		},
		success: function(data){
			console.log('Server authenticated: ', data);
		}
	});
}

function currentUser(uid) {
	var currentUser = new Firebase("https://poseboards.firebaseio.com/users/" + uid);
	currentUser.on('value', function(dataSnapshot) {
		var user = dataSnapshot.val();
		var username = user.username;
			$('.btn-nav-profile').text(username);
			$('.user-name').html(username)
		});
}