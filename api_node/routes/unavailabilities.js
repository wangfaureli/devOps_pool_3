const express = require('express');
const router = express();
const unavailability = require('../controllers/unavailabilityController');

router.get('/', unavailability.getAll);
router.post('/', unavailability.create);
router.get('/:unavailability_id', unavailability.getById);
router.put('/:unavailability_id', unavailability.update);
router.delete('/:unavailability_id', unavailability.delete);

module.exports = router;
