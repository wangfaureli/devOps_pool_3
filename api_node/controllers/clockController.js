const { Clock } = require('../database/models');

// Get all clocks by user_id
exports.getClockByUser = function (req, res) {
  const { user_id } = req.params;

  Clock.findAll({
    where: {
      userId: user_id,
    },
  }).then((clocks) => {
    res.json(clocks);
  });
};

// Get last user clock
getLastUserClock = (user_id) => {
  const lastClock = Clock.findAll({
    limit: 1,
    where: {
      userId: user_id,
    },
    order: [['createdAt', 'DESC']],
  });

  return lastClock;
};

// Clock In & clock out
exports.addClockUser = function (req, res) {
  const { user_id } = req.params;

  // check last clock
  this.getLastUserClock(user_id).then((clocks) => {
    lastClock = clocks[0].dataValues.status;

    let newClockValue;
    
    // 1 = work in progress
    // 0 = work ended

    if (lastClock == 0 || lastClock == null) {
      newClockValue = 1;
    }
    if (lastClock == 1) {
      newClockValue = 0;
    }

    const newClock = Clock.create({ status: newClockValue, userId: user_id });
    res.json({message: "Inserted"});
  });
};
