const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const places = [
  // PARIS
  {
    name: 'Eiffel Tower',
    city: 'Paris',
    category: 'attractions',
    type: 'Historical',
    rating: 4.8,
    price: '₹2,500',
    priceNum: 2500,
    timings: '09:00 AM - 12:00 AM',
    location: 'Champ de Mars',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic iron lattice tower.',
    moreInfo: 'Built in 1889, most-visited paid monument.'
  },
  {
    name: 'Louvre Museum',
    city: 'Paris',
    category: 'attractions',
    type: 'Museums',
    rating: 4.9,
    price: '₹1,500',
    priceNum: 1500,
    timings: '09:00 AM - 06:00 PM',
    location: 'Rue de Rivoli',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
    description: 'World\'s largest art museum.',
    moreInfo: 'Home to the Mona Lisa.'
  },
  {
    name: 'Hotel Ritz Paris',
    city: 'Paris',
    category: 'hotels',
    type: 'Luxury',
    rating: 4.9,
    price: '₹40,000',
    priceNum: 40000,
    amenities: ['WiFi', 'Pool', 'AC'],
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary luxury hotel.'
  },
  {
    name: 'Le Jules Verne',
    city: 'Paris',
    category: 'restaurants',
    type: 'Fine Dining',
    rating: 4.8,
    price: '₹15,000',
    priceNum: 15000,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    description: 'Fine dining in the Eiffel Tower.'
  },
  
  // TOKYO
  {
    name: 'Shibuya Crossing',
    city: 'Tokyo',
    category: 'attractions',
    type: 'Shopping',
    rating: 4.8,
    price: 'Free',
    priceNum: 0,
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
    description: 'Busiest pedestrian crossing.'
  },
  {
    name: 'Park Hyatt Tokyo',
    city: 'Tokyo',
    category: 'hotels',
    type: 'Luxury',
    rating: 4.9,
    price: '₹60,000',
    priceNum: 60000,
    amenities: ['WiFi', 'Pool', 'AC'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury skyscraper hotel.'
  },
  {
    name: 'Ichiran Ramen',
    city: 'Tokyo',
    category: 'restaurants',
    type: 'Japanese',
    rating: 4.7,
    price: '₹1,500',
    priceNum: 1500,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    description: 'Famous tonkotsu ramen chain.'
  }
];

const seedData = async () => {
  try {
    await Place.deleteMany();
    await Place.insertMany(places);
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error Seeding Data:', error);
    process.exit(1);
  }
};

seedData();
