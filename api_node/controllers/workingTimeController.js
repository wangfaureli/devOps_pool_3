const { WorkingTime } = require('../database/models');

// Create working time
exports.createWorkingTime = function (req, res) {
  const start = req.body.workingtime.start;
  const end = req.body.workingtime.end;
  const userId = req.params.user_id;

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
};

// Get all working time by user and date
exports.getWorkingTimesByUser = function (req, res) {
  const userId = req.params.user_id;
  let dateStart = req.query.start;
  let dateEnd = req.query.end;
  // let dateStart = req.body.workingtime.start;
  // let dateEnd = req.body.workingtime.end;

  if (!dateStart) { 
    dateStart = '1900-01-01 00:00:00';
  }
  if (!dateEnd) {
    dateEnd = '2100-12-30 23:59:59';
  }
  const { Op } = require('sequelize');

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
};

// Get all working time
exports.getByUserAndWorkingTimeId = function (req, res) {
  const userId = req.params.user_id;
  const workingTimeId = req.params.workingtime_id;

  // if date start or end in body url

  WorkingTime.findAll({
    where: {
      userId: userId,
      id: workingTimeId,
    },
  }).then((workingTimes) => {
    res.json(workingTimes);
  });
};

exports.updateWorkingTime = function (req, res) {
  const workingTimeId = req.params.workingtime_id;
  const workingTimeValues = req.body.workingtime;

  WorkingTime.update(workingTimeValues, {
    where: {
      id: workingTimeId,
    },
  }).then((workingtime) => {
      res.json({ message: 'workingTime edited' });
  });
};

// Delete working time
exports.deleteWorkingTime = function (req, res) {
  const workingTimeId = req.params.workingtime_id;

  const deleteWorkingTime = WorkingTime.destroy({
    where: {
      id: workingTimeId,
    },
  }).then((workingTime) => {
    res.json({ message: 'working time deleted' });
  });
};
