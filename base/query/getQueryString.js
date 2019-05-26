var url = require('url');
var fileOperation = require('../file/fileOperation');
var querystring = require('querystring');

module.exports = {
    // 获取get请求的参数
    getMethodQuery(req, res, cb) {
        var queryString = url.parse(req.url, true).query;
        console.log(queryString);
        fileOperation.readFile('./query/index.html', function(data) {
            res.end(data);
        });
    },

    // 获取post方法的请求参数
    getPostMethodQuery(req, res, cb) {
        var data = '';
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            console.log(data);
            data = querystring.parse(data);
            fileOperation.readFile('./query/index.html', function(filedata) {
                res.write(filedata);
                res.write('接受的数据是:' + data.username);
                res.end();
            });
        });
    }
};