// var keys = require("./keys.js");
// var Twitter = require("twitter");
var Twitter = require("twitter");

var client = new Twitter({
    consumer_key: "0hVgqeInZlxcRklJGXxDSdcN2",
    consumer_secret: "4v0Ky3zNZLxDQw4klMUdPPtpYkWOsu3SdkK7IbRWBfzK0Jtdx1",
    access_token_key: "951265362405806081-IPxtyh4VByZgzFQXC2ls5YBPtWGgv8c",
    access_token_secret: "83A2bJtlqqKRq327adSewroIUYVHTE7WQvdGUYahjk4ZJ"
});
var command = process.argv[2];
console.log(command);

switch (command) {
    case "my-tweets":
        // node liri.js my-tweets`
        // This will show your last 20 tweets and when they were created at in your terminal/bash window.
        var params = {
            screen_name: "Happy Sasquatch",
            count: 20
        };
        client.get("statuses/user_timeline", params, function (
            error,
            tweets,
            response
        ) {
            if (!error) {
                //console.log(tweets);
                for (var i = 0; i < tweets.length; i++) {
                    console.log(i + 1 + "::: " + tweets[i].created_at + "::: " + tweets[i].text);
                }
            } else {
                throw error;
            }
        });
        break;

    case "spotify-this-song":
        //  node liri.js spotify-this-song '<song name here>'`
        //  This will show the following information about the song in your terminal/bash window
        //      * Artist(s)
        //      * The song's name
        //      * A preview link of the song from Spotify
        //      * The album that the song is from
        //  If no song is provided then your program will default to "The Sign" by Ace of Base.
        break;

    case "movie-this":
        // node liri.js movie-this '<movie name here>'`
        // This will output the following information to your terminal/bash window:
        //    * Title of the movie.
        //    * Year the movie came out.
        //    * IMDB Rating of the movie.
        //    * Rotten Tomatoes Rating of the movie.
        //    * Country where the movie was produced.
        //    * Language of the movie.
        //    * Plot of the movie.
        //    * Actors in the movie.

        // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        break;

    case "do-what-it-says":
        // node liri.js do-what-it-says`
        // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        break;
}