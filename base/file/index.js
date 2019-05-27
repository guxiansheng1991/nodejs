var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (req.url !== '/favicon.ico') {
        // 同步读取文件
        var data = fs.readFileSync('./test.html', 'utf-8');
        console.log(data);
        res.write(data);

        // 异步读取文件
        fs.readFile('./test.html', function(err, data) {
            console.log(data);
            res.write(data);
            res.end('哈哈哈');
        });
    }
}).listen(8000);

console.log('server is running at http://localhost:8000');