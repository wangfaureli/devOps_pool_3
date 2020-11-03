const { Unavailability } = require('../database/models');
const userController = require('../controllers/userController');

// Get all teams
exports.getAll = function (req, res) {
  // const { user_id } = req.params;

  Unavailability.findAll({
    where: {
      // userId: user_id,
    },
  }).then((unavailability) => {
    res.json(unavailability);
  });
};

// Create new team
exports.create = function (req, res) {
  const { start, end, reason } = req.body.unavailability;

  const userId = userController.getUserConnected(req, res);

  const newUnavailability = Unavailability.create({
    start: start,
    end: end,
    reason: reason,
    userId: userId
  }).then((unavailability) => {
    res.json({ message: 'new unavailability inserted' });
  });
};

// Delete team
exports.delete = function (req, res) {
  const unavailabilityId = req.params.unavailability_id;

  const deleteUnavailability = Unavailability.destroy({
    where: {
      id: unavailabilityId,
    },
  }).then((unavailability) => {
    res.json({ message: 'unavailability deleted' });
  });
};

// Get one team by unavailability_id
exports.getById = function (req, res) {
  const { unavailability_id } = req.params;

  Unavailability.findByPk(unavailability_id).then((unavailability) => {
    res.json(unavailability);
  });
};

// Update team by unavailability_id
exports.update = function (req, res) {
  const { unavailability_id } = req.params;
  const unavailabilityValues = req.body.unavailability;

  Unavailability.update(unavailabilityValues, {
    where: {
      id: unavailability_id,
    },
  }).then((unavailability) => {
    res.json({ message: 'Unavailability edited' });
  });
};
