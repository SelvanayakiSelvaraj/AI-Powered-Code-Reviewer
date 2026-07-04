const express = require('express');
const router = express.Router();
const { createReview, getHistory, getReviewById, deleteHistory, getAnalytics } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

// Define API routes
router.post('/review', protect, createReview);
router.post('/security-check', createReview); // Maps to the same generic review for simplicity based on prompt
router.post('/refactor', createReview); // Maps to the same generic review
router.get('/history', protect, getHistory);
router.get('/analytics', protect, getAnalytics);
router.get('/review/:id', protect, getReviewById);
router.delete('/history/:id', protect, deleteHistory);

module.exports = router;
