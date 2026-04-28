const User = require('../models/User');
const Booking = require('../models/Booking');

const getPendingGuides = async (req, res) => {
  try {
    const pendingGuides = await User.find({ role: 'guide', status: 'pending' }).select('-password');
    res.json(pendingGuides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveGuide = async (req, res) => {
  try {
    const guide = await User.findById(req.params.id);
    if (!guide || guide.role !== 'guide') {
      return res.status(404).json({ message: 'Guide not found' });
    }
    guide.status = 'approved';
    await guide.save();
    res.json({ message: 'Guide approved successfully', guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectGuide = async (req, res) => {
  try {
    const { reason } = req.body;
    const guide = await User.findById(req.params.id);
    if (!guide || guide.role !== 'guide') {
      return res.status(404).json({ message: 'Guide not found' });
    }
    guide.status = 'rejected';
    guide.rejectionReason = reason || 'Not meeting requirements';
    await guide.save();
    res.json({ message: 'Guide rejected successfully', guide });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalGuides = await User.countDocuments({ role: 'guide' });
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    const activeBookings = await Booking.countDocuments({ 
      status: { $in: ['accepted', 'completed'] } 
    });

    res.json({
      stats: {
        totalUsers,
        totalGuides,
        totalCustomers,
        totalRevenue: revenueData[0]?.total || 0,
        activeBookings
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingGuides,
  approveGuide,
  rejectGuide,
  getDashboardStats
};
