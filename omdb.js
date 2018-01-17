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
var log = require("./log.js");

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
            //console.log(data);
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                if (data.Error !== undefined) {
                    text = "error = " + data.Error;
                } else {
                    // found some movie titles may not have all the information listed
                    // below.  So I added additional error handling for this with the
                    // try, catch and finally.
                    var result = ""; // result of the attribute

                    // movie title
                    try {
                        result = data.Title;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Title: " + result + "\n";
                    }

                    // movie release year
                    try {
                        result = data.Year;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Year: " + result + "\n";
                    }

                    // movie IMDB rating
                    try {
                        result = data.Ratings[0].Value;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "IMDB Rating: " + result + "\n";
                    }

                    // movie rotten tomatoes rating
                    try {
                        result = data.Ratings[1].Value;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Rotten Tomatoes Rating: " + result + "\n";
                    }

                    // movie country orgin
                    try {
                        result = data.Country;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Country: " + result + "\n";
                    }

                    // movie language
                    try {
                        result = data.Language;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Language: " + result + "\n";
                    }

                    // movie plot
                    try {
                        result = data.Plot;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Plot: " + result + "\n";
                    }

                    // movie actors
                    try {
                        result = data.Actors;
                    } catch (err) {
                        result = err;
                    } finally {
                        text += "Actors: " + result + "\n";
                    }
                }
            } else {
                text = "error = " + data.Error;
            }
            console.log(text);
            log.logData(text);
        }
    );
}