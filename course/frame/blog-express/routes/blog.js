const express = require('express');
const router = express.Router();

router.get('/list', function (req, res, next) {
    res.json({
        errno: 0,
        data: [1, 2, 3]
    });
});

module.exports = router;