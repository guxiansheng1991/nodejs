var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/loginAction', function(req, res, next) {
  let name = req.body.name;
  if (name === '张三') {
    req.session.logined = true;
    res.redirect('/');
  } else {
    req.session.logined = false;
    res.send('error');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.logined = false;
  res.redirect('/');
});

module.exports = router;
