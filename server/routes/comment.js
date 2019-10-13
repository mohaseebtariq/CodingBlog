const express = require('express');
const router = express.Router();
const isAuthorized = require('../middleware/is-auth')
const commentController = require('../controllers/comment');

router.post('/comment/:postId', isAuthorized, commentController.validateComments, commentController.postComments);

router.get('/:postId/comments', commentController.getComments);

module.exports = router;
