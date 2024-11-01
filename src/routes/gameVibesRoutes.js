

const express               =   require('express');
const router                =   express.Router();
const gameVibesController      = require('../controller/gameVibesController');


router.post('/recommendations', gameVibesController.recommended);

module.exports = router;