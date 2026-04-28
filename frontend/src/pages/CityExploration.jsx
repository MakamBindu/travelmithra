import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, MapPin, Star, Clock, X, Info, Calendar, Compass, 
  ExternalLink, Plus, Filter, ArrowUpDown, UserCheck, ChevronRight, Heart,
  Hotel, BedDouble
} from 'lucide-react';
import './CityExploration.css';

const CityExploration = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [selectedType, setSelectedType] = useState(null); // 'places', 'hotels', 'hostels', 'restaurants', 'guides'
  const [cityQuery, setCityQuery] = useState('');
  const [activeTab, setActiveTab] = useState('places');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter States
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const mainCategories = [
    { id: 'places', title: 'Attractions', icon: Compass, desc: 'Discover landmarks, parks, and hidden cultural gems.' },
    { id: 'hotels', title: 'Hotels', icon: Hotel, desc: 'Find the most comfortable and premium stays in the city.' },
    { id: 'hostels', title: 'Hostels', icon: BedDouble, desc: 'Perfect for backpackers and social travelers on a budget.' },
    { id: 'guides', title: 'Local Guides', icon: UserCheck, desc: 'Explore with passionate locals who know the true city stories.' }
  ];

  const fetchRecommendations = async (city) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/recommendations?city=${city}`);
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    setLoading(false);
  };

  const handleCategorySelect = (type) => {
    setSelectedType(type);
    setActiveTab(type);
    if (cityQuery) fetchRecommendations(cityQuery);
  };

  const resetToCategories = () => {
    setSelectedType(null);
    setRecommendations(null);
    setCityQuery('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityQuery) fetchRecommendations(cityQuery);
  };

  const handleCityClick = (cityName) => {
    setCityQuery(cityName);
    fetchRecommendations(cityName);
  };

  const clearFilters = () => {
    setMaxPrice(50000);
    setMinRating(0);
    setSortBy('popularity');
    setSelectedCategory('All');
  };

  const getFilteredResults = () => {
    if (!recommendations || !recommendations[activeTab]) return [];
    
    let filtered = recommendations[activeTab].filter(item => {
      const matchPrice = (item.price_num || 0) <= maxPrice;
      const matchRating = (item.rating || 0) >= minRating;
      const matchCategory = selectedCategory === 'All' || item.type === selectedCategory || item.cuisine === selectedCategory;
      return matchPrice && matchRating && matchCategory;
    });

    if (sortBy === 'price-low') filtered.sort((a, b) => (a.price_num || 0) - (b.price_num || 0));
    if (sortBy === 'price-high') filtered.sort((a, b) => (b.price_num || 0) - (a.price_num || 0));
    if (sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return filtered;
  };

  const toggleWishlist = async (placeId) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/wishlist', { placeId }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      alert('Wishlist updated!');
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const filteredResults = getFilteredResults();
  const isFilterActive = maxPrice < 50000 || minRating > 0 || sortBy !== 'popularity' || selectedCategory !== 'All';

  const categoryOptions = {
    places: [
      { val: 'Historical', label: 'Historical 🏛️' },
      { val: 'Nature', label: 'Nature 🌿' },
      { val: 'Adventure', label: 'Adventure 🧗' },
      { val: 'Religious', label: 'Religious 🛕' },
      { val: 'Beaches', label: 'Beaches 🏖️' },
      { val: 'Shopping', label: 'Shopping 🛍️' },
      { val: 'Nightlife', label: 'Nightlife 🌃' },
      { val: 'Cultural', label: 'Cultural 🎭' },
      { val: 'Museums', label: 'Museums 🖼️' }
    ],
    restaurants: [
      { val: 'Indian', label: 'Indian 🍛' },
      { val: 'Chinese', label: 'Chinese 🍜' },
      { val: 'Italian', label: 'Italian 🍕' },
      { val: 'Fast Food', label: 'Fast Food 🍔' },
      { val: 'Street Food', label: 'Street Food 🥙' },
      { val: 'Cafe', label: 'Cafe ☕' },
      { val: 'Fine Dining', label: 'Fine Dining 🍷' }
    ],
    hotels: [
      { val: 'Budget', label: 'Budget 🏨' },
      { val: 'Mid-range', label: 'Mid-range 🏢' },
      { val: 'Luxury', label: 'Luxury 🏰' },
      { val: 'Family-friendly', label: 'Family-friendly 👨‍👩‍👧‍👦' },
      { val: 'Business', label: 'Business 💼' },
      { val: 'Backpacker', label: 'Backpacker 🎒' }
    ],
    hostels: [
      { val: 'Budget', label: 'Budget 🛏️' },
      { val: 'Backpacker', label: 'Backpacker 🎒' },
      { val: 'Social', label: 'Social 🍻' }
    ]
  };

  const tabs = [
    { id: 'places', label: 'Attractions' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'hostels', label: 'Hostels' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'guides', label: 'Local Guides' }
  ];

  return (
    <div className="city-exploration animate-fade-in">
      {!selectedType ? (
        <div className="category-selection-overlay">
          <div className="container selection-content">
            <div className="selection-header centered">
              <span className="subtitle">Step 1</span>
              <h1 className="text-on-bg shadow-text">What are you looking for?</h1>
              <p className="text-on-bg">Select a category to begin your exploration.</p>
            </div>
            
            <div className="category-cards-grid">
              {mainCategories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="main-category-card glass-panel" 
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <div className="cat-icon-box">
                    <cat.icon size={40} />
                  </div>
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <div className="cat-hover-indicator">
                     Explore {cat.title} <ChevronRight size={18}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="search-header-container">
            <div className="container">
              <div className="search-header">
                <div className="header-top-nav">
                   <button className="btn-back-categories" onClick={resetToCategories}>
                      ← Back to Categories
                   </button>
                   <span className="active-category-pill">
                      Exploring: {mainCategories.find(c => c.id === selectedType)?.title}
                   </span>
                </div>
                <h2 className="text-on-bg shadow-text">Plan Your Perfect Trip</h2>
                <form onSubmit={handleSearch} className="search-bar prominent">
                  <div className="search-input-wrapper">
                    <MapPin className="search-icon" size={20} />
                    <input 
                      type="text" 
                      placeholder="Which city are you visiting?" 
                      value={cityQuery}
                      onChange={(e) => setCityQuery(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-primary large">
                    Find {mainCategories.find(c => c.id === selectedType)?.title}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="content-area container">
            {!recommendations ? (
              <div className="browse-section">
                <h3 className="browse-title text-on-bg shadow-text text-center mb-4">
                  Trending in {mainCategories.find(c => c.id === selectedType)?.title}
                </h3>
                <div className="empty-search-state">
                   <Search size={60} />
                   <p>Enter a city name above to find the best {selectedType} in that location.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="exploration-controls-wrapper animate-slide-up">
                  <div className="exploration-tabs-row">
                    {tabs.map(tab => (
                      <button 
                        key={tab.id}
                        className={`tab-btn-pill ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => { setActiveTab(tab.id); setSelectedCategory('All'); }}
                      >
                        {tab.label}
                      </button>
                    ))}
                    <button className="tab-btn-pill switch-city" onClick={() => setRecommendations(null)}>
                       Switch City
                    </button>
                  </div>

                  <div className="filter-bar-row">
                    <div className="filter-item">
                      <label>Price Range</label>
                      <div className="range-with-label">
                        <input 
                          type="range" min="0" max="50000" step="500"
                          value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} 
                        />
                        <span className="price-value">Up to ₹{maxPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="filter-item">
                      <label>Minimum Rating</label>
                      <select className="filter-dropdown" value={minRating} onChange={(e) => setMinRating(parseFloat(e.target.value))}>
                        <option value="0">All Ratings</option>
                        <option value="4.5">4.5+ Stars ⭐</option>
                        <option value="4.0">4.0+ Stars ⭐</option>
                        <option value="3.0">3.0+ Stars ⭐</option>
                      </select>
                    </div>

                    {activeTab !== 'guides' && (
                      <div className="filter-item">
                        <label>Category</label>
                        <select className="filter-dropdown" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                          <option value="All">All Categories</option>
                          {categoryOptions[activeTab]?.map(opt => (
                            <option key={opt.val} value={opt.val}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="filter-item">
                      <label>Sort By</label>
                      <div className="sort-group">
                        <select className="filter-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                          <option value="popularity">Sort by: Popularity</option>
                          <option value="price-low">Price (Low → High)</option>
                          <option value="price-high">Price (High → Low)</option>
                          <option value="rating">Top Rated</option>
                        </select>
                        {isFilterActive && (
                          <button className="btn-clear-inline" onClick={clearFilters} title="Reset All Filters">
                            <X size={16}/>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="loading-state">
                    <Compass className="animate-spin text-blue" size={64} />
                    <p className="text-on-bg">Finding best options in {cityQuery}...</p>
                  </div>
                ) : (
                  <div className="results-wrapper">
                    {filteredResults.length > 0 ? (
                      <div className="listings-grid animate-slide-up">
                        {filteredResults.map((item) => (
                          <div key={item.id} className="listing-card" onClick={() => setSelectedItem(item)}>
                            <div className="listing-image">
                              <img src={item.image || item.profilePhoto} alt={item.name} />
                              <div className="listing-badge">
                                <Star size={12} fill="#fbbf24" color="#fbbf24" />
                                <span>{item.rating || '4.5'}</span>
                              </div>
                              <div className="listing-type-tag">
                                {item.type || item.cuisine || activeTab}
                              </div>
                              <button 
                                className="wishlist-btn-overlay" 
                                onClick={(e) => { e.stopPropagation(); toggleWishlist(item._id); }}
                              >
                                <Heart size={18} fill={userInfo?.wishlist?.includes(item._id) ? "#ef4444" : "none"} color={userInfo?.wishlist?.includes(item._id) ? "#ef4444" : "white"} />
                              </button>
                            </div>
                            <div className="listing-content">
                              <div className="listing-header">
                                <h4 className="listing-title">{item.name}</h4>
                                <span className="listing-price">{item.price || (item.pricePerHour ? `₹${item.pricePerHour}/hr` : 'Free')}</span>
                              </div>
                              <div className="listing-meta">
                                <MapPin size={14}/> {item.location || item.city || cityQuery}
                              </div>
                              <p className="listing-excerpt">{item.description || item.bio || item.desc}</p>
                              <div className="listing-footer">
                                <button className="btn-view-details">
                                  View Details <ChevronRight size={16}/>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-results animate-fade-in">
                        <Compass size={80} />
                        <h3>No results found</h3>
                        <p>We couldn't find any {activeTab} matching your current filters.</p>
                        <button className="btn-primary large" onClick={clearFilters}>Reset All Filters</button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Detail Modal */}
          {selectedItem && (
            <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
              <div className="modal-card animate-zoom-in" onClick={e => e.stopPropagation()}>
                <button className="modal-close-icon" onClick={() => setSelectedItem(null)}>
                  <X size={24}/>
                </button>
                
                <div className="modal-top-section">
                  <div className="modal-image-wrapper">
                    <img src={selectedItem.image || selectedItem.profilePhoto} alt={selectedItem.name} />
                    <div className="modal-image-overlay">
                       <div className="modal-rating-badge">
                          <Star size={16} fill="#fbbf24" color="#fbbf24" />
                          <span>{selectedItem.rating || '4.8'}</span>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="modal-body-content">
                  <div className="modal-header-info">
                    <h2 className="modal-title">{selectedItem.name}</h2>
                    <div className="modal-subtitle">
                       <MapPin size={16}/> {selectedItem.location || selectedItem.city || cityQuery}
                    </div>
                  </div>

                  <div className="modal-divider"></div>

                  <div className="modal-info-grid">
                    <div className="modal-section">
                      <h4 className="modal-section-title"><Info size={16}/> Overview</h4>
                      <p className="modal-text">{selectedItem.description || selectedItem.bio || selectedItem.desc}</p>
                    </div>

                    {selectedItem.moreInfo && (
                      <div className="modal-section">
                        <h4 className="modal-section-title"><Compass size={16}/> History & Details</h4>
                        <p className="modal-text-secondary">{selectedItem.moreInfo}</p>
                      </div>
                    )}
                  </div>

                  <div className="modal-section visitor-section">
                    <h4 className="modal-section-title"><Calendar size={16}/> Visitor Information</h4>
                    <div className="visitor-grid-pill">
                      <div className="visitor-pill">
                        <Clock size={16}/>
                        <div className="pill-text">
                           <span>Timings</span>
                           <strong>{selectedItem.timings || '09:00 AM - 06:00 PM'}</strong>
                        </div>
                      </div>
                      <div className="visitor-pill">
                        <MapPin size={16}/>
                        <div className="pill-text">
                           <span>{activeTab === 'guides' ? 'City' : 'Address'}</span>
                           <strong>{selectedItem.location || selectedItem.city || cityQuery}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-booking-footer">
                   <div className="modal-price-display">
                     <span>Price / Entry Fee</span>
                     <h3 className="price-tag-pop">{selectedItem.price || (selectedItem.pricePerHour ? `₹${selectedItem.pricePerHour}/hr` : 'Free')}</h3>
                   </div>
                   <div className="modal-footer-actions">
                      {activeTab !== 'guides' && (
                        <button className="btn-secondary" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedItem.location + ' ' + (selectedItem.city || cityQuery))}`, '_blank')}>
                          <ExternalLink size={18}/> View Map
                        </button>
                      )}
                      <button className="btn-primary" onClick={() => {
                        if (!userInfo || !userInfo.email) {
                          navigate('/login');
                          return;
                        }
                        if (activeTab === 'guides') {
                          navigate(`/guide/${selectedItem._id}`);
                        } else {
                          navigate(`/book?city=${selectedCity || ''}&place=${selectedItem.name}`);
                        }
                        setSelectedItem(null);
                      }}>
                        Book Experience
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CityExploration;
