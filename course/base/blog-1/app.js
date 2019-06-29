const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json');

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析post data
  getPostData(req).then(postData => {
    req.body = postData;

    let blogData = handleBlogRouter(req, res);
    // 匹配blog路由
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }
  
    let userData = handleUserRouter(req, res);
    // 匹配user路由
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }
  
    // 未匹配
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  });
};

module.exports = serverHandle;