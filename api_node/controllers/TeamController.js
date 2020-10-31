const { Team } = require('../database/models');

// Get all teams
exports.getAllTeams = function (req, res) {
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
exports.createTeam = function (req, res) {
  const name = req.body.team.name;

  const newTeam = Team.create({ name: name }).then((team) => {
    res.json({ message: 'new team inserted' });
  });
};

// Delete team
exports.deleteTeam = function (req, res) {
  const teamId = req.params.team_id;
  console.log(teamId);
  const deleteTeam = Team.destroy({
    where: {
      id: teamId,
    },
  }).then((team) => {
    res.json({ message: 'team deleted' });
  });
};

// Get one team by team_id
exports.getTeam = function (req, res) {
  const { team_id } = req.params;

  Team.findByPk(team_id).then((team) => {
    res.json(team);
  });
};

// Update team by team_id
exports.updateTeam = function (req, res) {
  const { team_id } = req.params;
  const teamValues = req.body.team;

  Team.update(teamValues, {
    where: {
      id: team_id,
    },
  }).then((team) => {
      res.json({ message: 'Team edited' });
  });
};
