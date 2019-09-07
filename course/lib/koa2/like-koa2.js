const http = require('http');

function compose(middlewareList) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middlewareList[i];
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
            } catch (e) {
                return Promise.reject(e);
            }
        }
        return dispatch(0);
    }
}

class LokeKoa2 {
    constructor() {
        this.middlewareList = [];
    }

    use (fn) {
        this.middlewareList.push(fn);
        return this;
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        };
        ctx.query = req.query;
        return ctx;
    }

    handleRequest(ctx, fn) {
        return fn(ctx);
    }

    callback() {
        const fn = compose(this.middlewareList);

        return (req, res) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        }
    }

    listen() {
        const server = http.createServer(this.callback());
        server.listen(...arguments);
    }
}

module.exports = LokeKoa2;