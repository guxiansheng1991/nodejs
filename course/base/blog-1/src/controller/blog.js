const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc`;
  return exec(sql);
}

const getDetail = (id) => {
  const sql = `select * from blogs where id=${id}`;
  const result = exec(sql);
  return result.then(blogList => {
    if (blogList.length > 0) {
      return blogList[0];
    } else {
      return {};
    }
  });
}

const newBlog = (blogData = {}) => {
  const title = blogData.title;
  const content = blogData.content;
  const createtime = blogData.createtime;
  const author = blogData.author;
  const sql = `insert into blogs(title, content, createtime, author) values('${title}', '${content}', ${createtime}, '${author}');`;
  console.log('sql', sql);
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  });
}

const updateBlog = (id, blogData = {}) => {
  // id是应该更新的行
  return true;
}

const delBlog = (id) => {
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};