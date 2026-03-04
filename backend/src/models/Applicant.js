const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    university: {
      type: String,
      required: [true, 'Please add a university'],
    },
    branch: {
      type: String,
      required: [true, 'Please add a branch'],
    },
    roll_number: {
      type: String,
      required: [true, 'Please add a roll number'],
    },
    age: {
      type: Number,
      required: [true, 'Please add age'],
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    primary_skill: {
      type: String,
      required: [true, 'Please add a primary skill'],
    },
    tech_stack: {
      type: [String],
      default: [],
    },
    experience_level: {
      type: String,
      required: [true, 'Please add experience level'],
    },
    why_join: {
      type: String,
      required: [true, 'Please tell us why you want to join'],
    },
    ambition: {
      type: String,
      required: [true, 'Please share your ambition'],
    },
    contribution: {
      type: String,
      required: [true, 'Please tell us about your contribution'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    photoId: {
      type: String,
      // For now, storing just an ID string if frontend sends it, 
      // or URL if we change strategy. 
      // Since Appwrite storage is gone, you might need a new storage solution 
      // or just store URLs if using cloud storage.
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Applicant', applicantSchema);
