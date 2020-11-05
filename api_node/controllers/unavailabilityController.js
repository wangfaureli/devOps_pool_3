const { Unavailability, User } = require('../database/models');
const userController = require('../controllers/userController');

// Get all unavailability
exports.getAll = function (req, res) {
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 3) {
    Unavailability.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["username", "email", "firstname", "lastname"]
        },
        
      ],
      order: [['start', 'ASC']],
    }).then((unavailability) => {
      res.json(unavailability);
    });
  } else {
    Unavailability.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["username", "email", "firstname", "lastname"]
        },
      ],
      order: [['start', 'ASC']],
    }).then((unavailability) => {
      res.json(unavailability);
    });
  }
};

// Create new unavailability
exports.create = function (req, res) {
  const { start, end, reason } = req.body.unavailability;
  const { userId } = userController.getUserConnected(req, res);

  const newUnavailability = Unavailability.create({
    start: start,
    end: end,
    reason: reason,
    userId: userId,
  }).then((unavailability) => {
    res.json({ message: 'new unavailability inserted' });
  });
};

// Delete unavailability
exports.delete = function (req, res) {
  const unavailabilityId = req.params.unavailability_id;
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    const deleteUnavailability = Unavailability.destroy({
      where: {
        id: unavailabilityId,
      },
    }).then((unavailability) => {
      res.json({ message: 'unavailability deleted' });
    });
  } else {
    const deleteUnavailability = Unavailability.destroy({
      where: {
        id: unavailabilityId,
        userId: userId,
      },
    }).then((unavailability) => {
      res.json({ message: 'unavailability deleted' });
    });
  }
};

// Get one unavailability by unavailability_id
exports.getById = function (req, res) {
  const { unavailability_id } = req.params;
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    Unavailability.findOne({
      where: { id: unavailability_id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["username", "email", "firstname", "lastname"]
        },
      ],
    }).then((unavailability) => {
      res.json(unavailability);
    });
  } else {
    Unavailability.findOne({
      where: {
        id: unavailability_id,
        userId: userId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ["username", "email", "firstname", "lastname"]
        },
      ],
    }).then((unavailability) => {
      res.json(unavailability);
    });
  }
};

// Update unavailability by unavailability_id
exports.update = function (req, res) {
  const { unavailability_id } = req.params;
  const unavailabilityValues = req.body.unavailability;

  const { userId, roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    Unavailability.update(unavailabilityValues, {
      where: {
        id: unavailability_id,
      },
    }).then((unavailability) => {
      res.json({ message: 'Unavailability edited' });
    });
  } else {
    Unavailability.update(unavailabilityValues, {
      where: {
        id: unavailability_id,
        userId: userId,
      },
    }).then((unavailability) => {
      res.json({ message: 'Unavailability edited' });
    });
  }
};

exports.refuse = function (req, res) {
  const { unavailability_id } = req.params;
  const unavailabilityValues = req.body.unavailability;

  const { roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    Unavailability.update(
      {
        accepted: 0
      }, {
      where: {
        id: unavailability_id,
      },
    }).then((unavailability) => {
      res.json({ message: 'Unavailability refuse' });
    });
  } else {
      res.json({ message: 'You have not the rights to do this' });
  }
 }

// Update unavailability by unavailability_id
exports.accept = function (req, res) {
  const { unavailability_id } = req.params;
  const unavailabilityValues = req.body.unavailability;

  const { roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    Unavailability.update(
      {
        accepted: 1
      }, {
      where: {
        id: unavailability_id,
      },
    }).then((unavailability) => {
      res.json({ message: 'Unavailability accepted' });
    });
  } else {
      res.json({ message: 'You have not the rights to do this' });
  }
};
