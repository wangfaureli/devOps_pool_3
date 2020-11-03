const express = require('express');
const router = express();
const clock = require('../controllers/clockController');

/**
 * Prefix des url : 
 * 
 * http://localhost:4000/api/clocks
*/
router.get('/:user_id', clock.getByUser);
router.post('/:user_id', clock.addForUser);

module.exports = router;
