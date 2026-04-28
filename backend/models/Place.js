const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['attractions', 'hotels', 'hostels', 'restaurants'],
    required: true 
  },
  type: { type: String }, // e.g., 'Historical', 'Luxury', 'Fine Dining'
  rating: { type: Number, default: 4.5 },
  price: { type: String }, // Display price e.g., '₹2,500'
  priceNum: { type: Number }, // Numeric price for filtering
  timings: { type: String },
  location: { type: String },
  image: { type: String, required: true },
  description: { type: String, required: true },
  moreInfo: { type: String },
  amenities: [{ type: String }],
  isVeg: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Place', placeSchema);
