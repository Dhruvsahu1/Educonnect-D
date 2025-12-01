const Certification = require('../models/Certification');
const Post = require('../models/Post');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { uploadToS3, deleteFromS3 } = require('../config/s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const createCertification = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, organization, issueDate, credentialUrl, description } = req.body;
    let fileUrl = null;

    // Handle file upload if present
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      const key = `certifications/${uuidv4()}${fileExtension}`;
      fileUrl = await uploadToS3(req.file, key);
    }

    // Create certification
    const certification = await Certification.create({
      userId: req.user._id,
      title,
      organization,
      issueDate,
      credentialUrl: credentialUrl || null,
      fileUrl,
      description: description || '',
    });

    // Create associated post
    const post = await Post.create({
      authorId: req.user._id,
      content: `Earned certification: ${title} from ${organization}`,
      type: 'certification',
    });

    // Link post to certification
    certification.postId = post._id;
    await certification.save();

    await certification.populate('userId', 'name email profilePictureUrl collegeName');
    await post.populate('authorId', 'name email profilePictureUrl collegeName');

    res.status(201).json({
      success: true,
      certification,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const getCertifications = async (req, res, next) => {
  try {
    const userId = req.query.userId || req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = { userId };

    const certifications = await Certification.find(query)
      .populate('userId', 'name email profilePictureUrl collegeName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Certification.countDocuments(query);

    res.json({
      success: true,
      certifications,
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

const getCertificationById = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id)
      .populate('userId', 'name email profilePictureUrl collegeName');

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    res.json({
      success: true,
      certification,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);

    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    // Check if user is owner or admin
    if (certification.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete associated post
    if (certification.postId) {
      await Post.findByIdAndDelete(certification.postId);
    }

    // Delete file from S3 if exists
    if (certification.fileUrl) {
      const key = certification.fileUrl.split('.com/')[1];
      if (key) {
        try {
          await deleteFromS3(key);
        } catch (s3Error) {
          console.error('Failed to delete file from S3:', s3Error);
        }
      }
    }

    await Certification.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Admin endpoint to get all certifications
const getAllCertifications = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const college = req.query.college;

    let query = {};

    // Filter by college if specified
    if (college) {
      const users = await User.find({ collegeName: college }).select('_id');
      const userIds = users.map(u => u._id);
      query.userId = { $in: userIds };
    }

    const certifications = await Certification.find(query)
      .populate('userId', 'name email profilePictureUrl collegeName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Certification.countDocuments(query);

    res.json({
      success: true,
      certifications,
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

module.exports = {
  createCertification,
  getCertifications,
  getCertificationById,
  deleteCertification,
  getAllCertifications,
};

