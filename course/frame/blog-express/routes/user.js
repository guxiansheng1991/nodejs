const express = require('express');
const router = express.Router();
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    const result = login(username, password);
    result.then(user => {
        if (user.username) {
            req.session.username = user.username;
            req.session.realname = user.realname;
            res.json(new SuccessModel());
        } else {
            res.json(new ErrorModel('登陆失败'));
        }
    });
});

router.get('/login-test', function (req, res, next) {
    const session = req.session;
    res.json({
        errno: 0,
        msg: session.username
    });
});

router.get('/session-test', function (req, res, next) {
    const session = req.session;
    if (session.viewNumber == null) {
        session.viewNumber = 0;
    }
    session.viewNumber++;
    res.json({
        errno: 0,
        viewNumber: session.viewNumber
    });
});

module.exports = router;