const express = require('express');
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// 获取博客列表
router.get('/list', function (req, res, next) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    // 个人中心查看自己的博客
    const isadmin = req.query.isadmin;
    if (isadmin) {
        if (!req.session.username) {
            res.json(new ErrorModel('未登录'));
            return;
        }
        author = req.session.username;
    }
    let result = getList(author, keyword);
    result.then(listData => {
        res.json(
            new SuccessModel(listData)
        );
    });
});

// 获取博客详情
router.get('/detail', function (req, res, next) {
    let result = getDetail(req.query.id);
    result.then(blogDetail => {
        res.json(new SuccessModel(blogDetail));
    });
});

// 新建博客
router.post('/new', loginCheck, function (req, res, next) {
    const author = req.session.username;
    req.body.author = author;
    const result = newBlog(req.body);
    result.then(data => {
        res.json(new SuccessModel(data));
    });
});

// 更新博客
router.post('/update', loginCheck, function (req, res, next) {
    const result = updateBlog(req.query.id, req.body);
    result.then(val => {
        if (val) {
            res.json(new SuccessModel());
        } else {
            res.json(new ErrorModel('更新失败'));
        }
    });
});

// 删除博客
router.post('/del', loginCheck, function (req, res, next) {
    const author = req.session.username;
    const result = delBlog(req.query.id, author);
    result.then(val => {
        if (val) {
            res.json(new SuccessModel());
        } else {
            res.json(new ErrorModel('删除失败'));
        }
    })
});

module.exports = router;