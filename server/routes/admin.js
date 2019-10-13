const express = require('express');
const adminController = require('../controllers/post');
const isAuthorized = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const router = express.Router();

router.get('/posts', isAuthorized, isAdmin, adminController.getAllPosts);

router.get('/users', isAuthorized, isAdmin, adminController.getUsers );

router.patch('/users/:userId', isAuthorized, isAdmin, adminController.updateUserRole);

router.delete('/posts/:userId', isAuthorized, isAdmin ,adminController.deleteAllPosts);

module.exports = router;
