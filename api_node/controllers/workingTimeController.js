const { WorkingTime } = require('../database/models');
const userController = require('../controllers/userController');

// Get all working time by user and date
exports.getAll = function (req, res) {
  let dateStart = req.query.start;
  let dateEnd = req.query.end;
  // let dateStart = req.body.workingtime.start;
  // let dateEnd = req.body.workingtime.end;
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  if (!dateStart) {
    dateStart = '1900-01-01 00:00:00';
  }
  if (!dateEnd) {
    dateEnd = '2100-12-30 23:59:59';
  }
  const { Op } = require('sequelize');

  // check if is employee
  if (roleLevel == 3) {
    WorkingTime.findAll({
      where: {
        userId: userId,
        start: {
          [Op.gte]: dateStart,
        },
        end: {
          [Op.lte]: dateEnd,
        },
      },
      order: [['start', 'ASC']],
    }).then((workingTimes) => {
      res.json(workingTimes);
    });
  } else {
    WorkingTime.findAll({
      where: {
        start: {
          [Op.gte]: dateStart,
        },
        end: {
          [Op.lte]: dateEnd,
        },
      },
      order: [['start', 'ASC']],
    }).then((workingTimes) => {
      res.json(workingTimes);
    });
  }
};

// Create working time
exports.create = function (req, res) {
  const start = req.body.workingtime.start;
  const end = req.body.workingtime.end;
  const userId = req.params.user_id;

  // check role user connected
  const { roleLevel } = userController.getUserConnected(req, res);

  // admin or manager
  if (roleLevel == 1 || roleLevel == 2) {
    const newWorkingTime = WorkingTime.create({
      start: start,
      end: end,
      userId: userId,
    })
      .then((workingtime) => {
        res.json({ message: 'new workingTime inserted' });
      })
      .catch((err) => {
        res.json({ err });
      });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Get all working time by user and date
exports.getByUser = function (req, res) {
  let dateStart = req.query.start;
  let dateEnd = req.query.end;
  // let dateStart = req.body.workingtime.start;
  // let dateEnd = req.body.workingtime.end;
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  let user_id;

  // check if is employee
  if (roleLevel == 3) {
    user_id = userId;
  } else {
    user_id = req.params.user_id;
  }

  if (!dateStart) {
    dateStart = '1900-01-01 00:00:00';
  }
  if (!dateEnd) {
    dateEnd = '2100-12-30 23:59:59';
  }
  const { Op } = require('sequelize');

  WorkingTime.findAll({
    where: {
      userId: user_id,
      start: {
        [Op.gte]: dateStart,
      },
      end: {
        [Op.lte]: dateEnd,
      },
    },
    order: [['start', 'ASC']],
  }).then((workingTimes) => {
    res.json(workingTimes);
  });
};

// Get all working time
exports.getByIdAndUser = function (req, res) {
  const workingTimeId = req.params.workingtime_id;
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  let user_id;

  // check if is employee
  if (roleLevel == 3) {
    user_id = userId;
  } else {
    user_id = req.params.user_id;
  }

  WorkingTime.findAll({
    where: {
      userId: user_id,
      id: workingTimeId,
    },
  }).then((workingTimes) => {
    res.json(workingTimes);
  });
};

exports.update = function (req, res) {
  const workingTimeId = req.params.workingtime_id;
  const workingTimeValues = req.body.workingtime;

  const { roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    WorkingTime.update(workingTimeValues, {
      where: {
        id: workingTimeId,
      },
    }).then((workingtime) => {
      res.json({ message: 'workingTime edited' });
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Delete working time
exports.delete = function (req, res) {
  const workingTimeId = req.params.workingtime_id;

  const { roleLevel } = userController.getUserConnected(req, res);

  // check if is employee
  if (roleLevel == 1 || roleLevel == 2) {
    const deleteWorkingTime = WorkingTime.destroy({
      where: {
        id: workingTimeId,
      },
    }).then((workingTime) => {
      res.json({ message: 'working time deleted' });
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};
