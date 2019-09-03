const { ErrorModel } = require('../model/resModel');

const loginCheck = function (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.json(new ErrorModel('未登录'));
  }
};

module.exports = loginCheck;