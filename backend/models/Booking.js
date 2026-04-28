const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  durationHours: { type: Number, required: true },
  numberOfPeople: { type: Number, required: true },
  specialRequest: { type: String },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending'
  },
  advanceAmountPaid: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
