var request = require('request');
var keyinfo = require('./keyinfo.js');
var consumer_key = keyinfo.TWITTER_CONSUMER_KEY
var consumer_secret = keyinfo.TWITTER_CONSUMER_SECRET

console.log(consumer_key + "\n" + consumer_secret);
var enc_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

var oauthOptions = {
  url: 'https://api.twitter.com/oauth2/token',
  headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  body: 'grant_type=client_credentials'
};

request.post(oauthOptions, function(e, r, body) {
  console.log(body)
});
