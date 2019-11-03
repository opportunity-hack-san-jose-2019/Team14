const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname+'/google43499dd9d8321fe4.html');
});

module.exports = router;