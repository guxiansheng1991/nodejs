const fs = require('fs');
const path = require('path');
const os = require('os');

// 生成write stream
function createWriteStream(filename) {
  const fullpath = path.join(__dirname, '../', '../', 'logs/', filename);
  return fs.createWriteStream(fullpath);
}

// 写入log
function writeLog(writeStream, log) {
  writeStream.write(log + os.EOL);
}

// 写入access.log文件
const accessWriteStream = createWriteStream('access.log');
function access(log) {
  writeLog(accessWriteStream, log);
}

// 写入error.log
const errorWriteStream = createWriteStream('error.log');
function error(log) {
  writeLog(errorWriteStream, log);
}

// 写入event.log
const eventWriteStream = createWriteStream('event.log');
function event(log) {
  writeLog(eventWriteStream, log);
}

module.exports = {
  access,
  error,
  event
};