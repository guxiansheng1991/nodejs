var fs = require('fs');
module.exports = {
    writeFile: function(path, data, cb) {
        fs.writeFile(path, data, function(err) {
            if(err) {
                throw err;
            }
            cb();
        });
    },
    readFile: function(path,cb) {
        fs.readFile(path, function(err, data) {
            if(err)
                throw err;
            cb(data);
        });
    },
    readImg (path,cb) {
        fs.readFile(path, 'binary', function(err, data) {
            if(err)
                throw err;
            cb(data);
        });
    }
};