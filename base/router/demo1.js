var http = require('http');
var url = require('url');
var route1 = require('./route1');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (req.url !== '/favicon.ico') {
        console.log(route1);
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace(/\//g, '');
        route1[pathname](req, res);
        res.end('哈哈哈');
    }
}).listen(8000);

console.log('server is running at http://localhost:8000');