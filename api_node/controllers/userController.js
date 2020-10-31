const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('../utils/jwt.utils');

// Get one user by user_id
exports.getUser = function (req, res) {
  const { user_id } = req.params;

  User.findByPk(user_id).then((user) => {
    res.json(user);
  });
};

exports.updateUser = function (req, res) {
  const { user_id } = req.params;
  const userValues = req.body.user;

  bcrypt.hash(userValues.password, 6, (err, passwordHashed) => {
    userValues.password = passwordHashed;
    console.log(userValues.password);

    User.update(userValues, {
      where: {
        id: user_id,
      },
    }).then((user) => {
      res.json({ message: 'User edited' });
    });
  });
};

// Authenticate user
exports.authentication = function (req, res) {
  const username = req.body.user.username;
  const password = req.body.user.password;
  // const email = req.body.user.email;

  // check empty field
  if (username == null || password == null) {
    res.status(400).json({ error: 'missing fields' });
  }

  User.findOne({
    where: { username: username },
  })
    .then((userFound) => {
      if (userFound) {
        bcrypt.compare(password, userFound.password, (errBcrypt, resBcrypt) => {
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
            res.status(500).json({ error: 'fail password' });
          }
        });
      } else {
        res.status(500).json({ error: 'user not exist in db' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'unable to verify user' });
    });
};

// Registration user
exports.registration = function (req, res) {
  const username = req.body.user.username;
  const password = req.body.user.password;
  const email = req.body.user.email;
  const firstname = req.body.user.firstname;
  const lastname = req.body.user.lastname;
  const birthday = req.body.user.birthday;
  const roleId = req.body.user.roleId;

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
      bcrypt.hash(password, 6, (err, passwordHashed) => {
        const newUser = User.create({
          username: username,
          password: passwordHashed,
          email: email,
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          roleId: roleId,
        })
          .then((newUser) => {
            res.status(201).json({ userCreated: newUser });
          })
          .catch((err) => {
            res.status(500).json({ error: "can't add user" });
          });
      });
    } else {
      res.status(409).json({ error: 'user already exist in db' });
    }
  });
};

// Log out user
exports.logout = function (req, res) {
  res.clearCookie('jwt_token');
  res.clearCookie('csrf_token');
  res.json({message: 'User disconnected'});

};

// Delete a user
exports.deleteUser = function (req, res) {
  const userId = req.params.user_id;

  const deleteUser = User.destroy({
    where: {
      id: userId,
    },
  }).then((user) => {
    res.json({ message: 'user deleted' });
  });
};

// Get all users
exports.getUserList = function (req, res) {
  const username = req.query.username;
  const email = req.query.email;

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
    User.findAll().then((users) => {
      res.json(users);
    });
  }
};

verifyToken = function (req, res) {
  //get xsrf token
  const csrfToken = req.cookies.csrf_token;
  //get jwt cookie
  const jwtToken = req.cookies.jwt_token;

  if (!jwtToken) {
    res.sendStatus(401);
  }

  //check jwt
  jsonwebtoken.verify(jwtToken, csrfToken, function (err, jwtValues) {

    if (jwtValues.csrfToken == csrfToken) {
      // allright
      console.log('true');
      return true;
    } else {
      //csrf attack
      console.log('false');
      return false;
    }
  });
};
