const { Clock, User } = require('../database/models');
const userController = require('../controllers/userController');

// Get all clocks by user_id
exports.getByUser = function (req, res) {
  const { userId, roleLevel } = userController.getUserConnected(req, res);

  let user_id;

  if (roleLevel == 3) {
    user_id = userId;
  } else {
    user_id = req.params.user_id;
  }

  Clock.findAll({
    where: {
      userId: user_id,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ["username", "email", "firstname", "lastname"]
      },
    ],
  }).then((clocks) => {
    res.json(clocks);
  });
  
};

// Get last user clock
getLastUserClock = (user_id) => {
  console.log(user_id);
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
exports.addForUser = function (req, res) {
  const { userId } = userController.getUserConnected(req, res);

  // check last clock
  this.getLastUserClock(userId).then((clocks) => {
    if (clocks.length > 0) {
      lastClock = clocks[0].dataValues.status;
    } else {
      lastClock = 0;
    }

    let newClockValue;

    // 1 = work in progress
    // 0 = work ended

    if (lastClock == 0 || lastClock == null) {
      newClockValue = 1;
    }
    if (lastClock == 1) {
      newClockValue = 0;
    }

    const newClock = Clock.create({ status: newClockValue, userId: userId });
    res.json({ message: 'Inserted' });
  });
};
