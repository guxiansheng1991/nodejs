var mysql = require('mysql');

// 创建一个连接
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'test',
  user: 'root',
  password: '123456'
});

// 开始连接
connection.connect(function(err) {
  if(err) {
    console.log(`[query] - : ${err}`);
    return;
  }
  console.log('[connection connect] succeed');
});

/***
 * 执行操作
 * */
// 插入
var sql_insert = 'insert into user(uname, pwd) values(?,?)';
var params_insert = ['lisi', '123456'];
connection.query(sql_insert, params_insert, function(err, res) {
  if (err) {
    console.error(`insert error: ${err}`);
    return;
  }
  console.log(`insert succeed: ${res.toString()}`);
});
// 查询
var sql_select = 'select * from user';
connection.query(sql_select, function(err, rows, field) {
  if (err) {
    console.error(`select error: ${err}`);
    return;
  }
  for(var i = 0; i < rows.length; i++) {
    console.log(`uname: ${rows[i].uname}, pwd: ${rows[i].pwd}`);
  }
  console.log(field);
});

// 关闭连接
connection.end(function(err) {
  if(err) {
    console.log(`[end] - : ${err}`);
    return;
  }
  console.log('[connection end] succeed');
});