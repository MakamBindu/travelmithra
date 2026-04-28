const User = require('../models/User');

const getGuides = async (req, res) => {
  try {
    const { city } = req.query;
    
    let query = { role: 'guide', status: 'approved' };
    
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }

    const guides = await User.find(query).select('-password');
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuideById = async (req, res) => {
  try {
    const guide = await User.findOne({ 
      _id: req.params.id, 
      role: 'guide', 
      status: 'approved' 
    }).select('-password');

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { calendar } = req.body; // Expecting array of {date, slots}
    const guide = await User.findById(req.user._id);
    
    if (!guide || guide.role !== 'guide') {
      return res.status(403).json({ message: 'Not authorized as a guide' });
    }

    guide.availabilityCalendar = calendar;
    await guide.save();
    
    res.json({ message: 'Availability updated successfully', calendar: guide.availabilityCalendar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGuides,
  getGuideById,
  updateAvailability
};
