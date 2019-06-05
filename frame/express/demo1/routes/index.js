var express = require('express');
var router = express.Router();

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('第一个处理函数');
  next();
}, function(req, res) {
  console.log('第二个处理函数');
  res.render('index', { title: '申玉超' });
});

router.get('/test', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
});

module.exports = router;
