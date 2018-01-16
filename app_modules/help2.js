var log = require("./app_modules/log.js");
var text = ""; // text to log or display
exports.printHelp = function () {

    text = "node liri.js my-tweets" + "\n";
    text += "show your last 20 tweets and when they were created at in your terminal/bash window." + "\n";
    text += "===============" + "\n";
    text += "node liri.js spotify-this-song '<song name here>'" + "\n";
    text += "This will show the following information about the song in your terminal/bash window:" + "\n";
    text += "- Artist(s)\n" + "- The song's name" + "\n";
    text += "- A preview link of the song from Spotify" + "\n";
    text += "If no song is provided then it will default to 'The Sign' by Ace of Base." + "\n";
    text += "===============" + "\n";
    text += "node liri.js movie-this '<movie name here>'" + "\n";
    text += console.log("This will output the following information to your terminal/bash window:" + "\n";
    text += console.log("- Title of the movie\n" + "- Year the movie was released" + "\n";
    text += "- IMDB Rating of the movie\n" + "- Rotten Tomatoes Rating of the movie" + "\n";
    text += "- Country where the movie was produced\n" + "- Language of the movie" + "\n";
    text += "- Plot of the movie\n" + "- Actors in the movie" + "\n";
    text += "===============" + "\n";
    text += "node liri.js do-what-it-says" + "\n";
    text += "Runs `spotify-this-song` for the text in `random.txt`.";
    console.log(text);
    log.logData(text);
}
