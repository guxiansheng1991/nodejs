const router = require('koa-router')();
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/api/user');

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const user = await login(username, password);
  if (user.username) {
    ctx.session.username = user.username;
    ctx.session.realname = user.realname;
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel('登陆失败');
  }
});

router.get('/session-test', async (ctx, next) => {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  };
});

module.exports = router;