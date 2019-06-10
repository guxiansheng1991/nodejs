var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { list: db.list});
});

router.post('/add', function(req, res, next) {
  const article = {
    name: req.body.name,
    age: req.body.age
  };
  db.add(article);
  res.redirect('/');
});

router.get('/delete', function(req, res, next) {
  db.delete(req.query.index);
  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  const article = {
    name: req.body.name,
    age: req.body.age
  };
  db.update(req.body.index, article);
  res.redirect('/');
});

module.exports = router;
