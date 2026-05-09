const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Applicant = require('../models/Applicant');
const cache = require('../utils/cache');

const CACHE_TTL = 2 * 60; // 2 minutes

// Validation rules for creating an applicant
const validateApplicant = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('university').trim().notEmpty().withMessage('University is required'),
  body('branch').trim().notEmpty().withMessage('Branch is required'),
  body('roll_number').trim().notEmpty().withMessage('Roll number is required'),
  body('age')
    .isInt({ min: 16, max: 60 })
    .withMessage('Age must be a valid number between 16 and 60'),
  body('primary_skill').trim().notEmpty().withMessage('Primary skill is required'),
  body('experience_level').trim().notEmpty().withMessage('Experience level is required'),
  body('why_join').trim().isLength({ min: 20 }).withMessage('Why join must be at least 20 characters'),
  body('ambition').trim().isLength({ min: 20 }).withMessage('Ambition must be at least 20 characters'),
  body('contribution').trim().isLength({ min: 20 }).withMessage('Contribution must be at least 20 characters'),
];

// @desc    Create new applicant
// @route   POST /api/applicants
// @access  Private
const createApplicant = asyncHandler(async (req, res) => {
  // Check express-validator results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array().map((e) => e.msg).join('; '));
  }

  const {
    name, email, university, branch, roll_number, age,
    linkedin, github, primary_skill, tech_stack,
    experience_level, why_join, ambition, contribution, photoId,
  } = req.body;

  const applicant = await Applicant.create({
    user_id: req.user.id,
    name, email, university, branch, roll_number, age,
    linkedin, github, primary_skill, tech_stack,
    experience_level, why_join, ambition, contribution, photoId,
  });

  // Invalidate admin applicant cache
  await cache.flush('applicants:*');

  res.status(201).json(applicant);
});

// @desc    Get current user's applicant(s)
// @route   GET /api/applicants/my
// @access  Private
const getMyApplicant = asyncHandler(async (req, res) => {
  const cacheKey = `applicants:user:${req.user.id}`;
  const cached = await cache.get(cacheKey);
  if (cached) return res.status(200).json(cached);

  const applicants = await Applicant.find({ user_id: req.user.id });
  await cache.set(cacheKey, applicants, CACHE_TTL);
  res.status(200).json(applicants);
});

// @desc    Get all applicants (paginated)
// @route   GET /api/applicants?page=1&limit=20&status=pending
// @access  Private/Admin
const getApplicants = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const skip = (page - 1) * limit;
  const { status } = req.query;

  const cacheKey = `applicants:list:p${page}:l${limit}:s${status || 'all'}`;
  const cached = await cache.get(cacheKey);
  if (cached) return res.status(200).json(cached);

  const query = {};
  if (status) query.status = status;

  const [applicants, total] = await Promise.all([
    Applicant.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Applicant.countDocuments(query),
  ]);

  const result = {
    applicants,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };

  await cache.set(cacheKey, result, CACHE_TTL);
  res.status(200).json(result);
});

// @desc    Update applicant status
// @route   PATCH /api/applicants/:id/status
// @access  Private/Admin
const updateApplicantStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'approved', 'rejected'];

  if (!status || !allowed.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${allowed.join(', ')}`);
  }

  const applicant = await Applicant.findById(req.params.id);

  if (!applicant) {
    res.status(404);
    throw new Error('Applicant not found');
  }

  applicant.status = status;
  await applicant.save();

  // Invalidate all applicant cache entries
  await cache.flush('applicants:*');

  res.status(200).json(applicant);
});

module.exports = {
  createApplicant,
  getMyApplicant,
  getApplicants,
  updateApplicantStatus,
  validateApplicant,
};
