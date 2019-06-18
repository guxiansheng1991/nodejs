/***
 * 数据存储到数组内
 */
const fs = require('fs');

const repos = require('./data.json');


module.exports = {
  store() {
    fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(repos));
  },
  get(index) {
    return repos[index];
  },
  get list() {
    return repos;
  },
  add(article) {
    repos.push(article);
    this.store();
  },
  delete(index) {
    repos.splice(index, 1);
    this.store();
  },
  update(index, newArticle) {
    repos.splice(index, 1, newArticle);
    this.store();
  }
};
