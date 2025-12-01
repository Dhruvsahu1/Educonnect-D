const express = require('express');
const router = express.Router();
const {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
  getUsers,
  deleteUser,
} = require('../controllers/adminController');
const { createCollegeValidator, updateCollegeValidator } = require('../validators/adminValidators');
const { authenticate, requireRole } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireRole('admin'));

router.post('/colleges', createCollegeValidator, createCollege);
router.get('/colleges', getColleges);
router.get('/colleges/:id', getCollegeById);
router.put('/colleges/:id', updateCollegeValidator, updateCollege);
router.delete('/colleges/:id', deleteCollege);

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;

