const express = require('express');
const router = express.Router();
const { getMessagesByBooking } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:bookingId', protect, getMessagesByBooking);

module.exports = router;
