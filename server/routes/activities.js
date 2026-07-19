const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/activityController');

router.get('/', auth, ctrl.getAll);
router.delete('/clear', auth, ctrl.clear);

module.exports = router;
