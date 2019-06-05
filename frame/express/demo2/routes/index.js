var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.add({
    name: '张三',
    age: 12
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
