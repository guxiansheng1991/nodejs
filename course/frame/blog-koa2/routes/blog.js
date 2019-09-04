const router = require('koa-router')();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

// 获取博客列表
router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';

  // 个人中心查看自己的博客
  const isadmin = ctx.query.isadmin;
  if (isadmin) {
    if (!ctx.session.username) {
      ctx.body = new ErrorModel('未登录');
      return;
    }
    author = ctx.session.username;
  }
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

// 获取博客详情
router.get('/detail', async function (ctx, next) {
  const blogDetail = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(blogDetail);
});

// 新建博客
router.post('/new', loginCheck, async function (ctx, next) {
  const author = ctx.session.username;
  ctx.request.body.author = author;
  const data = await newBlog(ctx.request.body);
  ctx.body = new SuccessModel(data);
});

// 更新博客
router.post('/update', loginCheck, async function (ctx, next) {
  const val = await updateBlog(ctx.query.id, ctx.request.body);
  if (val) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel('更新失败');
  }
});

// 删除博客
router.post('/del', loginCheck, async function (ctx, next) {
  const author = ctx.session.username;
  const val = await delBlog(ctx.query.id, author);
  if (val) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel('删除失败');
  }
});

module.exports = router;