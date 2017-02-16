var Twitter = require('twitter');
var keyinfo = require('./keyinfo.js');    //store API info here in order to keep private.

var client = new Twitter({
  consumer_key: keyinfo.TWITTER_CONSUMER_KEY,
  consumer_secret: keyinfo.TWITTER_CONSUMER_SECRET,
  access_token_key: keyinfo.ACCESS_TOKEN_KEY,
  access_token_secret: keyinfo.ACCESS_TOKEN_SECRET,
  bearer_token: keyinfo.TWITTER_BEARER_TOKEN
});

/*
  create a new random date starting Mon Sep 15 17:21:54 +0000 2008
  1221499314000
*/
var year = Math.floor(Math.random() * 9) + 2009;
var month = Math.floor(Math.random() * 12) + 1;
var day = Math.floor(Math.random() * 31) + 1;

dateString = year + "-" + month + "-" + day
console.log(dateString);

var params = {
  screen_name: 'dril',
  count: 1, //only pull 1 tweet max.  Minimize API traffic by randomizing first.
  since: dateString,
  until: dateString
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(response);
    console.log("\n\n");
    console.log(tweets);
  } else {
    console.log("error\n");
    console.log(error);
  }
});

var dateString = "";
