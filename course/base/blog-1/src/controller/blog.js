const { exec, escape } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    author = escape(author);
    sql += `and author=${author}`;
  }
  if (keyword) {
    keyword = escape(keyword);
    sql += `and title like %${keyword}% `;
  }
  sql += `order by createtime desc`;
  return exec(sql);
}

const getDetail = (id) => {
  id = escape(id);
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
  const title = escape(blogData.title);
  const content = escape(blogData.content);
  const createtime = escape(blogData.createtime);
  const author = escape(blogData.author);
  const sql = `insert into blogs(title, content, createtime, author) values(${title}, ${content}, ${createtime}, ${author});`;
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  });
}

const updateBlog = (id, blogData = {}) => {
  // id是应该更新的行
  id = escape(id);
  const title = escape(blogData.title);
  const content = escape(blogData.content);
  const sql = `update blogs set title=${title}, content=${content} where id=${id}`;
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
}

const delBlog = (id, author) => {
  id = escape(id);
  author = escape(author);
  const sql = `delete from blogs where id=${id} and author='${author}'`;
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};