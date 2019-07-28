const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // 设置返回格式为JSON
  res.setHeader('Content-Type', 'application/json');

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  } else {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }
});

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});