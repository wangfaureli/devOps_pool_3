const express = require('express');
const router = express();
const userController = require('../controllers/userController');

router.post('/logout', userController.logout);
router.post('/register', userController.registration);
router.post('/login', userController.authentication);

module.exports = router;
