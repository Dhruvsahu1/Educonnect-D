const Material = require('../models/Material');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { uploadToS3, deleteFromS3 } = require('../config/s3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadMaterial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const { title, description, collegeName } = req.body;

    // Determine file type
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    let fileType = 'other';
    if (['.pdf'].includes(fileExtension)) fileType = 'pdf';
    else if (['.pptx'].includes(fileExtension)) fileType = 'pptx';
    else if (['.docx', '.doc'].includes(fileExtension)) fileType = 'docx';
    else if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) fileType = 'image';

    // Upload to S3
    const key = `materials/${collegeName}/${uuidv4()}${fileExtension}`;
    const fileUrl = await uploadToS3(req.file, key);

    const material = await Material.create({
      uploadedByAdminId: req.user._id,
      collegeName,
      title,
      description: description || '',
      fileUrl,
      fileType,
      fileSize: req.file.size,
    });

    await material.populate('uploadedByAdminId', 'name email');

    res.status(201).json({
      success: true,
      material,
    });
  } catch (error) {
    next(error);
  }
};

const getMaterials = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const college = req.query.college;

    let query = {};

    // Students can only see materials from their college
    if (req.user.role === 'student') {
      query.collegeName = req.user.collegeName;
    } else if (college) {
      query.collegeName = college;
    }

    const materials = await Material.find(query)
      .populate('uploadedByAdminId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Material.countDocuments(query);

    res.json({
      success: true,
      materials,
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

const getMaterialById = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate('uploadedByAdminId', 'name email');

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Check access: students can only access materials from their college
    if (req.user.role === 'student' && material.collegeName !== req.user.collegeName) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      success: true,
      material,
    });
  } catch (error) {
    next(error);
  }
};

const updateMaterial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Check if user is the uploader or admin
    if (material.uploadedByAdminId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, description } = req.body;

    material.title = title || material.title;
    material.description = description !== undefined ? description : material.description;

    await material.save();

    res.json({
      success: true,
      material,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    // Check if user is the uploader or admin
    if (material.uploadedByAdminId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Delete file from S3
    const key = material.fileUrl.split('.com/')[1];
    if (key) {
      try {
        await deleteFromS3(key);
      } catch (s3Error) {
        console.error('Failed to delete file from S3:', s3Error);
      }
    }

    await Material.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Material deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};

