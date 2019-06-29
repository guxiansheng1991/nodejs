const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('hello world');
});

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});