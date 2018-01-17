//  node liri.js spotify-this-song '<song name here>'`
//  This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//  If no song is provided then your program will default to "The Sign" by Ace of Base.
// ========================================================
var SpotifyWebApi = require("spotify-web-api-node");
var log = require("./log.js");

var text = ""; // text to log or display

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
            spotifyApi.setAccessToken(data.body['access_token']);

            // Do search using the access token
            if (song === undefined) {
                query = "track:" + defaultTrack + " artist:" + defaultArtist;
            } else {
                query = "track:" + song;
            }

            spotifyApi.searchTracks(query)
                .then(function (data) {
                    // console.log(data.body);
                    // console.log(JSON.stringify(data.body.tracks.items));
                    var trackInfo = data.body.tracks.items;
                    for (var i = 0; i < trackInfo.length; i++) {
                        text = "";
                        var result = ""; // result of the attribute 
                        // artist
                        try {
                            result = trackInfo[i].artists[0].name;
                        } catch (err) {
                            result = err;
                        } finally {
                            text += "Artist: " + result + "\n";
                        }

                        // song
                        try {
                            result = trackInfo[i].name;
                        } catch (err) {
                            result = err;
                        } finally {
                            text += "Song: " + result + "\n";
                        }

                        // Preview Url
                        try {
                            result = trackInfo[i].preview_url;
                        } catch (err) {
                            result = err;
                        } finally {
                            text += "Preview Url: " + result + "\n";
                        }

                        // album
                        try {
                            result = trackInfo[i].album.name;
                        } catch (err) {
                            result = err;
                        } finally {
                            text += "Album: " + result + "\n";
                        }
                        console.log(text);
                        log.logData(text);
                    }
                }, function (err) {
                    text = "Something went wrong1! " + err;
                    console.log(text);
                    log.logData(text);
                });
        }, function (err) {
            text = "Something went wrong2! " + err;
            console.log(text);
            log.logData(text);
        });
}