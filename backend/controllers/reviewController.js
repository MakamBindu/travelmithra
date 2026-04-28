const Review = require('../models/Review');
const Booking = require('../models/Booking');

const addReview = async (req, res) => {
  try {
    const { guideId, bookingId, rating, comment } = req.body;

    // Check if booking is completed
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already submitted for this booking' });
    }

    const review = await Review.create({
      guide: guideId,
      customer: req.user._id,
      booking: bookingId,
      rating: Number(rating),
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuideReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ guide: req.params.guideId })
      .populate('customer', 'name profilePhoto')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlaceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ place: req.params.placeId })
      .populate('customer', 'name profilePhoto')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getGuideReviews, getPlaceReviews };
