const { exec, escape } = require('../db/mysql');
const xss = require('xss');

const getList = async (author, keyword) => {
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
  return await exec(sql);
};

const getDetail = async (id) => {
  id = escape(id);
  const sql = `select * from blogs where id=${id}`;
  const blogList = await exec(sql);
  if (blogList.length > 0) {
    return blogList[0];
  } else {
    return {};
  }
};

const newBlog = async (blogData = {}) => {
  const title = xss(escape(blogData.title));
  const content = xss(escape(blogData.content));
  const createtime = escape(blogData.createtime);
  const author = escape(blogData.author);
  const sql = `insert into blogs(title, content, createtime, author) values(${title}, ${content}, ${createtime}, ${author});`;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId
  }
};

const updateBlog = async (id, blogData = {}) => {
  // id是应该更新的行
  id = escape(id);
  const title = escape(blogData.title);
  const content = escape(blogData.content);
  const sql = `update blogs set title=${title}, content=${content} where id=${id}`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

const delBlog = async (id, author) => {
  id = escape(id);
  author = escape(author);
  const sql = `delete from blogs where id=${id} and author=${author}`;
  const deleteData = await exec(sql);
  if (deleteData.affectedRows > 0) {
    return true;
  }
  return false;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};