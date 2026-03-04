const asyncHandler = require('express-async-handler');
const Applicant = require('../models/Applicant');

// @desc    Create new applicant
// @route   POST /api/applicants
// @access  Private
const createApplicant = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    university,
    branch,
    roll_number,
    age,
    linkedin,
    github,
    primary_skill,
    tech_stack,
    experience_level,
    why_join,
    ambition,
    contribution,
    photoId,
  } = req.body;

  if (!name || !email || !university || !branch || !roll_number || !age || !primary_skill || !experience_level || !why_join || !ambition || !contribution) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const applicant = await Applicant.create({
    user_id: req.user.id,
    name,
    email,
    university,
    branch,
    roll_number,
    age,
    linkedin,
    github,
    primary_skill,
    tech_stack,
    experience_level,
    why_join,
    ambition,
    contribution,
    photoId,
  });

  res.status(201).json(applicant);
});

// @desc    Get current user's applicant(s)
// @route   GET /api/applicants/my
// @access  Private
const getMyApplicant = asyncHandler(async (req, res) => {
  const applicants = await Applicant.find({ user_id: req.user.id });
  res.status(200).json(applicants);
});

// @desc    Get all applicants
// @route   GET /api/applicants
// @access  Private/Admin
const getApplicants = asyncHandler(async (req, res) => {
  const applicants = await Applicant.find({});
  res.status(200).json(applicants);
});

// @desc    Update applicant status
// @route   PATCH /api/applicants/:id/status
// @access  Private/Admin
const updateApplicantStatus = asyncHandler(async (req, res) => {
  const applicant = await Applicant.findById(req.params.id);

  if (!applicant) {
    res.status(404);
    throw new Error('Applicant not found');
  }

  applicant.status = req.body.status;
  await applicant.save();

  res.status(200).json(applicant);
});

module.exports = {
  createApplicant,
  getMyApplicant,
  getApplicants,
  updateApplicantStatus,
};
