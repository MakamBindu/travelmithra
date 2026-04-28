import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MapPin, Calendar, Clock, Users, ArrowRight, ArrowLeft, 
  CheckCircle, Star, Search, Info, Map
} from 'lucide-react';
import './BookingFlow.css';

const BookingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: City, 2: Place, 3: DateTime, 4: Guide, 5: Confirm
  const [loading, setLoading] = useState(false);
  
  // Selection State
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);
  
  // Data State
  const [cities, setCities] = useState(['Paris', 'Tokyo', 'New York', 'Delhi', 'London', 'Rome']);
  const [places, setPlaces] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (step === 2 && selectedCity) {
      fetchPlaces();
    }
    if (step === 4 && selectedCity) {
      fetchGuides();
    }
  }, [step, selectedCity]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from backend
      // const res = await axios.get(`http://localhost:5000/api/places?city=${selectedCity}`);
      // For now, using realistic mock data based on city
      const mockPlaces = {
        'Paris': [
          { _id: 'p1', name: 'Eiffel Tower', description: 'Iconic wrought-iron spire and global symbol of France.', address: 'Champ de Mars, 5 Ave Anatole France', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee87?auto=format&fit=crop&w=800&q=80' },
          { _id: 'p2', name: 'Louvre Museum', description: 'The world\'s largest art museum and a historic monument.', address: 'Rue de Rivoli, 75001 Paris', image: 'https://images.unsplash.com/photo-1597923896141-d4de3119853c?auto=format&fit=crop&w=800&q=80' }
        ],
        'Tokyo': [
          { _id: 'p3', name: 'Senso-ji Temple', description: 'Tokyo\'s oldest temple, dedicated to Kannon Bosatsu.', address: '2-3-1 Asakusa, Taito City, Tokyo', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80' },
          { _id: 'p4', name: 'Shibuya Crossing', description: 'The world\'s busiest pedestrian crossing.', address: 'Shibuya City, Tokyo', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80' }
        ],
        'New York': [
          { _id: 'p5', name: 'Statue of Liberty', description: 'Colossal copper statue on Liberty Island in New York Harbor.', address: 'New York, NY 10004', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80' },
          { _id: 'p6', name: 'Times Square', description: 'Brightly illuminated hub of the Broadway theater district.', address: 'Manhattan, NY 10036', image: 'https://images.unsplash.com/photo-1485871922737-f2207c97623d?auto=format&fit=crop&w=800&q=80' }
        ],
        'Delhi': [
          { _id: 'p7', name: 'Red Fort', description: 'Historic fort in the city of Delhi in India.', address: 'Netaji Subhash Marg, Chandni Chowk', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80' },
          { _id: 'p8', name: 'India Gate', description: 'War memorial located astride the Rajpath.', address: 'Rajpath, India Gate, New Delhi', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80' }
        ],
        'London': [
          { _id: 'p9', name: 'Big Ben', description: 'Iconic clock tower at the north end of the Palace of Westminster.', address: 'London SW1A 0AA', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80' },
          { _id: 'p10', name: 'London Eye', description: 'Giant Ferris wheel on the South Bank of the River Thames.', address: 'Riverside Building, County Hall', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' }
        ],
        'Rome': [
          { _id: 'p11', name: 'Colosseum', description: 'An oval amphitheatre in the centre of the city of Rome.', address: 'Piazza del Colosseo, 1, 00184 Roma', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' },
          { _id: 'p12', name: 'Trevi Fountain', description: '18th-century fountain in the Trevi district.', address: 'Piazza di Trevi, 00187 Roma', image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80' }
        ]
      };
      
      const cityPlaces = mockPlaces[selectedCity] || [];
      // Always add a "General City Tour" option
      const generalTour = { 
        _id: 'general', 
        name: `General ${selectedCity} Tour`, 
        description: `A comprehensive guided tour through the hidden gems and major highlights of ${selectedCity}.`, 
        address: 'City Center / Flexible', 
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80' 
      };
      
      setPlaces([generalTour, ...cityPlaces]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/guides?city=${selectedCity}`);
      setGuides(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const payload = {
        guideId: selectedGuide._id,
        city: selectedCity,
        place: selectedPlace.name,
        date: selectedDate,
        time: selectedTime,
        durationHours: 2, // Default
        numberOfPeople: 1
      };

      await axios.post('http://localhost:5000/api/bookings', payload, config);
      alert('Booking Successful! Check your dashboard for details.');
      navigate('/customer-dashboard/bookings');
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="booking-flow-container animate-fade-in">
      <div className="container">
        {/* Progress Bar */}
        <div className="booking-progress">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`progress-step ${step >= i ? 'active' : ''} ${step > i ? 'completed' : ''}`}>
              <div className="step-num">{step > i ? <CheckCircle size={16}/> : i}</div>
              <span className="step-label">
                {i === 1 && 'City'}
                {i === 2 && 'Place'}
                {i === 3 && 'Time'}
                {i === 4 && 'Guide'}
                {i === 5 && 'Confirm'}
              </span>
            </div>
          ))}
        </div>

        <div className="booking-content glass-panel">
          {/* Step 1: City Selection */}
          {step === 1 && (
            <div className="step-view">
              <h2>Where are you going?</h2>
              <p className="subtitle">Select your destination city</p>
              <div className="selection-grid">
                {cities.map(city => (
                  <div 
                    key={city} 
                    className={`selection-card ${selectedCity === city ? 'active' : ''}`}
                    onClick={() => { setSelectedCity(city); nextStep(); }}
                  >
                    <MapPin size={24} />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Place Selection */}
          {step === 2 && (
            <div className="step-view">
              <div className="step-header">
                <button className="btn-back" onClick={prevStep}><ArrowLeft size={18}/> Back</button>
                <h2>Select a Place in {selectedCity}</h2>
              </div>
              <div className="places-list">
                {loading ? <div className="loader">Searching places...</div> : (
                  places.map(place => (
                    <div 
                      key={place._id} 
                      className={`place-card ${selectedPlace?._id === place._id ? 'active' : ''}`}
                      onClick={() => { setSelectedPlace(place); nextStep(); }}
                    >
                      <img src={place.image} alt={place.name} />
                      <div className="place-info">
                        <h3>{place.name}</h3>
                        <p>{place.description}</p>
                        <span className="address"><MapPin size={14}/> {place.address}</span>
                      </div>
                    </div>
                  ))
                )}
                {places.length === 0 && !loading && <p>No specific places found for this city. You can still hire a guide for a general city tour!</p>}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="step-view">
              <div className="step-header">
                <button className="btn-back" onClick={prevStep}><ArrowLeft size={18}/> Back</button>
                <h2>When would you like to visit?</h2>
              </div>
              <div className="datetime-form">
                <div className="form-group">
                  <label><Calendar size={18}/> Choose Date</label>
                  <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label><Clock size={18}/> Choose Time</label>
                  <input 
                    type="time" 
                    value={selectedTime} 
                    onChange={(e) => setSelectedTime(e.target.value)} 
                  />
                </div>
                <button 
                  className="btn-primary" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={nextStep}
                >
                  Continue to Find Guides <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Guide Selection */}
          {step === 4 && (
            <div className="step-view">
              <div className="step-header">
                <button className="btn-back" onClick={prevStep}><ArrowLeft size={18}/> Back</button>
                <h2>Match with a Local Guide</h2>
              </div>
              <div className="guides-grid">
                {loading ? <div className="loader">Finding available guides...</div> : (
                  guides.map(guide => (
                    <div key={guide._id} className="guide-match-card">
                      <div className="guide-header">
                        <img src={guide.profilePhoto} alt={guide.name} />
                        <div className="guide-meta">
                          <h3>{guide.name}</h3>
                          <div className="rating"><Star size={14} fill="#fbbf24"/> 4.8 (24 reviews)</div>
                        </div>
                      </div>
                      <div className="guide-details">
                        <p><strong>Languages:</strong> {guide.languages.join(', ')}</p>
                        <p><strong>Price:</strong> ₹{guide.pricePerHour}/hr</p>
                        <p className="availability"><CheckCircle size={14}/> Available at {selectedTime}</p>
                      </div>
                      <div className="guide-actions">
                        <button className="btn-outline" onClick={() => navigate(`/guide/${guide._id}`)}>View Profile</button>
                        <button className="btn-primary" onClick={() => { setSelectedGuide(guide); nextStep(); }}>Select Guide</button>
                      </div>
                    </div>
                  ))
                )}
                {guides.length === 0 && !loading && <p>No guides found for {selectedCity} at this time.</p>}
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="step-view confirmation">
              <h2>Confirm Your Booking</h2>
              <div className="summary-card">
                <div className="summary-item">
                  <MapPin size={20}/>
                  <div>
                    <label>Destination</label>
                    <p>{selectedPlace?.name}, {selectedCity}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <Calendar size={20}/>
                  <div>
                    <label>Date & Time</label>
                    <p>{selectedDate} at {selectedTime}</p>
                  </div>
                </div>
                <div className="summary-item">
                  <Users size={20}/>
                  <div>
                    <label>Your Guide</label>
                    <p>{selectedGuide?.name}</p>
                  </div>
                </div>
                <div className="price-summary">
                  <div className="price-row">
                    <span>Base Fare</span>
                    <span>₹{selectedGuide?.pricePerHour}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total Estimated</span>
                    <span>₹{selectedGuide?.pricePerHour}</span>
                  </div>
                </div>
              </div>
              <div className="confirmation-actions">
                <button className="btn-back" onClick={prevStep}>Change Details</button>
                <button className="btn-primary large" onClick={handleBooking} disabled={loading}>
                  {loading ? 'Confirming...' : 'Confirm & Book Now'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
