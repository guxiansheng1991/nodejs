/*
// 第四题
var numberArray = [3,6,2,4,1,5];

// 倒排
var arr1 = [];
for (var i = numberArray.length - 1; i >= 0; i--) {
  arr1.push(numberArray[i]);
}

// 降序排序
var arr2 = numberArray.sort(function (pre, next) {
  return next - pre;
});

console.log('倒排', arr1);
console.log('降序排序', arr2);
*/

// 第六题

var arr = [];
var  i = 10;
while (i > 0) {
  arr.push(Math.floor(Math.random() * 90 + 10));
  i--;
}

var arr2 = arr.sort(function (pre, next) {
  return next - pre;
});

console.log('arr2', arr2);
