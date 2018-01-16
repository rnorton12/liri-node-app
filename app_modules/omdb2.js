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
var log = require("./app_modules/log.js");

exports.printMovieInfo = function (movie) {
    var defaultMovie = "Mr. Nobody";
    if (movie === undefined) {
        movie = defaultMovie;
    }
    var text = ""; // text to log or display

    // Run a request to the OMDB API with the movie specified
    var apiKey = "e9ca6a3f";
    var queryUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie;
    
    request(queryUrl,
        function (error, response, body) {
            var data = JSON.parse(body);
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                if (data.Error !== undefined) {
                    text = "error = " + data.Error;
                } else {
                    text = "Title: " + data.Title + "\n";
                    text += "Year: " + data.Year + "\n";
                    text += "IMDB Rating: " + data.Ratings[0].Value + "\n";
                    text += "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n";
                    text += "Country: " + data.Country + "\n";
                    text += "Language: " + data.Language + "\n";
                    text += "Plot: " + data.Plot + "\n";
                    text += "Actors: " + data.Actors;
                }
            } else {
                text = "error = " + data.Error;
            }
            console.log(text);
            log.dataLog(text);
        }
    );
}
