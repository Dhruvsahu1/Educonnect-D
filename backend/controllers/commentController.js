const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { validationResult } = require('express-validator');

const createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, parentCommentId } = req.body;
    const postId = req.params.postId;

    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create({
      postId,
      authorId: req.user._id,
      content,
      parentCommentId: parentCommentId || null,
    });

    await comment.populate('authorId', 'name email profilePictureUrl');
    if (parentCommentId) {
      await comment.populate('parentCommentId', 'authorId content');
    }

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Get all comments for the post
    const comments = await Comment.find({ postId })
      .populate('authorId', 'name email profilePictureUrl')
      .sort({ createdAt: 1 });

    // Build nested structure
    const commentMap = new Map();
    const rootComments = [];

    // First pass: create map of all comments
    comments.forEach(comment => {
      const commentObj = comment.toObject();
      commentObj.replies = [];
      commentMap.set(comment._id.toString(), commentObj);
    });

    // Second pass: build tree structure
    comments.forEach(comment => {
      const commentObj = commentMap.get(comment._id.toString());
      if (comment.parentCommentId) {
        const parent = commentMap.get(comment.parentCommentId.toString());
        if (parent) {
          parent.replies.push(commentObj);
        }
      } else {
        rootComments.push(commentObj);
      }
    });

    res.json({
      success: true,
      comments: rootComments,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user is author or admin
    if (comment.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete comment and all its replies recursively
    const deleteCommentAndReplies = async (commentId) => {
      const replies = await Comment.find({ parentCommentId: commentId });
      for (const reply of replies) {
        await deleteCommentAndReplies(reply._id);
      }
      await Comment.findByIdAndDelete(commentId);
    };

    await deleteCommentAndReplies(req.params.id);

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getComments,
  deleteComment,
};

