var fs = require('fs');
exports.logData = function (data) {
    var textToLog = "";
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            textToLog += data[i] + " ";
        }
    }
    fs.appendFile('./app_outputs/log.txt', textToLog, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });
}
