var fs = require('fs');
var path = require('path');

exports.logData = function (data) {
    var textToLog = "";
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            if ((i === 0) || (i === 1)) {
                console.log("data[i]: " + data[i]);
                // just want the filename without the pathname
                textToLog += path.win32.basename(data[i]) + " ";
            } else {
                textToLog += data[i] + " ";
            }
        }
    } else {
        textToLog = data;
    }
    fs.appendFile('./log.txt', textToLog + "\n", 'utf8', function (err) {
        if (err)
            return console.log(err);
    });
}