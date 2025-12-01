const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  deletePost,
} = require('../controllers/postController');
const { createPostValidator } = require('../validators/postValidators');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', authenticate, getPosts);
router.get('/:id', authenticate, getPostById);
router.post('/', authenticate, upload.single('image'), createPostValidator, createPost);
router.post('/:id/like', authenticate, toggleLike);
router.delete('/:id', authenticate, deletePost);

module.exports = router;

