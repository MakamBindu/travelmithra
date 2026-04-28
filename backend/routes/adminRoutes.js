const express = require('express');
const router = express.Router();
const { getPendingGuides, approveGuide, rejectGuide, getDashboardStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/guides/pending', protect, admin, getPendingGuides);
router.put('/guides/:id/approve', protect, admin, approveGuide);
router.put('/guides/:id/reject', protect, admin, rejectGuide);

module.exports = router;
