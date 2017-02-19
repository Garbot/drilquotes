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
  count: 5              //number of tweets to return
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
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');

    if ( request.method === 'OPTIONS' ) {
      response.writeHead(200);
      response.end();
      return;
    }

    //pass an anonymous function as callback to getTweet.  in this callback, we write
    //the tweet data to the http response once the function has finished.
    getTweet(function(data){
      response.write(data);
      response.end();
    });

});

server.listen(8080);
