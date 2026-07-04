const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  bugs: {
    type: Array,
    default: [],
  },
  qualityScore: {
    type: Number,
    default: 0,
  },
  timeComplexity: {
    type: String,
    default: 'O(1)',
  },
  spaceComplexity: {
    type: String,
    default: 'O(1)',
  },
  optimizationSuggestions: {
    type: Array,
    default: [],
  },
  securityIssues: {
    type: Array,
    default: [],
  },
  refactoredCode: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Review', reviewSchema, 'code_reviews');
