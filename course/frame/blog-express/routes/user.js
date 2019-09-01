const express = require('express');
const router = express.Router();

router.post('/login', function (req, res, next) {
    res.json({
        errno: 0,
        data: 'success'
    });
});

module.exports = router;