const http = require('http');

const server = http.createServer((req, res) => {
    // 假装出错,让pm2重启
    if (req.url === '/error') {
        throw new Error('假装出错,让pm2重启');
    }

    res.end('hello world 3');
});

server.listen(8004, () => {
   console.log('server is running, http://localhost:8004');
});