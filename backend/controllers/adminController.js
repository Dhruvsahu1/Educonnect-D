const College = require('../models/College');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const createCollege = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, contactEmail, website } = req.body;

    const college = await College.create({
      name,
      address,
      contactEmail,
      website,
      createdByAdminId: req.user._id,
    });

    res.status(201).json({
      success: true,
      college,
    });
  } catch (error) {
    next(error);
  }
};

const getColleges = async (req, res, next) => {
  try {
    const colleges = await College.find()
      .populate('createdByAdminId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      colleges,
    });
  } catch (error) {
    next(error);
  }
};

const getCollegeById = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id)
      .populate('createdByAdminId', 'name email');

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json({
      success: true,
      college,
    });
  } catch (error) {
    next(error);
  }
};

const updateCollege = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    const { name, address, contactEmail, website } = req.body;

    college.name = name || college.name;
    college.address = address !== undefined ? address : college.address;
    college.contactEmail = contactEmail !== undefined ? contactEmail : college.contactEmail;
    college.website = website !== undefined ? website : college.website;

    await college.save();

    res.json({
      success: true,
      college,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCollege = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    await College.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'College deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const role = req.query.role;
    const college = req.query.college;

    let query = {};

    if (role) {
      query.role = role;
    }

    if (college) {
      query.collegeName = college;
    }

    const users = await User.find(query)
      .select('-passwordHash -refreshTokens')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
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

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
  getUsers,
  deleteUser,
};

