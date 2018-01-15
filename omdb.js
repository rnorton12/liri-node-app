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
var request = require("request");

exports.printMovieInfo = function (movie) {
    var defaultMovie = "Mr. Nobody";
    if (movie === undefined) {
        movie = defaultMovie;
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
}
