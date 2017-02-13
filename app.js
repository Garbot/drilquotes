var Twitter = require('twitter');
var keyinfo = require('./keyinfo.js');    //store API info here in order to keep private.

var client = new Twitter({
  consumer_key: keyinfo.TWITTER_CONSUMER_KEY,
  consumer_secret: keyinfo.TWITTER_CONSUMER_SECRET,
  access_token_key: keyinfo.ACCESS_TOKEN_KEY,
  access_token_secret: keyinfo.ACCESS_TOKEN_SECRET,
  bearer_token: keyinfo.TWITTER_BEARER_TOKEN
});

var params = {screen_name: 'dril'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
