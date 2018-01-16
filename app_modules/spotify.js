//  node liri.js spotify-this-song '<song name here>'`
//  This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//  If no song is provided then your program will default to "The Sign" by Ace of Base.
// ========================================================
var SpotifyWebApi = require("spotify-web-api-node");

exports.printSongInfo = function (keys, song) {
    var defaultTrack = "The Sign";
    var defaultArtist = "Ace of Base";
    
    // Set necessary parts of the credentials on the constructor
    var spotifyApi = new SpotifyWebApi({
        clientId: keys.client_id,
        clientSecret: keys.client_secret
    });

    // Get an access token and 'save' it using a setter
    spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        //console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);

        // Do search using the access token
        if (song === undefined) {
            query = "track:" + defaultTrack + " artist:" + defaultArtist;
        } else {
            query = "track:" + song;
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
                console.log('Something went wrong1!', err);
            });
    }, function (err) {
        console.log('Something went wrong2!', err);
    });
}
