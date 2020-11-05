const express = require('express');
const router = express();
const unavailability = require('../controllers/unavailabilityController');

/**
 * Prefix des url : 
 * 
 * http://localhost:4000/api/unavailabilities
*/
router.get('/', unavailability.getAll);
router.post('/', unavailability.create);
router.get('/:unavailability_id', unavailability.getById);
router.put('/:unavailability_id', unavailability.update);
router.put('/accept/:unavailability_id', unavailability.accept);
router.put('/refuse/:unavailability_id', unavailability.refuse);
router.delete('/:unavailability_id', unavailability.delete);

module.exports = router;
