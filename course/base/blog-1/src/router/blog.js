const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // let listData = getList(author, keyword);
    // return new SuccessModel(listData);
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
      return blogDetail;
    });
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);
    const author = '张三';
    req.body.author = author;
    console.log('req.body', req.body);
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('更新失败');
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('更新失败');
    }
  }
}

module.exports = handleBlogRouter;