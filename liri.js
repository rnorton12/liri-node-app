var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var client = new Twitter(keys); // twitter client
var spotify = new Spotify({
    id: "01699cc6b7ee4b208f5db0568f52fdf3",
    secret: "00dc29f4f77e41db89ca9275625432d7"
});
var command = process.argv[2]; // command to execute
var title = process.argv[3]; // movie or song title

console.log("command: " + command);
console.log("title: " + title);

switch (command) {
    case "help":
        console.log("node liri.js my-tweets");
        console.log("show your last 20 tweets and when they were created at in your terminal/bash window.");
        console.log("");
        console.log("node liri.js spotify-this-song '<song name here>'");
        console.log("This will show the following information about the song in your terminal/bash window:");
        console.log("- Artist(s)\n" + "- The song's name");
        console.log("- A preview link of the song from Spotify");
        console.log("If no song is provided then it will default to 'The Sign' by Ace of Base.");
        console.log("");
        console.log("node liri.js movie-this '<movie name here>'");
        console.log("This will output the following information to your terminal/bash window:");
        console.log("- Title of the movie\n" + "- Year the movie was released");
        console.log("- IMDB Rating of the movie\n" + "- Rotten Tomatoes Rating of the movie");
        console.log("- Country where the movie was produced\n" + "- Language of the movie");
        console.log("- Plot of the movie\n" + "- Actors in the movie");
        console.log("");
        console.log("node liri.js do-what-it-says");
        console.log("Runs `spotify-this-song` for the text in `random.txt`.");
        break;
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
                console.log(tweets);
                for (var i = 0; i < tweets.length; i++) {
                    console.log(
                        i + 1 + "::: " + tweets[i].created_at + "::: " + tweets[i].text
                    );
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
        spotify.search({
            type: 'track',
            query: title
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(data);
        });
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
        // ===========================================================
        // Run a request to the OMDB API with the movie specified
        var apiKey = "e9ca6a3f";
        var queryUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + title;
        // var queryUrl = "http://www.omdbapi.com/?apikey=" + apiKey;
        console.log(queryUrl);
        request(queryUrl,
            function (error, response, body) {
                console.log("error: " + error);
                console.log("response:" + response);
                console.log("body: " + body);
                var data = JSON.parse(body);
                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {
                    console.log("Title: " + data.Title);
                    console.log("Year: " + data.Year);
                    console.log("IMDB Rating: " + data.Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
                    console.log("Country: " + data.Country);
                    console.log("Language: " + data.Language);
                    console.log("Plot: " + data.Plot);
                    console.log("Actors: " + data.Actors);
                } else {
                    console.log("error = " + data.Error);
                }
            }
        );
        break;

    case "do-what-it-says":
        // node liri.js do-what-it-says`
        // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        break;
}