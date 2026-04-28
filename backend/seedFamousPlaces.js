const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');
const connectDB = require('./config/db');

dotenv.config();

const famousPlaces = [
  // --- PARIS ---
  {
    name: "Eiffel Tower",
    city: "Paris",
    category: "attractions",
    type: "Historical",
    rating: 4.8,
    price: "₹2,500",
    priceNum: 2500,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800",
    description: "Iconic wrought-iron spire and global symbol of France, offering breathtaking panoramic views of Paris.",
    moreInfo: "Designed by Gustave Eiffel for the 1889 World's Fair. It is 330 meters tall.",
    location: "Champ de Mars, 5 Ave Anatole France",
    timings: "09:30 AM - 11:45 PM"
  },
  {
    name: "Louvre Museum",
    city: "Paris",
    category: "attractions",
    type: "Museums",
    rating: 4.9,
    price: "₹1,500",
    priceNum: 1500,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
    description: "The world's largest art museum and a historic monument in Paris, home to the Mona Lisa.",
    moreInfo: "Contains more than 380,000 objects and displays 35,000 works of art.",
    location: "Rue de Rivoli",
    timings: "09:00 AM - 06:00 PM (Closed Tuesdays)"
  },
  {
    name: "Le Meurice",
    city: "Paris",
    category: "hotels",
    type: "Luxury",
    rating: 4.9,
    price: "₹45,000",
    priceNum: 45000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    description: "A luxurious 5-star hotel in central Paris with opulent rooms, a spa, and fine dining.",
    location: "228 Rue de Rivoli",
  },
  {
    name: "Le Jules Verne",
    city: "Paris",
    category: "restaurants",
    type: "Fine Dining",
    rating: 4.7,
    price: "₹15,000",
    priceNum: 15000,
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800",
    description: "Michelin-starred dining on the second floor of the Eiffel Tower.",
    location: "Eiffel Tower, 2nd Floor",
  },

  // --- NEW YORK ---
  {
    name: "Statue of Liberty",
    city: "New York",
    category: "attractions",
    type: "Historical",
    rating: 4.8,
    price: "₹2,000",
    priceNum: 2000,
    image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&q=80&w=800",
    description: "Colossal neoclassical sculpture on Liberty Island in New York Harbor, a symbol of freedom.",
    moreInfo: "A gift from the people of France to the United States.",
    location: "Liberty Island, New York",
    timings: "09:00 AM - 05:00 PM"
  },
  {
    name: "Central Park",
    city: "New York",
    category: "attractions",
    type: "Nature",
    rating: 4.9,
    price: "Free",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1554316279-9fbba46ec028?auto=format&fit=crop&q=80&w=800",
    description: "An urban park in Manhattan, New York City, featuring walking paths, lakes, and a zoo.",
    location: "Manhattan, New York",
    timings: "06:00 AM - 01:00 AM"
  },
  {
    name: "The Plaza Hotel",
    city: "New York",
    category: "hotels",
    type: "Luxury",
    rating: 4.7,
    price: "₹50,000",
    priceNum: 50000,
    image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800",
    description: "Iconic luxury hotel offering upscale dining and elegant rooms overlooking Central Park.",
    location: "768 5th Ave, New York",
  },
  {
    name: "Katz's Delicatessen",
    city: "New York",
    category: "restaurants",
    type: "Fast Food",
    rating: 4.8,
    price: "₹1,800",
    priceNum: 1800,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    description: "Legendary kosher-style deli known for massive pastrami on rye sandwiches.",
    location: "205 E Houston St, New York",
  },

  // --- TOKYO ---
  {
    name: "Senso-ji Temple",
    city: "Tokyo",
    category: "attractions",
    type: "Religious",
    rating: 4.7,
    price: "Free",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80&w=800",
    description: "Tokyo's oldest Buddhist temple, located in Asakusa, featuring a towering pagoda.",
    location: "2-chome-3-1 Asakusa, Taito City",
    timings: "06:00 AM - 05:00 PM"
  },
  {
    name: "Shibuya Crossing",
    city: "Tokyo",
    category: "attractions",
    type: "Cultural",
    rating: 4.8,
    price: "Free",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1542051812871-75750085026b?auto=format&fit=crop&q=80&w=800",
    description: "The world's busiest pedestrian crossing, surrounded by giant neon screens.",
    location: "Shibuya, Tokyo",
    timings: "Open 24 hours"
  },
  {
    name: "Park Hyatt Tokyo",
    city: "Tokyo",
    category: "hotels",
    type: "Luxury",
    rating: 4.9,
    price: "₹60,000",
    priceNum: 60000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    description: "A luxurious oasis occupying the top 14 floors of Shinjuku Park Tower.",
    location: "3-7-1-2 Nishi-Shinjuku",
  },

  // --- DUBAI ---
  {
    name: "Burj Khalifa",
    city: "Dubai",
    category: "attractions",
    type: "Historical", // modern history!
    rating: 4.9,
    price: "₹3,500",
    priceNum: 3500,
    image: "https://images.unsplash.com/photo-1582672060624-9ea622ce4bef?auto=format&fit=crop&q=80&w=800",
    description: "The tallest building in the world, offering spectacular views from its observation decks.",
    location: "1 Sheikh Mohammed bin Rashid Blvd",
    timings: "10:00 AM - 12:00 AM"
  },
  {
    name: "The Dubai Mall",
    city: "Dubai",
    category: "attractions",
    type: "Shopping",
    rating: 4.8,
    price: "Free",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1626204327506-0d3ee11d7752?auto=format&fit=crop&q=80&w=800",
    description: "One of the world's largest shopping malls, featuring an aquarium and ice rink.",
    location: "Downtown Dubai",
    timings: "10:00 AM - 12:00 AM"
  },

  // --- DELHI ---
  {
    name: "Red Fort",
    city: "Delhi",
    category: "attractions",
    type: "Historical",
    rating: 4.6,
    price: "₹50",
    priceNum: 50,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    description: "A historic fort in the city of Delhi that served as the main residence of the Mughal Emperors.",
    location: "Netaji Subhash Marg, Lal Qila, Chandni Chowk",
    timings: "09:30 AM - 04:30 PM (Closed Mondays)"
  },
  {
    name: "India Gate",
    city: "Delhi",
    category: "attractions",
    type: "Historical",
    rating: 4.7,
    price: "Free",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1585135405021-0a69a2399d86?auto=format&fit=crop&q=80&w=800",
    description: "A 42m-high war memorial arch, bearing the names of Indian soldiers killed in WWI.",
    location: "Rajpath, India Gate, New Delhi",
    timings: "Open 24 hours"
  },
  {
    name: "Taj Palace",
    city: "Delhi",
    category: "hotels",
    type: "Luxury",
    rating: 4.8,
    price: "₹18,000",
    priceNum: 18000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    description: "Nestled in six acres of lush gardens, this 5-star hotel is a haven of luxury in the capital.",
    location: "Sardar Patel Marg, Diplomatic Enclave",
  },
  {
    name: "Karim's",
    city: "Delhi",
    category: "restaurants",
    type: "Indian",
    rating: 4.5,
    price: "₹800",
    priceNum: 800,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800",
    description: "Historic restaurant known for its authentic Mughal-style cuisine since 1913.",
    location: "Jama Masjid, Old Delhi",
  }
];

const seedFamousPlaces = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing famous places...');
    // Clear only places from these famous cities to avoid deleting other seeded data if any
    const cities = ["Paris", "New York", "Tokyo", "Dubai", "Delhi"];
    await Place.deleteMany({ city: { $in: cities } });
    
    console.log('Inserting real famous places (Gemini Generated)...');
    await Place.insertMany(famousPlaces);
    
    console.log('Famous Places successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding famous places:', error);
    process.exit(1);
  }
};

seedFamousPlaces();
