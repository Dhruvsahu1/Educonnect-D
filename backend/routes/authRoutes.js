const express = require('express');
const router = express.Router();
const { signup, login, refresh, logout, getMe } = require('../controllers/authController');
const { signupValidator, loginValidator } = require('../validators/authValidators');
const { authenticate } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later.',
});

router.post('/signup', authLimiter, signupValidator, signup);
router.post('/login', authLimiter, loginValidator, login);
router.post('/refresh', refresh);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

module.exports = router;

