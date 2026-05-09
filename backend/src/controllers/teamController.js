const asyncHandler = require('express-async-handler');
const TeamMember = require('../models/TeamMember');
const cache = require('../utils/cache');

// Cache key helpers
const CACHE_KEY_ALL = 'team:members:all';
const cacheKey = (status) => status ? `team:members:status:${status}` : CACHE_KEY_ALL;
const CACHE_TTL = 5 * 60; // 5 minutes

// Normalize avatar: strip localhost/127.0.0.1 URLs, keep only relative paths
const normalizeAvatar = (url) => {
  if (!url) return url;
  // If it's already a relative path, return as-is
  if (url.startsWith('/')) return url;
  // If it's a localhost URL, extract just the path
  try {
    const parsed = new URL(url);
    if (['localhost', '127.0.0.1'].includes(parsed.hostname)) {
      return parsed.pathname; // e.g. /uploads/team/image.webp
    }
  } catch {
    // Not a valid URL — return as-is (could be a Gravatar/external URL)
  }
  return url;
};

// @desc    Add new team member
// @route   POST /api/team/add-member
// @access  Private (Admin)
const addMember = asyncHandler(async (req, res) => {
  const { name, department, role, profileImage, linkedin, github, email, status } = req.body;

  if (!name || !department || !role) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const member = await TeamMember.create({
    name,
    department,
    role,
    avatar: normalizeAvatar(profileImage),
    linkedin,
    github,
    email,
    status: status || 'approved',
  });

  // Invalidate all team cache entries
  await cache.flush('team:*');

  res.status(201).json(member);
});

// @desc    Get all team members
// @route   GET /api/team/members
// @access  Public
const getMembers = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const key = cacheKey(status);

  // Try Redis cache first
  const cached = await cache.get(key);
  if (cached) {
    return res.status(200).json(cached);
  }

  const query = {};
  if (status) query.status = status;

  const members = await TeamMember.find(query).sort({ createdAt: -1 });

  // Store in Redis for next request
  await cache.set(key, members, CACHE_TTL);

  res.status(200).json(members);
});

// @desc    Approve team member
// @route   PATCH /api/team/:id/approve
// @access  Private (Admin)
const approveMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Team member not found');
  }

  member.status = 'approved';
  await member.save();

  await cache.flush('team:*');
  res.status(200).json(member);
});

// @desc    Reject team member
// @route   PATCH /api/team/:id/reject
// @access  Private (Admin)
const rejectMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Team member not found');
  }

  member.status = 'rejected';
  await member.save();

  await cache.flush('team:*');
  res.status(200).json(member);
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
const updateMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Team member not found');
  }

  // Normalize avatar if being updated
  if (req.body.avatar) {
    req.body.avatar = normalizeAvatar(req.body.avatar);
  }
  if (req.body.profileImage) {
    req.body.avatar = normalizeAvatar(req.body.profileImage);
    delete req.body.profileImage;
  }

  const updatedMember = await TeamMember.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  await cache.flush('team:*');
  res.status(200).json(updatedMember);
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
const deleteMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    res.status(404);
    throw new Error('Team member not found');
  }

  await member.deleteOne();

  await cache.flush('team:*');

  // Emit socket event if io is available
  const io = req.app.get('io');
  if (io) {
    io.emit('team_update', { action: 'delete', id: req.params.id });
  }

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
  approveMember,
  rejectMember,
};
