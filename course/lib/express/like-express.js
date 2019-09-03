const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
    constructor() {
        // 存放中间件列表
        this.routes = {
            all: [],
            get: [],
            post: []
        };
    }

    register(path) {
        const info = {};
        if (typeof path === 'string') {
            info.path = path;
            info.stack = slice.call(arguments, 1);
        } else {
            info.path = '/';
            info.stack = slice.call(arguments, 0);
        }
        return info;
    }

    use() {
        const info = this.register.apply(this, arguments);
        this.routes.all.push(info);
    }

    get() {
        const info = this.register.apply(this, arguments);
        this.routes.get.push(info);
    }

    post() {
        const info = this.register.apply(this, arguments);
        this.routes.post.push(info);
    }

    match(method, url) {
        let stack = [];
        if (url === '/favicon.ico') {
            return stack;
        }
        let currentRoute = [];
        currentRoute = currentRoute.concat(this.routes.all);
        currentRoute = currentRoute.concat(this.routes[method]);
        currentRoute.forEach(ele => {
            if (url.indexOf(ele.path) === 0) {
                stack = stack.concat(ele.stack);
            }
        });
        return stack;
    }

    handle(req, res, stack) {
        const next = () => {
            const middleware = stack.shift();
            if (middleware) {
                middleware(req, res, next);
            }
        };
        next();
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                console.log(data);
                res.setHeader('Content-type', 'application/json');
                res.end(
                    JSON.stringify(data)
                );
            };

            const url = req.url;
            const method = req.method.toLowerCase();
            const resultList = this.match(method, url);
            this.handle(req, res, resultList);
        }
    }

    listen(...args) {
        const cb = this.callback();
        const server = http.createServer(cb);
        server.listen(...args);
    }
}

module.exports = () => {
  return new LikeExpress();
};