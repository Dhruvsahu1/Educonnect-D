const Post = require('../models/Post');
const Certification = require('../models/Certification');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { uploadToS3 } = require('../config/s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, type } = req.body;
    let imageUrl = null;

    // Handle image upload if present
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      const key = `posts/${uuidv4()}${fileExtension}`;
      imageUrl = await uploadToS3(req.file, key);
    }

    const post = await Post.create({
      authorId: req.user._id,
      content,
      imageUrl,
      type: type || 'post',
    });

    await post.populate('authorId', 'name email profilePictureUrl collegeName');

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const college = req.query.college;

    let query = {};
    
    // Filter by college if specified
    if (college) {
      const users = await User.find({ collegeName: college }).select('_id');
      const userIds = users.map(u => u._id);
      query.authorId = { $in: userIds };
    }

    const posts = await Post.find(query)
      .populate('authorId', 'name email profilePictureUrl collegeName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('authorId', 'name email profilePictureUrl collegeName');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      success: true,
      isLiked: !isLiked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete associated certification if exists
    if (post.type === 'certification') {
      await Certification.findOneAndDelete({ postId: post._id });
    }

    // Delete image from S3 if exists
    if (post.imageUrl) {
      const { deleteFromS3 } = require('../config/s3');
      const key = post.imageUrl.split('.com/')[1];
      if (key) {
        try {
          await deleteFromS3(key);
        } catch (s3Error) {
          console.error('Failed to delete image from S3:', s3Error);
        }
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  deletePost,
};

