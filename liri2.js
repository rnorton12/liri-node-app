var keys = require("./keys.js");
var help = require("./help.js");
var tweet = require("./tweet.js");
var spotify = require("./spotify.js");
var omdb = require("./omdb.js");
var log = require("./log.js");
var request = require("request");
var fs = require('fs');
var command = process.argv[2]; // command to execute
var title = process.argv[3]; // movie or song title
var count = process.argv[4]; // tweet count

console.log(keys);

processCommand = function (command, title, count) {

    switch (command) {
        case "help":
            help.printHelp();
            break;
        case "my-tweets":
            tweet.printMyTweets(keys.twitterKeys, "Happy Sasquatch", count);
            break;

        case "spotify-this-song":
            spotify.printSongInfo(keys.spotifyKeys, title);
            break;

        case "movie-this":
            omdb.printMovieInfo(title);
            break;

        case "do-what-it-says":
            // node liri.js do-what-it-says`
            // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
            // It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
            fs.readFile("random.txt", function (err, data) {
                if (err) throw err;
                console.log(data);
                var arguments = data.split(",").trim();
                processCommand(arguments[0], arguments[1], 0);
            });
            break;
    }
}

processCommand(command, title, count);
