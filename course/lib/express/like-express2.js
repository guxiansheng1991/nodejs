const http = require('http');
const slice = Array.prototype.slice;

/***
 * express中间件原理:
 * 对server不断增强的过程
 * 实现: 不断注册中间件到server实例上,
 */

class LikeExpress {
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: []
    };
  }

  register(path) {
    const info = {};
    if(typeof path === 'string') {
      info.path = path;
      info.stack = slice.call(arguments, 1);
    } else {
      info.path = '/';
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  use() {
    const info = this.register(...arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register(...arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register(...arguments);
    this.routes.post.push(info);
  }

  match(url, method) {
    let currentRoutes = [];
    let stack = [];
    currentRoutes = currentRoutes.concat(this.routes.all);
    currentRoutes = currentRoutes.concat(this.routes[method]);
    currentRoutes.forEach(ele => {
      if (url.indexOf(ele.path) === 0) {
        stack = stack.concat(ele.stack);
      }
    });
    return stack;
  }

  handle(req, res, resultList) {
    const next = () => {
      const middleware = resultList.shift();
      if (middleware) {
        middleware(req, res, next);
      }
    };
    next();
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.end(
          JSON.stringify(data)
        );
      };

      const url = req.url;
      const method = req.method.toLowerCase();
      // 匹配path命中的函数
      const resultList = this.match(url, method);
      // 执行命中的所有函数
      this.handle(req, res, resultList);
    }
  }

  listen() {
    const server = http.createServer(this.callback());
    server.listen(...arguments);
  }
}

module.exports = () => {
  return new LikeExpress();
};