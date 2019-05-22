var http = require('http');
var otherfuns = require('./module/otherfuns.js');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    fun1(res);
    otherfuns.fun2(res);
    res.end('你好啊');
}).listen(8000);

console.log('server is running at http://localhost:8000');

// 本文件的函数
function fun1(res) {
    res.write('hello, func1');
}