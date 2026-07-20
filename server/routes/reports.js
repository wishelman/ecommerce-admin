const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportController');

router.get('/summary', ctrl.summary);

module.exports = router;
