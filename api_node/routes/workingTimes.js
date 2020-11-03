const express = require('express');
const router = express();
const workingTime = require('../controllers/WorkingTimeController');

// get all workingtimes by user_id
router.get('/:user_id', workingTime.getByUser);
router.get('/:user_id/:workingtime_id', workingTime.getByIdAndUser);
router.post('/:user_id', workingTime.create);
router.put('/:workingtime_id', workingTime.update);
router.delete('/:workingtime_id', workingTime.delete);

module.exports = router;
