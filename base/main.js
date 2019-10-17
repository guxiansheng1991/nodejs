var http = require('http');
var url = require('url');
var fileOperation = require('./file/fileOperation');
var getQueryString = require('./query/getQueryString');
var dbOperation = require('./mysql/model-user');


http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (req.url !== '/favicon.ico') {
        var pathname = url.parse(req.url).pathname;
        var methodName = pathname.replace(/\//g, '');
        // 运行相应文件中的方法
        switch(methodName) {
            case '':
                fileOperation.readFile('./index.html', function(data) {
                    res.write(data);
                    res.end();
                });
                break;
            case 'readFile':
                fileOperation.readFile('./file/index.html', function(data) {
                    res.write(data);
                    res.end();
                });
                break;
            case 'readImg':
                fileOperation.readImg('./imgs/刘亦菲2.jpg', function(data) {
                    res.writeHead(200, {'Content-Type': 'image/jpeg'});
                    res.write(data, 'binary');
                    res.end();
                });
                break;
            case 'getMethodQuery':
                getQueryString.getMethodQuery(req, res);
                break;
            case 'getPostMethodQuery':
                getQueryString.getPostMethodQuery(req, res);
                break;
            case 'register':
                fileOperation.readFile('./mysql/form.html', function(data) {
                    res.write(data);
                    res.end();
                });
                break;
            case 'registerAction':
                dbOperation.add(req, res);
                break;
            case 'userList':
                dbOperation.userList(req, res);
                break;
            default:
                res.write('访问路径不存在');
                res.end();
        }
    }
    
}).listen(3000);

console.log('server is running at http://localhost:3000');
