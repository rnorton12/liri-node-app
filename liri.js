var keys = require("./keys.js");
var help = require("./help.js");
var tweet = require("./tweet.js");
var spotify = require("./spotify.js");
var omdb = require("./omdb.js");
var log = require("./log.js");
var request = require("request");
var fs = require('fs');

var command = process.argv[2]; // command to execute
var parameter = process.argv[3]; // tweet count, movie or song title

processCommand = function (command, parameter) {
    console.log("command: " + command);
    console.log("parameter: " + parameter);

    switch (command) {
        case "help":
            help.printHelp();
            break;
        case "my-tweets":
            tweet.printMyTweets(keys.twitterKeys, keys.twitterScreenName, parameter);
            break;

        case "spotify-this-song":
            spotify.printSongInfo(keys.spotifyKeys, parameter);
            break;

        case "movie-this":
            omdb.printMovieInfo(parameter);
            break;

        case "do-what-it-says":
            // node liri.js do-what-it-says`
            // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
            // It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
            fs.readFile("./random.txt", "utf8", function (err, data) {
                if (err) {
                    console.log(err);
                    log.logData(err);
                    throw err;
                }

                var arguments = data.split(",");
                for (var i = 0; i < arguments.length; i++) {
                    // just to remain consistent
                    process.argv[i + 2] = arguments[i];
                }
                log.logData(arguments);
                processCommand(arguments[0].trim(), arguments[1].trim(), 0);
            });
            break;
        default:
            text = "Not a valid command!";
            console.log(text);
            log.logData(text);
    }
}
log.logData(process.argv);
processCommand(command, parameter);