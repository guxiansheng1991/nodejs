const dns = require('dns');

const domain = 'github.com';
const ip = '13.229.188.59';
const ip2 = '114.114.114.114';

dns.resolve(domain, function(err, address) {
  if (err) {
    console.error('err', err);
    return;
  }
  console.log('dns.resolve', address);
});

dns.lookup(domain, function(err, address) {
  if (err) {
    console.error('err', err);
    return;
  }
  console.log('dns.lookup', address);
});

dns.reverse(ip, function(err, address) {
  if (err) {
    console.error('err', err);
    return;
  }
  console.log('dns.reverse', address);
});