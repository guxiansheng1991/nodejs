var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    fs.readFile('../imgs/刘亦菲.jpg', 'binary', function(err, data) {
        if(err)
            throw err;
        res.write(data, 'binary');
        res.end();
    });
}).listen(3000);

console.log('server is running at http://localhost:3000');