const express = require('express');
const router = express();
const user = require('../controllers/userController');

router.post('/logout', user.logout);
router.post('/register', user.create);
router.post('/login', user.login);
router.post('/check-token', user.checkUserData);

module.exports = router;
