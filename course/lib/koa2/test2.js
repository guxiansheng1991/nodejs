const Koa = require('./like-koa2');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log('第一个请求开始');
    await next();
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
    console.log('第一个请求结束');
});

// x-response-time

app.use(async (ctx, next) => {
    console.log('第二次请求开始');
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx['X-Response-Time'] = `${ms}ms`;
    console.log('第二次请求结束');
});

// response

app.use(async ctx => {
    console.log('第三次请求开始');
    ctx.res.end('Hello World');
    console.log('第三次请求结束');
});

app.listen(8000);