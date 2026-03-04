const express = require('express');
const router = express.Router();
const {
  createApplicant,
  getMyApplicant,
  getApplicants,
  updateApplicantStatus,
} = require('../controllers/applicantController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.post('/', protect, createApplicant);
router.get('/my', protect, getMyApplicant);
router.get('/', protect, admin, getApplicants);
router.patch('/:id/status', protect, admin, updateApplicantStatus);

module.exports = router;
