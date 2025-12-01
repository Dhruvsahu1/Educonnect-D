const express = require('express');
const router = express.Router();
const {
  createCertification,
  getCertifications,
  getCertificationById,
  deleteCertification,
  getAllCertifications,
} = require('../controllers/certificationController');
const { createCertificationValidator } = require('../validators/certificationValidators');
const { authenticate, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', authenticate, getCertifications);
router.get('/:id', authenticate, getCertificationById);
router.post('/', authenticate, upload.single('file'), createCertificationValidator, createCertification);
router.delete('/:id', authenticate, deleteCertification);

// Admin routes
router.get('/admin/all', authenticate, requireRole('admin'), getAllCertifications);

module.exports = router;

