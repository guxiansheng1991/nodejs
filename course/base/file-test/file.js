const fs = require('fs');
const path = require('path');
const http = require('http');

// let filename = path.resolve(__dirname, 'test.txt');

// 读文件
// fs.readFile(filename, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data.toString());
// });

// 写文件
// fs.writeFile(filename, '这个是新的内容\n', {flag: 'a'}, err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('文件写入成功');
// });

// 判断文件是否存在
// fs.access(filename, fs.constants.F_OK, (err) => {
//   console.log(`${filename} ${err ? '不存在' : '存在'}`);
// });


// 实现复制文件功能
// const filenameBak = path.resolve(__dirname, 'test-bak.txt');
// const readStream = fs.createReadStream(filename);
// const writeStream = fs.createWriteStream(filenameBak);
// readStream.pipe(writeStream);
//
// readStream.on('data', chunk => {
//   console.log('读取:',chunk.toString());
// });
// readStream.on('end', () => {
//   console.log('复制完成');
// });

// 网络流读取文件
const videoFilename = path.resolve(__dirname, 'test.txt');
const server = http.createServer((req, res) => {
  if (req.method.toLocaleUpperCase() === 'GET') {
    const readStream = fs.createReadStream(videoFilename);
    readStream.pipe(res);
  }
});

server.listen(8005);