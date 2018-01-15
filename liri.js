var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var SpotifyWebApi = require("spotify-web-api-node");

console.log(keys);
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
        console.log(keys.twitterKeys);
        var client = new Twitter(keys.twitterKeys); // twitter client

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
        // ========================================================

        var defaultTrack = "The Sign";
        var defaultArtist = "Ace of Base";

        // Set necessary parts of the credentials on the constructor
        var spotifyApi = new SpotifyWebApi({
            clientId: keys.spotifyKeys.client_id,
            clientSecret: keys.spotifyKeys.client_secret
        });

        // Get an access token and 'save' it using a setter
        spotifyApi.clientCredentialsGrant()
            .then(function (data) {
                console.log('The access token is ' + data.body['access_token']);
                spotifyApi.setAccessToken(data.body['access_token']);

                // Do search using the access token
                if (title === undefined) {
                    query = "track:" + defaultTrack + " artist:" + "Ace of Base";
                } else {
                    query = "track:" + title;
                }
                console.log("query: " + query);
               
                spotifyApi.searchTracks(query)
                    .then(function (data) {
//                        console.log(data.body);
//                        console.log(JSON.stringify(data.body.tracks.items));
                        var trackInfo = data.body.tracks.items;
                        for (var i = 0; i < trackInfo.length; i++) {
                            console.log("Artist: " + trackInfo[i].artists[0].name);
                            console.log("Song: " + trackInfo[i].name);
                            console.log("Preview Url: " + trackInfo[i].preview_url);
                            console.log("Album: " + trackInfo[i].album.name);
                        }                      
                    }, function (err) {
                        console.log('Something went wrong!', err);
                    });
            }, function (err) {
                console.log('Something went wrong!', err);
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
        var defaultMovie = "Mr. Nobody";
        if (title === undefined) {
            title = defaultMovie;
        }

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