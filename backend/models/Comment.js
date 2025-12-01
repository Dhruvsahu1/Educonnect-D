const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    maxlength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
commentSchema.index({ postId: 1, createdAt: 1 });
commentSchema.index({ parentCommentId: 1 });
commentSchema.index({ authorId: 1 });

module.exports = mongoose.model('Comment', commentSchema);

