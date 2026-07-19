const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/reportController');

router.get('/summary', auth, ctrl.summary);

module.exports = router;
