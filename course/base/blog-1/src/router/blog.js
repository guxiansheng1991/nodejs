const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 统一登录验证
  const loginCheck = (req) => {
    if (!req.session.username) {
      return Promise.resolve(new ErrorModel('未登陆'));
    }
  };

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // let listData = getList(author, keyword);
    // return new SuccessModel(listData);
    // 个人中心查看自己的博客
    const isadmin = req.query.isadmin;
    if (isadmin) {
      const loginCheckResult = loginCheck(req);
      if (loginCheckResult) {
        return loginCheckResult;
      }
      author = req.session.username;
    }
    let result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // let detailData = getDetail(id);
    // return new SuccessModel(detailData);
    let result = getDetail(id);
    return result.then(blogDetail => {
      return new SuccessModel(blogDetail);
    });
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    const author = req.session.username;
    req.body.author = author;
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    const result = updateBlog(id, req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新失败');
      }
    });
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    const author = req.session.username;
    const result = delBlog(id, author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('删除失败');
      }
    })
  }
}

module.exports = handleBlogRouter;