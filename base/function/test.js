// var arr = ["122.122.122.122","111.111.111.111","122.122.122.122","111.111.111.111","100.100.100.100","100.100.100.100"];
var arr = ["2",'4','4'];

var obj = {};

for (var i = 0, len = arr.length; i < len; i++) {
  var item = arr[i];
  if (obj[item]) {
    obj[item].indexArr.push(i);
  } else {
    obj[item] = {
      value: item,
      indexArr: [i]
    };
  }
}

var resultArr = [];
// 整理成目标数据结构
for (var key in obj) {
  if (obj[key].indexArr.length > 1) {
    resultArr.push(obj[key].indexArr.toString());
  }
}

console.log('obj', obj);
console.log('resultArr', resultArr);