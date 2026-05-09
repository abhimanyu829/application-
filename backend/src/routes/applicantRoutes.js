const express = require('express');
const router = express.Router();
const {
  createApplicant,
  getMyApplicant,
  getApplicants,
  updateApplicantStatus,
  validateApplicant,
} = require('../controllers/applicantController');
const { protect } = require('../middleware/auth');
const { adminProtect } = require('../middleware/adminAuth');
const { apiLimiter } = require('../middleware/rateLimits');

// All routes get standard API rate limit
router.post('/', apiLimiter, protect, validateApplicant, createApplicant);
router.get('/my', apiLimiter, protect, getMyApplicant);

// Admin routes
router.get('/', apiLimiter, adminProtect, getApplicants);           // supports ?page&limit&status
router.patch('/:id/status', apiLimiter, adminProtect, updateApplicantStatus);

module.exports = router;
