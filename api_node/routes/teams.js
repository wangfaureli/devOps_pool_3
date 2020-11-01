const express = require('express');
const router = express();
const team = require('../controllers/teamController');

router.get('/', team.getAll);
router.get('/:team_id', team.getById);
router.post('/', team.create);
router.delete('/:team_id', team.delete);
router.put('/:team_id', team.update);

module.exports = router;
