import React, { useState, useEffect } from 'react';
import './GlobalBackground.css';

const images = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2021&auto=format&fit=crop', // Taj Mahal (Traditional/Starting)
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop', // Group of friends traveling/Local Market
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop', // Scenic hidden gem
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop', // Adventure/Hiking with guide
  'https://images.unsplash.com/photo-1526481280693-3bfa75ac8efd?q=80&w=2070&auto=format&fit=crop', // Kyoto street (Authentic local)
  'https://images.unsplash.com/photo-1539635278303-d4002c07dee3?q=80&w=2070&auto=format&fit=crop', // Friends laughing in a city square
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop', // Road trip/Exploration
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop', // Heritage/Traditional architecture
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop', // Backpacker exploring a new city
  'https://images.unsplash.com/photo-1512453979798-5ea4a73a88d0?q=80&w=2070&auto=format&fit=crop'  // Modern skyline/Discovery
];

const GlobalBackground = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="global-bg-container">
      {/* Hidden preloader for all images */}
      <div style={{ display: 'none' }}>
        {images.map((img, i) => <img key={i} src={img} alt="preload" />)}
      </div>
      
      {images.map((img, index) => (
        <div 
          key={index}
          className={`global-bg-slide ${index === currentIdx ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="global-bg-overlay"></div>
    </div>
  );
};

export default GlobalBackground;
