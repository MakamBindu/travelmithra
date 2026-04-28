import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Calendar, MapPin, Sparkles, Clock, Trash2, Plus, 
  Download, Save, RefreshCw, ChevronRight, CheckCircle2,
  Users, Wallet, Zap, Coffee, Utensils, Train, X, Home, Info, ArrowRight, Star
} from 'lucide-react';
import './TripPlanner.css';

const TripPlanner = () => {
  const [step, setStep] = useState(1); // 1: Form, 2: Itinerary
  const [loading, setLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  
  // Required Inputs
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState(3);
  const [interests, setInterests] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('Medium');
  const [travelers, setTravelers] = useState('2');
  const [travelType, setTravelType] = useState('Couple');
  const [pace, setPace] = useState('Moderate');

  // Optional Inputs
  const [accommodation, setAccommodation] = useState('Hotel');
  const [foodPref, setFoodPref] = useState('Both');
  const [transport, setTransport] = useState('Public');

  const [itinerary, setItinerary] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const interestOptions = ['Sightseeing', 'Food', 'Shopping', 'Adventure', 'History', 'Nightlife'];
  const popularCities = ['Paris', 'Tokyo', 'London', 'Dubai', 'New York', 'Rome', 'Bali', 'Sydney', 'Hyderabad'];

  useEffect(() => {
    const saved = localStorage.getItem('tripPlans');
    if (saved) setSavedPlans(JSON.parse(saved));
  }, []);

  const handleCityChange = (val) => {
    setCity(val);
    if (val.length > 0) {
      const filtered = popularCities.filter(c => c.toLowerCase().includes(val.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const toggleInterest = (interest) => {
    setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const validateForm = () => {
    if (!city || !startDate || !endDate || interests.length === 0) return false;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end >= start;
  };

  const generateItinerary = async () => {
    if (!validateForm()) {
      if (interests.length === 0) return alert('Please select at least one interest.');
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) return alert('End date cannot be before start date.');
      return alert('Please fill in all required fields marked with (*).');
    }
    
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/recommendations?city=${city}`);
      const pool = data.activityPool || [];
      
      let relevantActivities = pool.filter(a => 
        interests.length === 0 || interests.some(i => a.category.toLowerCase().includes(i.toLowerCase()))
      );
      
      if (relevantActivities.length < 5) relevantActivities = pool;

      const actsPerDay = pace === 'Relaxed' ? 2 : pace === 'Packed' ? 4 : 3;
      const times = ['Morning', 'Afternoon', 'Evening', 'Night'];

      const generated = [];
      for (let i = 1; i <= duration; i++) {
        const dayActivities = [];
        for (let j = 0; j < actsPerDay; j++) {
          const act = { ...relevantActivities[(i * actsPerDay + j) % relevantActivities.length] };
          act.time = times[j % times.length];
          if (budget === 'Luxury') act.name = 'Premium ' + act.name;
          if (budget === 'Low') act.name = 'Budget ' + act.name;
          generated.push({ ...act, day: i }); // Linearizing for simpler logic if needed, but keeping day blocks
        }
      }

      // Re-block into days
      const blocked = [];
      for(let i=1; i<=duration; i++) {
        blocked.push({
          day: i,
          activities: generated.filter(a => a.day === i)
        });
      }

      setTimeout(() => {
        setItinerary(blocked);
        setStep(2);
        setLoading(false);
      }, 2000);

    } catch (err) {
      alert('Error connecting to AI service.');
      setLoading(false);
    }
  };

  const savePlan = () => {
    const newPlan = { id: Date.now(), city, duration, itinerary, budget, date: new Date().toLocaleDateString() };
    const updated = [newPlan, ...savedPlans];
    setSavedPlans(updated);
    localStorage.setItem('tripPlans', JSON.stringify(updated));
    alert('Plan bookmarked successfully!');
  };

  const Selector = ({ label, options, current, setter, icon: Icon }) => (
    <div className="planner-form-group">
      <label><Icon size={14}/> {label}</label>
      <div className="planner-selector">
        {options.map(opt => (
          <button 
            key={opt} 
            className={`planner-btn-pill ${current === opt ? 'active' : ''}`}
            onClick={() => setter(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="trip-planner-page animate-fade-in">
      {loading && (
        <div className="planner-loading-overlay">
          <div className="loader-card">
            <RefreshCw className="animate-spin text-blue" size={48} />
            <h2>Magic in progress...</h2>
            <p>We're curating the perfect {city} experience just for you.</p>
          </div>
        </div>
      )}

      <div className="container">
        {step === 1 ? (
          <div className="planner-setup-view">
            <div className="planner-setup-card glass-panel">
              <div className="setup-header">
                <Sparkles size={32} className="text-blue" />
                <h1>AI Trip Planner</h1>
                <p>Plan your dream getaway in seconds.</p>
              </div>

              <div className="setup-form-grid">
                <div className="planner-form-group full-width">
                  <label><MapPin size={14}/> Destination City *</label>
                  <div className="city-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="e.g. Paris, Tokyo, London..." 
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="city-suggestions glass-panel">
                        {suggestions.map(s => (
                          <div key={s} className="suggestion-pill" onClick={() => { setCity(s); setShowSuggestions(false); }}>{s}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="planner-form-group">
                  <label><Calendar size={14}/> Start Date *</label>
                  <input type="date" className="planner-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>

                <div className="planner-form-group">
                  <label><Calendar size={14}/> End Date *</label>
                  <input type="date" className="planner-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <Selector label="Number of Travelers *" icon={Users} options={['1', '2', 'Family', 'Group']} current={travelers} setter={setTravelers} />
                <Selector label="Budget Range *" icon={Wallet} options={['Low', 'Medium', 'Luxury']} current={budget} setter={setBudget} />
                <Selector label="Preferred Pace *" icon={Clock} options={['Relaxed', 'Moderate', 'Packed']} current={pace} setter={setPace} />
                <Selector label="Accommodation" icon={Home} options={['Hotel', 'Hostel', 'Airbnb']} current={accommodation} setter={setAccommodation} />

                <div className="planner-form-group full-width">
                  <label><Star size={14}/> Your Interests (Select all that apply) *</label>
                  <div className="interests-grid">
                    {interestOptions.map(opt => (
                      <button 
                        key={opt} 
                        className={`interest-btn ${interests.includes(opt) ? 'active' : ''}`}
                        onClick={() => toggleInterest(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                className={`btn-generate-plan ${!validateForm() ? 'disabled' : ''}`}
                onClick={generateItinerary}
                disabled={loading || !validateForm()}
              >
                Create My Itinerary <ArrowRight size={20}/>
              </button>
              {!validateForm() && <p className="validation-msg">Please fill in all fields marked with *</p>}
            </div>
          </div>
        ) : (
          <div className="itinerary-result-view animate-slide-up">
            <div className="itinerary-header-card glass-panel">
              <div className="header-info">
                 <span className="itinerary-badge">{budget} Budget • {travelers} Travelers</span>
                 <h1>{city} Expedition</h1>
                 <div className="header-meta">
                   <span><Calendar size={16}/> {startDate} - {endDate}</span>
                   <span><MapPin size={16}/> {city}</span>
                 </div>
              </div>
              <div className="header-actions">
                 <button className="btn-secondary" onClick={() => setStep(1)}><RefreshCw size={18}/> New Plan</button>
                 <button className="btn-primary" onClick={savePlan}><Save size={18}/> Bookmark Plan</button>
              </div>
            </div>

            <div className="itinerary-timeline">
              {itinerary.map((day) => (
                <div key={day.day} className="day-section">
                  <div className="day-heading">
                    <div className="day-number">Day {day.day}</div>
                    <div className="day-line"></div>
                  </div>
                  
                  <div className="activities-grid">
                    {day.activities.map((act, idx) => (
                      <div key={idx} className="itinerary-activity-card">
                        <div className={`activity-time time-${act.time.toLowerCase()}`}>
                          {act.time}
                        </div>
                        <div className="activity-body">
                          <h4 className="activity-name">{act.name}</h4>
                          <p className="activity-desc">{act.desc}</p>
                          <div className="activity-meta">
                            <span className="tag"><MapPin size={12}/> {act.category}</span>
                            <span className="tag"><Clock size={12}/> {idx === 1 ? 'Lunch' : 'Explore'}</span>
                          </div>
                        </div>
                        <div className="activity-options">
                           <button className="btn-remove" onClick={() => {
                              const newItin = [...itinerary];
                              const dayIdx = newItin.findIndex(d => d.day === day.day);
                              newItin[dayIdx].activities.splice(idx, 1);
                              setItinerary(newItin);
                           }}><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}
                    <button className="btn-add-activity">
                      <Plus size={16}/> Add Activity
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="itinerary-footer">
               <button className="btn-print" onClick={() => window.print()}><Download size={20}/> Download Itinerary as PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
