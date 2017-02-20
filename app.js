var Twitter = require('twitter');
var http = require('http');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

//establish parameters for our request
var params = {
  screen_name: 'dril',  //twitter handle
  count: 200              //number of tweets to return
};


//function to call the user timeline API using our parameters.
//instead of returning the result, we give it to a callback function.
//the callback function will in this case write the tweet to the HTTP response.
function getTweet(callback){
  console.log("getting tweet");
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var random = Math.floor(Math.random() * params.count);
      var selectedTweet = tweets[random].id_str;

      /*
       *Execute the callback function using the ID from the randomly selected tweet.
       *In this case, an anonymous function will be passed that will call a separate
       *Twitter API (Oembed) with the randomly chosen tweet ID.
       */
      callback(selectedTweet);

    } else {
      console.log("error:\n");
      console.log(error);
      callback(error);
    }
  });
}

//create web server.  Upon valid request, call the getTweet function.
var server = http.createServer(function(request, response) {
    response.setHeader('Content-Type', 'application/javascript');

    //see https://gist.github.com/balupton/3696140
    response.setHeader('Access-Control-Allow-Origin', 'http://drilquotes.s3-website.us-east-2.amazonaws.com/');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');

    if ( request.method === 'OPTIONS' ) {
      response.writeHead(200);
      response.end();
      return;
    }

    /* pass an anonymous function as callback to getTweet.  in this callback, we write
     * the tweet data to the http response once the function has finished.  getTweet
     * will retrieve a random tweet id, which is passed to the anonymous function below.
     * The anonymous function then calls the oembed API using the parameters contained in
     * oembed_params and returns embeddable HTML.
     */
    getTweet(function(tweet){
      //variable data will be tweet id
      var oembed_params = {
        id: tweet,
        url: "https://twitter.com/dril/status/" + tweet
      }

      var finalTweet = "";

      client.get('https://publish.twitter.com/oembed', oembed_params, function(error, tweets) {
        if (!error) {
          finalTweet += tweets.html;

        } else {
          console.log("error:\n");
          console.log(error);
        }
        response.write(finalTweet);
        response.end();
      });



    });

});

server.listen(8080);
