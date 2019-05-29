var url = require('url');
var querystring = require('querystring');
var OptPool = require('./OptPool');

var optPool = new OptPool();
var pool = optPool.getPool();

// 插入操作
function add(req, res) {
  getFormParams('get', req, res, function(params) {
    pool.getConnection(function(err, conn) {
      if (err) {
        console.error(`error: ${err}`);
        res.end(err);
        return;
      }
      // 插入
      var sql_insert = 'insert into user(uname, pwd) values(?,?)';
      var params_insert = [params.uname, params.pwd];
      conn.query(sql_insert, params_insert, function(err, resData) {
        if (err) {
          console.error(`insert error: ${err}`);
          res.end(err);
          return;
        }
        console.log(`insert succeed: ${resData.insertId}`);
        conn.release();
        res.end(`insert succeed: ${resData.insertId}`);
      });
    });
  });
}

// 查询user列表
function userList(req, res) {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.error(`error: ${err}`);
      res.end(err);
      return;
    }
    // 查询
    var sql_select = 'select * from user';
    conn.query(sql_select, function(err, rows) {
      if (err) {
        console.error(`insert error: ${err}`);
        res.end(err);
        return;
      }
      var data = '';
      for(var i = 0; i < rows.length; i++) {
        console.log(`uname: ${rows[i].uname}, pwd: ${rows[i].pwd}`);
        data += `uname: ${rows[i].uname}, pwd: ${rows[i].pwd}</br>`;
      }
      conn.release();
      res.end(data);
    });
  });
}

// 获取请求参数
function getFormParams(type, req, res, cb) {
  var params = {};
  if (type.toUpperCase() === 'GET') {
    params = url.parse(req.url).query;
    params = querystring.parse(params);
    cb(params);
  } else {
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      params = querystring.parse(data);
      cb(params);
    });
  }
}

module.exports = {
  add,
  userList
};