const { Team } = require('../database/models');
const userController = require('../controllers/userController');

// Get all teams
exports.getAll = function (req, res) {
  // const { user_id } = req.params;

  Team.findAll({
    where: {
      // userId: user_id,
    },
  }).then((teams) => {
    res.json(teams);
  });
};

// Create new team
exports.create = function (req, res) {
  const name = req.body.team.name;
  const { roleLevel } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    const newTeam = Team.create({ name: name }).then((team) => {
      res.json({ message: 'new team inserted' });
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Delete team
exports.delete = function (req, res) {
  const teamId = req.params.team_id;
  const { roleLevel } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    const deleteTeam = Team.destroy({
      where: {
        id: teamId,
      },
    }).then((team) => {
      res.json({ message: 'team deleted' });
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Get one team by team_id
exports.getById = function (req, res) {
  const { team_id } = req.params;
  const { roleLevel } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    Team.findByPk(team_id).then((team) => {
      res.json(team);
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Update team by team_id
exports.update = function (req, res) {
  const { team_id } = req.params;
  const teamValues = req.body.team;
  const { roleLevel } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    Team.update(teamValues, {
      where: {
        id: team_id,
      },
    }).then((team) => {
      res.json({ message: 'Team edited' });
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};
