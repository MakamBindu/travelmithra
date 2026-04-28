const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'guide', 'admin'], 
    default: 'customer' 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },
  // Guide specific fields
  languages: [{ type: String }],
  experience: { type: String },
  knowledgeLevel: { type: String },
  availability: { type: String },
  pricePerHour: { type: Number },
  bio: { type: String },
  availabilityCalendar: [{
    date: { type: Date, required: true },
    slots: [{ type: String }] // e.g., ['09:00', '14:00']
  }],
  profilePhoto: { type: String, default: 'https://via.placeholder.com/150' },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved' // Customers are auto-approved. Guides will explicitly be set to 'pending'
  },
  rejectionReason: { type: String },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
