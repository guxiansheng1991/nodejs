var http = require('http');
var Teacher = require('./Teacher.js');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (req.url !== 'favicon.ico') {
        var teacher = new Teacher(1,'张三',23);
        teacher.teach(res);
        teacher.enter();
        res.end('你好啊');
    }
}).listen(8000);

console.log('server is running at http://localhost:8000');
