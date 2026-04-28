import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Users, Hotel, Utensils, BedDouble, 
  Search, Calendar, Compass, ShieldCheck, Star, ArrowRight, PlayCircle, Sparkles
} from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleFeatureClick = (category) => {
    navigate(`/explore?tab=${category}`);
  };

  const destinations = [
    { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', tag: 'Romantic' },
    { id: 2, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', tag: 'Modern' },
    { id: 3, name: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', tag: 'Ancient' },
    { id: 4, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', tag: 'Tropical' }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section-new">
        <div className="hero-overlay"></div>
        <div className="container hero-grid">
          <div className="hero-text-content">
            <div className="hero-badge animate-float">✨ Redefining Local Exploration</div>
            <h1 className="hero-main-title">
              Explore the World Like a <span className="text-gradient">Local.</span>
            </h1>
            <p className="hero-tagline">
              Discover hidden gems with passionate student guides and personalized itineraries.
            </p>
            <p className="hero-subtext">
              TravelMithra connects you with local experts who reveal the true heart of every city, going beyond the typical tourist paths.
            </p>
            <div className="hero-actions">
              <button className="btn-primary large" onClick={() => navigate('/book')}>
                Start Exploring <ArrowRight size={18} />
              </button>
              <button className="btn-glass large" onClick={() => navigate('/book')}>
                <Sparkles size={18} /> Plan Your Trip
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">500+</span>
                <span className="stat-label">Verified Guides</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">10k+</span>
                <span className="stat-label">Happy Travelers</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">4.9/5</span>
                <span className="stat-label">User Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-visual-content desktop-only">
            <div className="hero-card-preview animate-float">
              <div className="preview-header">
                <Calendar size={20} className="text-blue" />
                <span>Next Trip: Paris</span>
              </div>
              <div className="preview-itinerary">
                <div className="itin-item active">
                  <div className="itin-dot"></div>
                  <span>9:00 AM - Eiffel Tower Visit</span>
                </div>
                <div className="itin-item">
                  <div className="itin-dot"></div>
                  <span>12:30 PM - Lunch with Guide</span>
                </div>
                <div className="itin-item">
                  <div className="itin-dot"></div>
                  <span>3:00 PM - Louvre Museum</span>
                </div>
              </div>
              <button className="btn-primary small full-width" onClick={() => navigate('/planner')}>View My Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works container">
        <div className="section-header centered">
          <span className="subtitle">Process</span>
          <h2>How It Works</h2>
          <p>Your journey from planning to exploring is as simple as three steps.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card glass-panel">
            <div className="step-num">01</div>
            <div className="step-icon"><Search size={32} /></div>
            <h3>Pick a Destination</h3>
            <p>Browse through our curated list of 50+ global cities and hidden gems.</p>
          </div>
          <div className="step-card glass-panel">
            <div className="step-num">02</div>
            <div className="step-icon"><Users size={32} /></div>
            <h3>Connect with a Guide</h3>
            <p>Choose a local student guide who shares your interests and language.</p>
          </div>
          <div className="step-card glass-panel active">
            <div className="step-num">03</div>
            <div className="step-icon"><Compass size={32} /></div>
            <h3>Explore Like a Local</h3>
            <p>Enjoy a personalized experience that goes beyond the standard tourist map.</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="popular-destinations container">
        <div className="section-header">
          <div>
            <span className="subtitle">Discover</span>
            <h2>Trending Destinations</h2>
          </div>
          <button className="btn-link" onClick={() => navigate('/explore')}>View All Cities <ArrowRight size={16} /></button>
        </div>
        <div className="dest-grid">
          {destinations.map(dest => (
            <div key={dest.id} className="dest-card-new" onClick={() => navigate(`/explore?city=${dest.name}`)}>
              <img src={dest.image} alt={dest.name} />
              <div className="dest-info-body">
                <span className="dest-tag-pill">{dest.tag}</span>
                <h3>{dest.name}</h3>
                <div className="dest-location">
                  <MapPin size={14} /> {dest.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Guides Highlight */}
      <section className="guides-highlight container">
        <div className="highlight-card glass-panel">
          <div className="highlight-content">
            <span className="subtitle">Our Unique Feature</span>
            <h2>Travel with Passionate Student Guides</h2>
            <p>
              Why settle for a script when you can have a conversation? Our guides are local students who share their 
              authentic stories, favorite secret spots, and the real pulse of their city.
            </p>
            <ul className="check-list">
              <li><ShieldCheck size={18} className="text-green" /> Verified Student Profiles</li>
              <li><ShieldCheck size={18} className="text-green" /> Language & Interest Matching</li>
              <li><ShieldCheck size={18} className="text-green" /> Affordable & Ethical Tourism</li>
            </ul>
            <button className="btn-primary mt-2" onClick={() => navigate('/book')}>Find Your Guide</button>
          </div>
          <div className="highlight-image">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Student Guides" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials container">
        <div className="section-header centered">
          <span className="subtitle">Feedback</span>
          <h2>What Our Travelers Say</h2>
        </div>
        <div className="testimonials-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="test-card glass-panel">
              <div className="stars"><Star size={14} fill="#fbbf24" color="#fbbf24" /><Star size={14} fill="#fbbf24" color="#fbbf24" /><Star size={14} fill="#fbbf24" color="#fbbf24" /><Star size={14} fill="#fbbf24" color="#fbbf24" /><Star size={14} fill="#fbbf24" color="#fbbf24" /></div>
              <p>"TravelMithra completely changed the way I see Paris. My guide, Sarah, showed me cafes I would have never found on my own!"</p>
              <div className="test-user">
                <div className="user-avatar"></div>
                <div>
                  <h4>Alex Johnson</h4>
                  <span>Solo Traveler</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
