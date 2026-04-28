import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Languages, Briefcase, Clock, Calendar, X } from 'lucide-react';
import './GuideProfile.css';

const GuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '', time: '', durationHours: 1, numberOfPeople: 1, specialRequest: ''
  });
  const [createdBooking, setCreatedBooking] = useState(null);

  // Reviews State
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [completedBookingId, setCompletedBookingId] = useState(null);

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = userInfo ? { headers: { Authorization: `Bearer ${userInfo.token}` } } : {};
        
        // Fetch Guide Details
        const { data: guideData } = await axios.get(`http://localhost:5000/api/guides/${id}`, config);
        setGuide(guideData);
        
        // Fetch Reviews
        const { data: reviewsData } = await axios.get(`http://localhost:5000/api/reviews/guide/${id}`);
        setReviews(reviewsData);
        
        // Check if current customer has completed a booking with this guide
        if (userInfo && userInfo.role === 'customer') {
          const { data: bookings } = await axios.get('http://localhost:5000/api/bookings/customer', config);
          const completedBooking = bookings.find(b => b.guide._id === id && b.status === 'completed');
          if (completedBooking) {
            setCompletedBookingId(completedBooking._id);
            // Check if already reviewed
            const alreadyReviewed = reviewsData.some(r => r.customer._id === userInfo._id);
            if (!alreadyReviewed) setShowReviewForm(true);
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch guide details');
        setLoading(false);
      }
    };
    fetchGuideData();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const payload = {
        guideId: guide._id,
        city: guide.city,
        ...bookingData
      };

      const { data } = await axios.post('http://localhost:5000/api/bookings', payload, config);
      setCreatedBooking(data);
      setShowBookingModal(false);
      setShowPaymentModal(true); // Proceed to mock payment
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating booking');
    }
  };

  const handleMockPayment = async (paymentType) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.post(`http://localhost:5000/api/bookings/${createdBooking._id}/pay`, { paymentType }, config);
      
      alert(`Payment successful! You have paid ${paymentType === 'full' ? 'in full' : 'the advance'}.`);
      setShowPaymentModal(false);
      navigate('/dashboard/customer-bookings'); // We'll create this route soon
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing payment');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const payload = {
        guideId: guide._id,
        bookingId: completedBookingId,
        rating: newReview.rating,
        comment: newReview.comment
      };

      const { data } = await axios.post('http://localhost:5000/api/reviews', payload, config);
      // add the new review with populated customer
      setReviews([{ ...data, customer: { _id: userInfo._id, name: userInfo.name } }, ...reviews]);
      setShowReviewForm(false);
      setNewReview({ rating: 5, comment: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting review');
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!guide) return <div>Guide not found</div>;

  return (
    <div className="guide-profile-page animate-fade-in">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>

        <div className="profile-layout">
          <div className="profile-sidebar glass-panel">
            <img src={guide.profilePhoto} alt={guide.name} className="profile-image" />
            <h2>{guide.name}</h2>
            <p className="profile-location"><MapPin size={18} /> {guide.city}</p>
            <div className="profile-badge-row">
              <span className="badge-pill">{guide.gender}</span>
              <span className="badge-pill rating-pill"><Star size={14} fill="#fbbf24"/> 4.8</span>
            </div>
            
            <div className="pricing-box">
              <h3>₹{guide.pricePerHour}</h3>
              <span>per hour</span>
            </div>

            <button className="btn-primary full-width mt-1" onClick={() => {
              if (!localStorage.getItem('userInfo')) {
                alert('Please login to book a guide');
                navigate('/login');
              } else {
                setShowBookingModal(true);
              }
            }}>
              Book Now
            </button>
          </div>

          <div className="profile-main glass-panel">
            <h3>About Me</h3>
            <p className="profile-bio">{guide.bio}</p>

            <div className="profile-info-grid">
              <div className="info-item">
                <Languages size={24} className="text-blue" />
                <div>
                  <h4>Languages</h4>
                  <p>{guide.languages.join(', ')}</p>
                </div>
              </div>
              <div className="info-item">
                <Briefcase size={24} className="text-green" />
                <div>
                  <h4>Experience</h4>
                  <p>{guide.experience} ({guide.knowledgeLevel})</p>
                </div>
              </div>
              <div className="info-item">
                <Clock size={24} className="text-orange" />
                <div>
                  <h4>Availability</h4>
                  <p>{guide.availability}</p>
                </div>
              </div>
              <div className="info-item">
                <Calendar size={24} className="text-purple" />
                <div>
                  <h4>Joined</h4>
                  <p>{new Date(guide.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="reviews-section mt-2">
              <h3>Reviews ({reviews.length})</h3>
              
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="glass-panel" style={{marginBottom: '1.5rem', padding: '1.5rem'}}>
                  <h4 style={{marginTop:0}}>Leave a Review</h4>
                  <div className="form-group">
                    <label>Rating (1-5)</label>
                    <input type="number" min="1" max="5" value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: e.target.value})} required style={{width: '100px', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)'}}/>
                  </div>
                  <div className="form-group" style={{marginTop: '1rem'}}>
                    <label>Comment</label>
                    <textarea rows="3" value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} required style={{width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)'}}></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>Submit Review</button>
                </form>
              )}

              {reviews.length === 0 ? (
                <p className="text-light">No reviews yet.</p>
              ) : (
                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review._id} className="review-card glass-panel" style={{padding: '1rem', marginBottom: '1rem'}}>
                      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                        <strong>{review.customer?.name}</strong>
                        <span style={{color: '#eab308'}}>★ {review.rating}/5</span>
                      </div>
                      <p style={{margin:0, fontSize:'0.95rem'}}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in">
            <div className="modal-header">
              <h2>Book {guide.name}</h2>
              <button className="close-btn" onClick={() => setShowBookingModal(false)}><X size={24}/></button>
            </div>
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label>Date</label>
                <input type="date" required value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" required value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Duration (Hours)</label>
                <input type="number" min="1" required value={bookingData.durationHours} onChange={(e) => setBookingData({...bookingData, durationHours: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Number of People</label>
                <input type="number" min="1" required value={bookingData.numberOfPeople} onChange={(e) => setBookingData({...bookingData, numberOfPeople: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <textarea rows="3" value={bookingData.specialRequest} onChange={(e) => setBookingData({...bookingData, specialRequest: e.target.value})}></textarea>
              </div>
              <div className="booking-summary">
                <p>Total Estimated Price: <strong>₹{guide.pricePerHour * bookingData.durationHours}</strong></p>
              </div>
              <button type="submit" className="btn-primary full-width">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

      {/* Mock Payment Modal */}
      {showPaymentModal && createdBooking && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel animate-fade-in text-center">
            <h2>Payment Gateway</h2>
            <p className="text-light mb-2">This is a mock payment interface for prototype purposes.</p>
            
            <div className="payment-details">
              <p>Total Amount: <strong>₹{createdBooking.totalAmount}</strong></p>
              <p>Advance (20%): <strong>₹{createdBooking.totalAmount * 0.2}</strong></p>
            </div>

            <div className="payment-options mt-2">
              <button className="btn-secondary" onClick={() => handleMockPayment('advance')}>
                Pay Advance
              </button>
              <button className="btn-primary" onClick={() => handleMockPayment('full')}>
                Pay Full Amount
              </button>
            </div>
            
            <button className="btn-cancel mt-2" onClick={() => {
              setShowPaymentModal(false);
              navigate('/dashboard/customer-bookings');
            }}>
              Pay Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideProfile;
