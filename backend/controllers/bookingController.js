const Booking = require('../models/Booking');
const User = require('../models/User');

const createBooking = async (req, res) => {
  try {
    const { guideId, city, date, time, durationHours, numberOfPeople, specialRequest } = req.body;

    const guide = await User.findById(guideId);
    if (!guide || guide.role !== 'guide') {
      return res.status(404).json({ message: 'Guide not found' });
    }

    const totalAmount = guide.pricePerHour * durationHours;

    const booking = await Booking.create({
      customer: req.user._id,
      guide: guideId,
      city,
      date,
      time,
      durationHours,
      numberOfPeople,
      specialRequest,
      totalAmount,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('guide', 'name profilePhoto city phone')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuideBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guide: req.user._id })
      .populate('customer', 'name phone email')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted', 'rejected', 'completed'
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only the assigned guide can update the status
    if (booking.guide.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processMockPayment = async (req, res) => {
  try {
    const { paymentType } = req.body; // 'advance' or 'full'
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to pay for this booking' });
    }

    if (paymentType === 'full') {
      booking.paymentStatus = 'paid';
      booking.advanceAmountPaid = booking.totalAmount;
    } else if (paymentType === 'advance') {
      booking.paymentStatus = 'partial';
      // Assume 20% advance
      booking.advanceAmountPaid = booking.totalAmount * 0.2;
    }

    await booking.save();
    res.json({ message: 'Mock payment successful', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getGuideBookings,
  updateBookingStatus,
  processMockPayment
};
