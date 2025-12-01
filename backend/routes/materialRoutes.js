const express = require('express');
const router = express.Router();
const {
  uploadMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
} = require('../controllers/materialController');
const { uploadMaterialValidator, updateMaterialValidator } = require('../validators/materialValidators');
const { authenticate, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', authenticate, getMaterials);
router.get('/:id', authenticate, getMaterialById);
router.post('/', authenticate, requireRole('admin'), upload.single('file'), uploadMaterialValidator, uploadMaterial);
router.put('/:id', authenticate, requireRole('admin'), updateMaterialValidator, updateMaterial);
router.delete('/:id', authenticate, requireRole('admin'), deleteMaterial);

module.exports = router;

