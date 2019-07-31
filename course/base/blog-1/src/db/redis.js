const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
  console.error('redis error,', err);
});

// get 方法
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(val);
      }
      try {
        resolve(JSON.parse(val));
      }catch (e) {
        resolve(val);
      }
    });
  })
}

// set 方法
function set(key, value) {
  redisClient.set(key, value, redis.print);
}

module.exports = {
  get,
  set
};