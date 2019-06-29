let reg = /^33[^(02)]{2}/g;

let str = '3300sdg';

let flag = reg.test(str);

console.log('flag', flag);