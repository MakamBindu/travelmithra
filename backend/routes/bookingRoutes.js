const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getCustomerBookings, 
  getGuideBookings, 
  updateBookingStatus, 
  processMockPayment 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/customer', protect, getCustomerBookings);
router.get('/guide', protect, getGuideBookings);
router.put('/:id/status', protect, updateBookingStatus);
router.post('/:id/pay', protect, processMockPayment);

module.exports = router;
