const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const seedGuides = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travelmithra');
    console.log('MongoDB Connected');

    // Clean up existing demo guides
    const emails = [
      'jean.guide@example.com',
      'kenji.tokyo@example.com',
      'sarah.ny@example.com',
      'amit.delhi@example.com'
    ];
    await User.deleteMany({ email: { $in: emails } });
    console.log('Cleaned up old demo guides.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const guides = [
      {
        name: 'Jean Dupont',
        email: 'jean.guide@example.com',
        password: hashedPassword,
        role: 'guide',
        phone: '1234567890',
        city: 'Paris',
        status: 'approved',
        bio: 'Bonjour! I am Jean, a local history student living in Paris. I specialize in hidden architectural gems, local cafes away from the tourist crowds, and the rich history of the French Revolution. Join me for an authentic Parisian experience!',
        pricePerHour: 1500,
        experience: '3 years',
        languages: ['English', 'French'],
        profilePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Kenji Tanaka',
        email: 'kenji.tokyo@example.com',
        password: hashedPassword,
        role: 'guide',
        phone: '1234567891',
        city: 'Tokyo',
        status: 'approved',
        bio: 'Konnichiwa! I am Kenji. Born and raised in Tokyo, I know the vibrant streets of Shibuya and the serene temples of Asakusa like the back of my hand. I can show you the best sushi spots and anime hubs!',
        pricePerHour: 2000,
        experience: '5 years',
        languages: ['English', 'Japanese'],
        profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Sarah Mitchell',
        email: 'sarah.ny@example.com',
        password: hashedPassword,
        role: 'guide',
        phone: '1234567892',
        city: 'New York',
        status: 'approved',
        bio: 'Hi there! I am Sarah, a native New Yorker. From the iconic Central Park to the bustling streets of Times Square, I will give you a tour of the Big Apple that you will never forget. Let us explore the city that never sleeps!',
        pricePerHour: 2500,
        experience: '4 years',
        languages: ['English', 'Spanish'],
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Amit Sharma',
        email: 'amit.delhi@example.com',
        password: hashedPassword,
        role: 'guide',
        phone: '1234567893',
        city: 'Delhi',
        status: 'approved',
        bio: 'Namaste! I am Amit. Delhi is a city of historical monuments, diverse cultures, and mouth-watering street food. I will take you on a journey through Old Delhi, exploring its rich heritage and vibrant markets.',
        pricePerHour: 1000,
        experience: '6 years',
        languages: ['English', 'Hindi', 'Punjabi'],
        profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60'
      }
    ];

    await User.insertMany(guides);
    console.log(`Successfully seeded ${guides.length} guides!`);
    process.exit();
  } catch (error) {
    console.error('Error seeding guides:', error);
    process.exit(1);
  }
};

seedGuides();
