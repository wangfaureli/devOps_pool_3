const { User, Team, Role } = require('../database/models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const userController = require('./userController');
const jwt = require('../utils/jwt.utils');

// Get one user by user_id
exports.getById = function (req, res) {
  const { user_id } = req.params;
  const { roleLevel, userId } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    User.findByPk(user_id, {
      include: [
        {
          model: Team,
          as: 'teams',
        },
        {
          model: Role,
          as: 'role',
        },
      ],
    }).then((user) => {
      res.json(user);
    });
  } else {
    User.findOne({
      include: [
        {
          model: Team,
          as: 'teams',
        },
        {
          model: Role,
          as: 'role',
        },
      ],
      where: {
        id: userId,
      },
    }).then((user) => {
      res.json(user);
    });
  }
};

// Add team in user
exports.updateTeams = function (req, res) {
  const { user_id } = req.params;
  const { teams } = req.body;
  const { roleLevel, userId } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    if (teams && teams.length > 0) {
      const userFound = User.findByPk(user_id, {
        include: [
          {
            model: Team,
            as: 'teams',
          },
          {
            model: Role,
            as: 'role',
          },
        ],
      }).then((user) => {
        user.setTeams(teams).then((userteam) => {
          res.json(userteam);
        });
      });
    }
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }

  // let userTeams = [];

  // if (teams && teams.length > 0) {
  //   const userFound = User.findByPk(user_id, {
  //     include: [
  //       {
  //         model: Team,
  //         as: 'teams',
  //       },
  //     ],
  //   }).then((user) => {
  //     user.teams.map((team) => {
  //       userTeams.push(team.UserTeam.dataValues.teamId);
  //     })
  //     userTeams = userTeams.concat(teams);

  //     userTeams = userTeams.filter(function(item, pos) {
  //       return userTeams.indexOf(item) == pos;
  //     })

  //     user.setTeams(userTeams).then(() => {
  //       res.json(user.teams);
  //     });

  //   });
};

// Get users by team
exports.getTeam = function (req, res) {
  const { user_team } = req.params;

  User.findAll({
    include: [
      {
        model: Team,
        as: 'teams',
        where: { '$teams.UserTeam.teamId$': user_team },
      },
    ],
  }).then((users) => {
    res.json(users);
  });
};

exports.update = function (req, res) {
  const { user_id } = req.params;
  const userValues = req.body.user;
  const { roleLevel, userId } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2 || user_id == userId) {
    User.update(userValues, {
      where: {
        id: user_id,
      },
    }).then((user) => {
      res.json({ message: 'User edited' });
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Authenticate user
exports.login = function (req, res) {
  const username = req.body.user.username;
  const password = req.body.user.password;
  // const email = req.body.user.email;

  // check empty field
  if (username == null || password == null) {
    res.status(400).json({ error: 'missing fields' });
  }

  User.findOne({
    where: {
      username: username,
    },
    include: [
      {
        model: Team,
        as: 'teams',
      },
      {
        model: Role,
        as: 'role',
      },
    ],
  })
    .then((userFound) => {
      if (userFound) {
        console.log(password);
        console.log(userFound.password);
        bcrypt.compare(password, userFound.password, (errBcrypt, resBcrypt) => {
          console.log(resBcrypt);
          if (resBcrypt) {
            const jwtToken = jwt.generateJwtToken(userFound);
            const csrfToken = jwt.generateCsrfToken();

            // Creates a cookie which expires after 30 day
            const oneMonth = 24 * 60 * 60 * 30;

            res
              .cookie('jwt_token', jwtToken, {
                maxAge: oneMonth,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
              })
              .cookie('csrf_token', csrfToken, {
                maxAge: oneMonth,
                secure: process.env.NODE_ENV === 'production' ? true : false,
              })
              .json({ message: 'user connected' });
          } else {
            res.status(500).json({ error: 'Password error' });
          }
        });
      } else {
        res.status(500).json({ error: 'Fail connection' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// create user
exports.create = function (req, res) {
  const username = req.body.user.username;
  const password = req.body.user.password;
  const email = req.body.user.email;
  const firstname = req.body.user.firstname;
  const lastname = req.body.user.lastname;
  const birthday = req.body.user.birthday;
  const roleId = req.body.user.roleId;

  const { roleLevel } = userController.getUserConnected(req, res);

  if (roleLevel == 1 || roleLevel == 2) {
    // check empty field
    if (
      username == null ||
      email == null ||
      password == null ||
      firstname == null ||
      lastname == null ||
      roleId == null
    ) {
      res.status(400).json({ error: 'missing fields' });
    }

    // TODO : verify string min length, email regex, password, etc

    const { Op } = require('sequelize');

    User.findOne({
      attributes: ['email'],
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    }).then((userExist) => {
      if (!userExist) {
        const newUser = User.create({
          username: username,
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          roleId: roleId,
        }).then((user) => {
          res.status(201).json({ user });
        });
      } else {
        res.status(409).json({ error: 'User already exist in db' });
      }
    });
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

// Log out user
exports.logout = function (req, res) {
  res.clearCookie('jwt_token');
  res.clearCookie('csrf_token');
  res.json({ message: 'User disconnected' });
};

// Delete a user
exports.delete = function (req, res) {
  const userId = req.params.user_id;

  const { roleLevel } = userController.getUserConnected(req, res);

  // if (roleLevel == 1) {
    const deleteUser = User.destroy({
      where: {
        id: userId,
      },
    }).then((user) => {
      res.json({ message: 'user deleted' });
    });
  // } else {
  //   res.json({ message: "you don't have the rights to do this" });
  // }
};

// Get all users
exports.getAll = function (req, res) {
  const username = req.query.username;
  const email = req.query.email;
  const { roleLevel } = userController.getUserConnected(req, res);
  
  if (roleLevel == 1 || roleLevel == 2) {
    if (username) {
      User.findOne({
        where: {
          username: username,
        },
      }).then((user) => {
        res.json(user);
      });
    } else if (email) {
      User.findOne({
        where: {
          email: email,
        },
      }).then((user) => {
        res.json(user);
      });
    } else {
      // return all users
      User.findAll({
        include: [
          {
            model: Team,
            as: 'teams',
          },
          {
            model: Role,
            as: 'role',
          },
        ],
      }).then((users) => {
        res.json(users);
      });
    }
  } else {
    res.json({ message: "you don't have the rights to do this" });
  }
};

exports.decryptToken = function (req, res) {
  const csrfToken = req.cookies.csrf_token;
  const jwtToken = req.cookies.jwt_token;

  if (!jwtToken) {
    res.sendStatus(401);
  }

  let returned;

  //check jwt
  jsonwebtoken.verify(jwtToken, csrfToken, function (err, jwtValues) {
    if (jwtValues.csrfToken == csrfToken) {
      // res.json({ userId: jwtValues.userId, roleId: jwtValues.roleId });
      // return jwtValues;
      returned = jwtValues;
    } else {
      //csrf attack
      returned = 'error';
    }
  });
  return returned;
};

exports.getUserConnected = function (req, res) {
  const dataToken = userController.decryptToken(req, res);
  return dataToken;
};

exports.checkUserData = function (req, res) {
  const dataToken = userController.decryptToken(req, res);
  res.json({ userId: dataToken.userId, roleLevel: dataToken.roleLevel });
}; 
