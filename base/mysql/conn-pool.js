var OptPool = require('./OptPool');

var optPool = new OptPool();
var pool = optPool.getPool();

// 从连接池中获取来一个连接
pool.getConnection(function(err, conn) {
  if (err) {
    console.error(`error: ${err}`);
    return;
  }
  // 插入
  var sql_insert = 'insert into user(uname, pwd) values(?,?)';
  var params_insert = ['wangwu', '123456'];
  conn.query(sql_insert, params_insert, function(err, res) {
    if (err) {
      console.error(`insert error: ${err}`);
      return;
    }
    console.log(`insert succeed: ${res.toString()}`);
    // conn.release();
  });

  // 查询
  var sql_select = 'select * from user';
  conn.query(sql_select, function(err, rows, field) {
    if (err) {
      console.error(`select error: ${err}`);
      return;
    }
    for(var i = 0; i < rows.length; i++) {
      console.log(`uname: ${rows[i].uname}, pwd: ${rows[i].pwd}`);
    }
    // 连接放回连接池
    conn.release();
  });
});