const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  googleAuth,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter, apiLimiter } = require('../middleware/rateLimits');

// Auth routes — strict rate limit on login/register/google
router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/google', authLimiter, googleAuth);

// Protected user routes — standard rate limit
router.get('/me', apiLimiter, protect, getMe);
router.patch('/me', apiLimiter, protect, updateUser);

module.exports = router;
