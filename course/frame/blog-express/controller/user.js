const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../util/cryo');

const login = (username, password) => {
  username = escape(username);
  password = genPassword(password);
  console.log('加密的密码,', password);
  password = escape(password);
  const sql = `select username, realname from users where username=${username} and password=${password}`;
  return exec(sql).then(rows => {
    if (rows.length > 0) {
      return rows[0];
    }
    return {};
  });
};

module.exports = {
  login
};