var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

//establish parameters for our request
var params = {
  screen_name: 'dril',
  count: 200
};

//call the user timeline API using our parameters
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    var random = Math.floor(Math.random() * params.count) + 1;
    var selectedTweet = tweets[random].id;
    return selectedTweet;
  } else {
    console.log("error:\n");
    console.log(error);
    return error;
  }
});
