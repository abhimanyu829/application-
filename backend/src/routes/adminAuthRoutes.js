const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminMe,
  adminLogout,
  createDefaultAdmin,
} = require('../controllers/adminAuthController');
const { adminProtect } = require('../middleware/adminAuth');
const { authLimiter, apiLimiter } = require('../middleware/rateLimits');

// Public routes — strict rate limit on login
router.post('/login', authLimiter, adminLogin);
router.post('/setup', createDefaultAdmin); // Protected by logic in controller

// Protected routes — standard rate limit
router.get('/me', apiLimiter, adminProtect, getAdminMe);
router.post('/logout', apiLimiter, adminProtect, adminLogout);

module.exports = router;