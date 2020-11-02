const express = require('express');
const router = express();
const user = require('../controllers/userController');

router.get('/', user.getAll);
router.get('/:user_id', user.getById);
router.put('/:user_id', user.update);
router.get('/team/:user_team', user.getTeam);
router.post('/:user_id/update-teams', user.updateTeams);
router.delete('/:user_id', user.delete);

module.exports = router;
