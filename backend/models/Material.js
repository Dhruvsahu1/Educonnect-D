const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  uploadedByAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collegeName: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Material title is required'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: 2000,
    default: '',
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'pptx', 'docx', 'image', 'other'],
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  visibility: {
    type: String,
    enum: ['college'],
    default: 'college',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
materialSchema.index({ collegeName: 1, createdAt: -1 });
materialSchema.index({ uploadedByAdminId: 1 });
materialSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Material', materialSchema);

