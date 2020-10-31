const express = require('express');
const router = express();
const clockController = require('../controllers/clockController');

// get clocks by user id
router.get('/:user_id', clockController.getClockByUser);
router.post('/:user_id', clockController.addClockUser);

module.exports = router;
