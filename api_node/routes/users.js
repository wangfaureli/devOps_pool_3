const express = require('express');
const router = express();
const userController = require('../controllers/userController');

router.get('/', userController.getUserList);
router.get('/:user_id', userController.getUser);
router.put('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
