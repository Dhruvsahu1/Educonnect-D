const express = require('express');
const router = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
} = require('../controllers/commentController');
const { createCommentValidator } = require('../validators/commentValidators');
const { authenticate } = require('../middleware/auth');

router.get('/:postId', authenticate, getComments);
router.post('/:postId', authenticate, createCommentValidator, createComment);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;

