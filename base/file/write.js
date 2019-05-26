var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    // 异步写文件操作
    fs.writeFile('./text.txt', '我hhh是个江湖中人', function(err) {
        if(err) {
            throw err;
        }
        res.write('文件写入了:'+ '我hhh是个江湖中人');
        res.end();
    });
    // 同步写文件
    // fs.writeFileSync('./text.txt', '哈哈哈哈');
    // res.end();
}).listen(3000);

console.log('server is running at http://localhost:3000');