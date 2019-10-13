const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.validateUser, userController.registerUser);

router.post('/login', userController.validateLoginUser, userController.authenticateUser);

module.exports = router;
