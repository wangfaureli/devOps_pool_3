const express = require('express');
const router = express();
const clock = require('../controllers/clockController');

// get clocks by user id
router.get('/:user_id', clock.getByUser);
router.post('/:user_id', clock.addForUser);

module.exports = router;
