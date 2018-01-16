// node liri.js my-tweets`
// This will show your last 20 tweets and when they were created at in your terminal/bash window.

var Twitter = require("twitter");
var log = require("./app_modules/log.js");

var text = ""; // text to log or display

exports.printMyTweets = function (keys, screen_name, count) {
    var client = new Twitter(keys); // twitter client

    if (count === undefined) {
        count = 20;
    }
    var params = {
        screen_name: screen_name,
        count: count
    };
    client.get("statuses/user_timeline", params, function (
        error,
        tweets,
        response
    ) {

        if (!error) {
            //console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                text = "";
                text += i + 1 + "==>" + tweets[i].created_at + "==>" + tweets[i].text;
                console.log(text);
                log.logData(text);
            }
        } else {
            console.log(error);
            log.logData(error);
            throw error;
        }
    });
}
