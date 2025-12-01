const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Certification title is required'],
    trim: true,
  },
  organization: {
    type: String,
    required: [true, 'Issuing organization is required'],
    trim: true,
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required'],
  },
  credentialUrl: {
    type: String,
    trim: true,
    default: null,
  },
  fileUrl: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    maxlength: 1000,
    default: '',
  },
  visibility: {
    type: String,
    enum: ['college', 'public'],
    default: 'college',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
certificationSchema.index({ userId: 1, createdAt: -1 });
certificationSchema.index({ visibility: 1 });
certificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Certification', certificationSchema);

