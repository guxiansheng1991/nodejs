const express = require('express');
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', function (req, res, next) {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    // 个人中心查看自己的博客
    // const isadmin = req.query.isadmin;
    // if (isadmin) {
    //     const loginCheckResult = loginCheck(req);
    //     if (loginCheckResult) {
    //         return loginCheckResult;
    //     }
    //     author = req.session.username;
    // }
    let result = getList(author, keyword);
    result.then(listData => {
        res.json(
            new SuccessModel(listData)
        );
    });
});

module.exports = router;