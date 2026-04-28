const express = require('express');
const router = express.Router();
const { addReview, getGuideReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview);
router.get('/guide/:guideId', getGuideReviews); // public route

module.exports = router;
