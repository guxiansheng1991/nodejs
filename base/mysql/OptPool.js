/**
 * 创建连接池类
 */

 var mysql = require('mysql');

 // 连接池类
 function OptPool() {
   this.flag = true;
   this.pool = mysql.createPool({
     host: 'localhost',
     port: '3306',
     database: 'test',
     user: 'root',
     password: '123456'
   });
   this.getPool = function() {
     if (this.flag) {
        // 监听connection事件
        this.pool.on('connection', function(connection) {
          connection.query('SET SESSION auto_increment_increment=1');
          this.flag = false;
        });
     }
     return this.pool;
   }
 }

 module.exports = OptPool;