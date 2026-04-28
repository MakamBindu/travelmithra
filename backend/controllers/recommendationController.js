const Place = require('../models/Place');
const User = require('../models/User');

const getRecommendations = async (req, res) => {
  try {
    const cityQuery = req.query.city || 'Paris';
    const city = cityQuery.charAt(0).toUpperCase() + cityQuery.slice(1).toLowerCase();

    // Fetch all places for the city
    const allPlaces = await Place.find({ city: new RegExp(city, 'i') });

    // Group places by category
    const grouped = {
      places: allPlaces.filter(p => p.category === 'attractions'),
      hotels: allPlaces.filter(p => p.category === 'hotels'),
      restaurants: allPlaces.filter(p => p.category === 'restaurants'),
      hostels: allPlaces.filter(p => p.category === 'hostels'),
    };

    // Fetch approved guides for the city
    const guides = await User.find({ 
      role: 'guide', 
      status: 'approved',
      city: new RegExp(city, 'i')
    }).select('-password');

    res.json({
      ...grouped,
      guides,
      activityPool: grouped.places // Simplified for now, can be expanded later
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecommendations };
