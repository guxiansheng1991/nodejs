const getList = (author, keyword) => {
  // 返回假数据,格式正确的
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1561799248751,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1561799282616,
      author: 'lisi'
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1561799248751,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 应该包含title, content
  return {
    id: 3
  };
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