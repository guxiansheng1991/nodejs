const express = require('./like-express');

const app = express();

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next();
});

app.use((req, res, next) => {
    // 在处理cookie
    console.log('处理cookie...');
    req.cookie = {
        userId: '123'
    };
    next();
});

app.use('/api', (req, res, next) => {
   console.log('处理api路由...');
   next();
});

app.get('/api', (req, res, next) =>{
    console.log('get处理api路由...');
    next();
});

// 登录验证
function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('登录成功...');
        next();
    }, 0);
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie');
    res.json({
        errno: 0,
        data: req.cookie
    });
});

app.listen(9000, () => {
    console.log('server is listening on port 9000');
});