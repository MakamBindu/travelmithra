const express = require('express');
const router = express.Router();
const { getGuides, getGuideById, updateAvailability } = require('../controllers/guideController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getGuides);
router.get('/:id', getGuideById);
router.post('/update-availability', protect, updateAvailability);

module.exports = router;
