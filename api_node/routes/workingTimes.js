const express = require('express');
const router = express();
const workingTimeController = require('../controllers/WorkingTimeController');

// get all workingtimes by user_id
router.get('/:user_id', workingTimeController.getWorkingTimesByUser);
router.get('/:user_id/:workingtime_id', workingTimeController.getByUserAndWorkingTimeId);
router.post('/:user_id', workingTimeController.createWorkingTime);
router.put('/:workingtime_id', workingTimeController.updateWorkingTime);
router.delete('/:workingtime_id', workingTimeController.deleteWorkingTime);

module.exports = router;
