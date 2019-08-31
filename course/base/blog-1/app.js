const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { access } = require('./src/util/log');

// session 数据
const SESSION_DATA = {};

// 设置cookie过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
};

// 处理post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
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
      resolve(querystring.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  // 写入访问日志 access.log
  access(`${Date.now()} -- ${req.url} -- ${req.method} -- ${req.headers['user-agent']}`);

  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json');

  // 过期时间函数
  req.getCookieExpires = getCookieExpires;

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析cookie
  req.cookie = {};
  let cookirString = req.headers.cookie;
  if (cookirString) {
    req.cookie = querystring.parse(cookirString.split('; ').join('&'));
  }

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  // 解析post data
  getPostData(req).then(postData => {
    req.body = postData;

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${req.getCookieExpires()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
  
    let userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${req.getCookieExpires()}`);
        }
        res.end(JSON.stringify(userData));
      });
      return;
    }
  
    // 未匹配
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found');
    res.end();
  });
};

module.exports = serverHandle;