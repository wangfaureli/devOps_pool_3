const express = require('express');
const router = express();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getAllTeams);
router.get('/:team_id', teamController.getTeam);
router.post('/', teamController.createTeam);
router.delete('/:team_id', teamController.deleteTeam);
router.put('/:team_id', teamController.updateTeam);

module.exports = router;
