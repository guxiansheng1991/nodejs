const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', err => {
  console.error('redis error,', err);
});

// 测试
redisClient.set('myname', 'zhaoliu', redis.print);
redisClient.get('myname', (err, val) => {
  if (err) {
    console.error('redis get error', err);
    return;
  }
  console.log('redis get ,', val);

  redisClient.quit();
});