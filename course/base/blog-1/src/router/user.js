const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登陆接口
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    // const { username, password } = req.query;
    const result = login(username, password);
    return result.then(user => {
      if (user.username) {
        req.session.username = user.username;
        req.session.realname = user.realname;
        return new SuccessModel();  
      } else {
        return new ErrorModel('登陆失败');  
      }
    });
  }

  // 测试登陆
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel(req.session));
  //   }
  //   return Promise.resolve(new ErrorModel('未登陆'));
  // }
}

module.exports = handleUserRouter;