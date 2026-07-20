const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/activityController');

router.get('/', ctrl.getAll);
router.delete('/clear', ctrl.clear);

module.exports = router;
