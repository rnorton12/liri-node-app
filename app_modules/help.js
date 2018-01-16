exports.printHelp = function () {
    console.log("node liri.js my-tweets");
    console.log("show your last 20 tweets and when they were created at in your terminal/bash window.");
    console.log("===============");
    console.log("node liri.js spotify-this-song '<song name here>'");
    console.log("This will show the following information about the song in your terminal/bash window:");
    console.log("- Artist(s)\n" + "- The song's name");
    console.log("- A preview link of the song from Spotify");
    console.log("If no song is provided then it will default to 'The Sign' by Ace of Base.");
    console.log("===============");
    console.log("node liri.js movie-this '<movie name here>'");
    console.log("This will output the following information to your terminal/bash window:");
    console.log("- Title of the movie\n" + "- Year the movie was released");
    console.log("- IMDB Rating of the movie\n" + "- Rotten Tomatoes Rating of the movie");
    console.log("- Country where the movie was produced\n" + "- Language of the movie");
    console.log("- Plot of the movie\n" + "- Actors in the movie");
    console.log("===============");
    console.log("node liri.js do-what-it-says");
    console.log("Runs `spotify-this-song` for the text in `random.txt`.");
}
