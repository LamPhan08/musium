const express = require("express");
const Comment = require('../controllers/commentController');

const router = express.Router();

router.post('/postComment', Comment.postComment);

router.delete('/deleteComment', Comment.deleteComment);

router.get('/getSongComments', Comment.getSongComments);

router.post('/likeComment', Comment.likeComment);

router.delete('/unLikeComment', Comment.unLikeComment);

module.exports = router;
