
exports.logData = function (data) {
    fs.appendFile('log.txt', data, 'utf8', function (err) {
        if (err)
            return console.log(err);
        console.log('Wrote Hello World in file helloworld.txt, just check it');
    });
}
