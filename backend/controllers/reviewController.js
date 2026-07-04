const Review = require('../models/Review');
const { analyzeCode } = require('../services/geminiService');

const createReview = async (req, res, next) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({ error: 'Language and code are required' });
    }

    // Call Gemini API to analyze the code
    const aiAnalysis = await analyzeCode(language, code);

    // Try to save to MongoDB
    let review;
    try {
      review = await Review.create({
        userId: req.user.id,
        language,
        code,
        ...aiAnalysis
      });
      res.status(201).json(review);
    } catch (dbError) {
      console.warn('MongoDB save failed (returning AI result anyway):', dbError.message);
      review = {
        _id: 'no-db-id',
        language,
        code,
        ...aiAnalysis,
        createdAt: new Date().toISOString()
      };
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    const query = { userId: req.user.id };
    
    if (search) {
      query.language = { $regex: search, $options: 'i' };
    }

    const startIndex = (page - 1) * limit;
    const total = await Review.countDocuments(query);

    const history = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      data: history,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, userId: req.user.id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

const deleteHistory = async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const history = await Review.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(7)
      .select('qualityScore bugs securityIssues optimizationSuggestions createdAt');

    // Return reversed so oldest is first, which looks better on a chart X-axis
    const analytics = history.reverse().map((review, index) => ({
      id: review._id,
      name: `Analysis ${index + 1}`,
      createdAt: review.createdAt,
      qualityScore: review.qualityScore || 0,
      bugCount: review.bugs ? review.bugs.length : 0,
      securityCount: review.securityIssues ? review.securityIssues.length : 0,
      optimizationCount: review.optimizationSuggestions ? review.optimizationSuggestions.length : 0,
    }));

    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getHistory,
  getReviewById,
  deleteHistory,
  getAnalytics
};
