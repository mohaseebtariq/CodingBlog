const express = require('express');
const feedController = require('../controllers/feed');
const isAuthorized = require('../middleware/is-auth')
const router = express.Router();

router.post('/posts', isAuthorized, feedController.validatePost, feedController.createPost);

router.delete('/posts/:postId', isAuthorized, feedController.deleteSinglePost);

router.put('/posts/:postId', isAuthorized, feedController.validatePost, feedController.updateSinglePost)

router.get('/posts', isAuthorized, feedController.getUserPosts);

router.get('/posts/:postId', isAuthorized, feedController.getPostById);

module.exports = router;
